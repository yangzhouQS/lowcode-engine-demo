/**
 * Selection
 * 
 * 选区类,管理选中的节点
 * 
 * @public
 */
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { INode } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';

export class Selection {
  private selectedNodes: Map<string, INode>;
  private selectedNodesRef: Ref<INode[]>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor() {
    this.selectedNodes = new Map();
    this.selectedNodesRef = computed(() => Array.from(this.selectedNodes.values())) as Ref<INode[]>;
    this.eventBus = useEventBus();
  }

  /**
   * 选中节点
   * 
   * @param nodes - 节点或节点数组
   */
  select(nodes: INode | INode[]): void {
    const nodeList = Array.isArray(nodes) ? nodes : [nodes];
    nodeList.forEach(node => {
      this.selectedNodes.set(node.id, node);
    });
    this.selectedNodesRef.value = Array.from(this.selectedNodes.values());
    this.eventBus.emit('selection:change', { selected: this.getSelected() });
  }

  /**
   * 取消选中
   * 
   * @param nodes - 节点或节点数组
   */
  deselect(nodes: INode | INode[]): void {
    const nodeList = Array.isArray(nodes) ? nodes : [nodes];
    nodeList.forEach(node => {
      this.selectedNodes.delete(node.id);
    });
    this.selectedNodesRef.value = Array.from(this.selectedNodes.values());
    this.eventBus.emit('selection:change', { selected: this.getSelected() });
  }

  /**
   * 清空选区
   */
  clear(): void {
    this.selectedNodes.clear();
    this.selectedNodesRef.value = [];
    this.eventBus.emit('selection:clear', {});
  }

  /**
   * 获取选中的节点
   * 
   * @returns 选中的节点列表
   */
  getSelected(): INode[] {
    return Array.from(this.selectedNodes.values());
  }

  /**
   * 是否有选中
   * 
   * @returns 是否有选中
   */
  hasSelection(): boolean {
    return this.selectedNodes.size > 0;
  }

  /**
   * 判断节点是否被选中
   * 
   * @param node - 节点
   * @returns 是否被选中
   */
  isSelected(node: INode): boolean {
    return this.selectedNodes.has(node.id);
  }

  /**
   * 获取选中数量
   * 
   * @returns 选中数量
   */
  size(): number {
    return this.selectedNodes.size;
  }

  /**
   * 获取第一个选中的节点
   * 
   * @returns 第一个选中的节点
   */
  getFirst(): INode | undefined {
    const firstKey = this.selectedNodes.keys().next().value;
    return firstKey ? this.selectedNodes.get(firstKey) : undefined;
  }

  /**
   * 获取最后一个选中的节点
   * 
   * @returns 最后一个选中的节点
   */
  getLast(): INode | undefined {
    const keys = Array.from(this.selectedNodes.keys());
    const lastKey = keys[keys.length - 1];
    return lastKey ? this.selectedNodes.get(lastKey) : undefined;
  }

  /**
   * 全选
   * 
   * @param nodes - 节点列表
   */
  selectAll(nodes: INode[]): void {
    this.clear();
    nodes.forEach(node => {
      this.selectedNodes.set(node.id, node);
    });
    this.selectedNodesRef.value = Array.from(this.selectedNodes.values());
    this.eventBus.emit('selection:change', { selected: this.getSelected() });
  }

  /**
   * 反选
   * 
   * @param nodes - 节点列表
   */
  invertSelection(nodes: INode[]): void {
    nodes.forEach(node => {
      if (this.selectedNodes.has(node.id)) {
        this.selectedNodes.delete(node.id);
      } else {
        this.selectedNodes.set(node.id, node);
      }
    });
    this.selectedNodesRef.value = Array.from(this.selectedNodes.values());
    this.eventBus.emit('selection:change', { selected: this.getSelected() });
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
   * 导出选区状态
   *
   * @returns 选区状态
   */
  exportState(): any {
    return {
      selected: this.getSelected().map(node => node.id),
    };
  }

  /**
   * 导入选区状态
   *
   * @param state - 选区状态
   */
  async importState(state: any): Promise<void> {
    this.clear();
    this.eventBus.emit('selection:import', { state });
  }

  /**
   * 导出选区状态 (别名)
   *
   * @returns 选区状态
   */
  export(): any {
    return this.exportState();
  }

  /**
   * 导入选区状态 (别名)
   *
   * @param state - 选区状态
   */
  async import(state: any): Promise<void> {
    return this.importState(state);
  }
}
