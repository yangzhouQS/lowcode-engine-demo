/**
 * Document
 * 
 * 文档类,表示一个低代码文档
 * 
 * @public
 */
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { IDocument } from '@vue3-lowcode/types';
import type { INode } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';
import { Node } from '../node/Node';

export class Document implements IDocument {
  public id: string;
  public name: string;
  
  private nodes: Map<string, INode>;
  private rootNodeId: Ref<string | null>;
  private nodesRef: Ref<INode[]>;
  private rootNodeRef: Ref<INode | undefined>;
  private schemaRef: Ref<any>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor(id: string, schema: any = {}) {
    this.id = id;
    this.name = schema.name || 'Untitled';
    this.nodes = new Map();
    this.rootNodeId = ref<string | null>(null);
    this.schemaRef = ref<any>(schema);
    this.eventBus = useEventBus();
    
    this.nodesRef = computed(() => Array.from(this.nodes.values())) as Ref<INode[]>;
    this.rootNodeRef = computed(() => {
      if (!this.rootNodeId.value) {
        return undefined;
      }
      return this.nodes.get(this.rootNodeId.value);
    }) as Ref<INode | undefined>;

    // 初始化文档
    this.init(schema);
  }

  /**
   * 初始化文档
   * 
   * @param schema - 文档 schema
   */
  private init(schema: any): void {
    if (schema.componentName) {
      const rootNode = new Node({
        id: this.generateId(),
        componentName: schema.componentName,
        props: schema.props || {},
        children: schema.children || [],
      });
      this.nodes.set(rootNode.id, rootNode);
      this.rootNodeId.value = rootNode.id;
    }
  }

  /**
   * 获取根节点
   * 
   * @returns 根节点
   */
  getRootNode(): INode | undefined {
    if (!this.rootNodeId.value) {
      return undefined;
    }
    return this.nodes.get(this.rootNodeId.value);
  }

  /**
   * 获取节点
   * 
   * @param id - 节点 ID
   * @returns 节点
   */
  getNode(id: string): INode | undefined {
    return this.nodes.get(id);
  }

  /**
   * 获取所有节点
   * 
   * @returns 节点列表
   */
  getNodes(): INode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * 检查节点是否存在
   * 
   * @param id - 节点 ID
   * @returns 是否存在
   */
  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  /**
   * 导出 schema
   * 
   * @returns schema
   */
  export(): any {
    const rootNode = this.getRootNode();
    if (!rootNode) {
      return {};
    }
    return {
      id: this.id,
      name: this.name,
      componentName: rootNode.componentName,
      props: rootNode.getProps(),
      children: rootNode.getChildren().map(child => child.export()),
    };
  }

  /**
   * 导入 schema
   * 
   * @param schema - schema
   * @returns Promise<void>
   */
  async import(schema: any): Promise<void> {
    this.nodes.clear();
    this.name = schema.name || 'Untitled';
    this.schemaRef.value = schema;
    this.init(schema);
    this.eventBus.emit('document:import', { schema });
  }

  /**
   * 获取 schema
   * 
   * @returns schema
   */
  getSchema(): any {
    return this.schemaRef.value;
  }

  /**
   * 设置 schema
   * 
   * @param schema - schema
   * @returns Promise<void>
   */
  async setSchema(schema: any): Promise<void> {
    this.schemaRef.value = schema;
    this.eventBus.emit('document:schema-change', { schema });
  }

  /**
   * 获取节点列表的响应式引用
   * 
   * @returns 节点列表的响应式引用
   */
  getNodesRef(): Ref<INode[]> {
    return this.nodesRef;
  }

  /**
   * 获取根节点的响应式引用
   * 
   * @returns 根节点的响应式引用
   */
  getRootNodeRef(): Ref<INode | undefined> {
    return this.rootNodeRef;
  }

  /**
   * 添加节点
   * 
   * @param node - 节点
   * @param parentId - 父节点 ID
   * @returns Promise<void>
   */
  async addNode(node: INode, parentId?: string): Promise<void> {
    this.nodes.set(node.id, node);
    
    if (parentId) {
      const parentNode = this.nodes.get(parentId);
      if (parentNode) {
        parentNode.addChild(node);
      }
    }
    
    this.eventBus.emit('node:add', { node, parentId });
  }

  /**
   * 删除节点
   * 
   * @param id - 节点 ID
   * @returns Promise<void>
   */
  async removeNode(id: string): Promise<void> {
    const node = this.nodes.get(id);
    if (node) {
      const parentNode = node.getParent();
      if (parentNode) {
        parentNode.removeChild(node);
      }
      this.nodes.delete(id);
      this.eventBus.emit('node:remove', { node });
    }
  }

  /**
   * 注册事件监听器
   * 
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  on(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.on(event, listener);
  }

  /**
   * 移除事件监听器
   * 
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  off(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.off(event, listener);
  }

  /**
   * 清除所有监听器
   */
  clearListeners(): void {
    this.eventBus.clear();
  }

  /**
   * 生成唯一 ID
   * 
   * @returns 唯一 ID
   */
  private generateId(): string {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
