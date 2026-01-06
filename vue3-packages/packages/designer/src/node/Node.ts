/**
 * Node
 * 
 * 节点类,表示低代码组件节点
 * 
 * @public
 */
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { INode } from '@vue3-lowcode/types';
import type { IProps } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';
import { Props } from '../props/Props';

export interface NodeConfig {
  id: string;
  componentName: string;
  props?: Record<string, any>;
  children?: NodeConfig[];
}

export class Node implements INode {
  public id: string;
  public componentName: string;
  
  private props: IProps;
  private children: INode[];
  private parent: INode | undefined;
  private childrenRef: Ref<INode[]>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor(config: NodeConfig) {
    this.id = config.id;
    this.componentName = config.componentName;
    this.children = [];
    this.eventBus = useEventBus();
    
    this.props = new Props(config.props || {});
    this.childrenRef = ref<INode[]>(this.children) as Ref<INode[]>;
    
    // 初始化子节点
    if (config.children && config.children.length > 0) {
      config.children.forEach(childConfig => {
        const child = new Node(childConfig);
        child.parent = this;
        this.children.push(child);
      });
    }
  }

  /**
   * 获取属性
   * 
   * @param key - 属性键
   * @returns 属性值
   */
  getProp(key: string): any {
    return this.props.getProp(key);
  }

  /**
   * 设置属性
   * 
   * @param key - 属性键
   * @param value - 属性值
   * @returns Promise<void>
   */
  async setProp(key: string, value: any): Promise<void> {
    await this.props.setProp(key, value);
    this.eventBus.emit('node:prop-change', { key, value });
  }

  /**
   * 获取所有属性
   * 
   * @returns 属性对象
   */
  getProps(): Record<string, any> {
    return this.props.getProps();
  }

  /**
   * 设置所有属性
   * 
   * @param props - 属性对象
   * @returns Promise<void>
   */
  async setProps(props: Record<string, any>): Promise<void> {
    await this.props.setProps(props);
    this.eventBus.emit('node:props-change', { props });
  }

  /**
   * 添加子节点
   * 
   * @param node - 子节点
   * @returns Promise<void>
   */
  async addChild(node: INode): Promise<void> {
    node.parent = this;
    this.children.push(node);
    this.childrenRef.value = [...this.children];
    this.eventBus.emit('node:add-child', { node });
  }

  /**
   * 移除子节点
   * 
   * @param node - 子节点
   * @returns Promise<void>
   */
  async removeChild(node: INode): Promise<void> {
    const index = this.children.indexOf(node);
    if (index > -1) {
      this.children.splice(index, 1);
      node.parent = undefined;
      this.childrenRef.value = [...this.children];
      this.eventBus.emit('node:remove-child', { node });
    }
  }

  /**
   * 获取子节点
   * 
   * @returns 子节点列表
   */
  getChildren(): INode[] {
    return this.children;
  }

  /**
   * 获取父节点
   * 
   * @returns 父节点
   */
  getParent(): INode | undefined {
    return this.parent;
  }

  /**
   * 获取兄弟节点
   * 
   * @returns 兄弟节点列表
   */
  getSibling(): INode[] {
    if (!this.parent) {
      return [];
    }
    return this.parent.getChildren().filter(node => node.id !== this.id);
  }

  /**
   * 获取索引
   * 
   * @returns 索引
   */
  getIndex(): number {
    if (!this.parent) {
      return -1;
    }
    return this.parent.getChildren().indexOf(this);
  }

  /**
   * 导出节点
   * 
   * @returns 节点配置
   */
  export(): NodeConfig {
    return {
      id: this.id,
      componentName: this.componentName,
      props: this.props.getProps(),
      children: this.children.map(child => child.export()),
    };
  }

  /**
   * 获取子节点的响应式引用
   * 
   * @returns 子节点列表的响应式引用
   */
  getChildrenRef(): Ref<INode[]> {
    return this.childrenRef;
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
}
