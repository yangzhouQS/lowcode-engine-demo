/**
 * Selection
 * 
 * 选区类,实现节点选择功能
 * 
 * @public
 */
import { ref, reactive, computed } from 'vue';

export interface SelectionEvent {
  type: 'select' | 'deselect' | 'clear';
  nodes: any[];
}

export class Selection {
  private selectedNodes = reactive<Set<any>>(new Set());
  private eventListeners: Map<string, Set<Function>> = new Map();

  /**
   * 选择节点
   * 
   * @param nodes - 要选择的节点
   * @param append - 是否追加选择
   */
  select(nodes: any | any[], append: boolean = false): void {
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    if (!append) {
      this.clear();
    }
    
    nodeArray.forEach(node => {
      if (node) {
        this.selectedNodes.add(node);
      }
    });
    
    const event: SelectionEvent = {
      type: 'select',
      nodes: this.getSelected(),
    };
    this.emit('select', event);
  }

  /**
   * 取消选择节点
   * 
   * @param nodes - 要取消选择的节点
   */
  deselect(nodes: any | any[]): void {
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    nodeArray.forEach(node => {
      this.selectedNodes.delete(node);
    });
    
    const event: SelectionEvent = {
      type: 'deselect',
      nodes: this.getSelected(),
    };
    this.emit('deselect', event);
  }

  /**
   * 清除所有选择
   */
  clear(): void {
    if (this.selectedNodes.size === 0) {
      return;
    }
    
    const nodes = Array.from(this.selectedNodes);
    this.selectedNodes.clear();
    
    const event: SelectionEvent = {
      type: 'clear',
      nodes,
    };
    this.emit('clear', event);
  }

  /**
   * 获取选中的节点
   * 
   * @returns 选中的节点数组
   */
  getSelected(): any[] {
    return Array.from(this.selectedNodes);
  }

  /**
   * 检查是否有选中的节点
   * 
   * @returns 是否有选中的节点
   */
  hasSelection(): boolean {
    return this.selectedNodes.size > 0;
  }

  /**
   * 检查节点是否被选中
   * 
   * @param node - 要检查的节点
   * @returns 是否被选中
   */
  isSelected(node: any): boolean {
    return this.selectedNodes.has(node);
  }

  /**
   * 获取选中的节点数量
   * 
   * @returns 选中的节点数量
   */
  size(): number {
    return this.selectedNodes.size;
  }

  /**
   * 获取第一个选中的节点
   * 
   * @returns 第一个选中的节点
   */
  getFirst(): any | null {
    const nodes = this.getSelected();
    return nodes.length > 0 ? nodes[0] : null;
  }

  /**
   * 获取最后一个选中的节点
   * 
   * @returns 最后一个选中的节点
   */
  getLast(): any | null {
    const nodes = this.getSelected();
    return nodes.length > 0 ? nodes[nodes.length - 1] : null;
  }

  /**
   * 选择所有节点
   * 
   * @param nodes - 所有节点
   */
  selectAll(nodes: any[]): void {
    this.clear();
    nodes.forEach(node => {
      this.selectedNodes.add(node);
    });
    
    const event: SelectionEvent = {
      type: 'select',
      nodes: this.getSelected(),
    };
    this.emit('select', event);
  }

  /**
   * 反选
   * 
   * @param nodes - 所有节点
   */
  invertSelection(nodes: any[]): void {
    const currentSelected = new Set(this.selectedNodes);
    this.clear();
    
    nodes.forEach(node => {
      if (!currentSelected.has(node)) {
        this.selectedNodes.add(node);
      }
    });
    
    const event: SelectionEvent = {
      type: 'select',
      nodes: this.getSelected(),
    };
    this.emit('select', event);
  }

  /**
   * 注册事件监听器
   * 
   * @param event - 事件类型
   * @param listener - 监听器函数
   */
  on(event: string, listener: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(listener);
  }

  /**
   * 移除事件监听器
   * 
   * @param event - 事件类型
   * @param listener - 监听器函数
   */
  off(event: string, listener: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.eventListeners.delete(event);
      }
    }
  }

  /**
   * 触发事件
   * 
   * @param event - 事件类型
   * @param data - 事件数据
   */
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Error in selection event listener for "${event}":`, error);
        }
      });
    }
  }

  /**
   * 清除所有事件监听器
   */
  clearListeners(): void {
    this.eventListeners.clear();
  }

  /**
   * 导出选区状态
   * 
   * @returns 选区状态
   */
  export(): any {
    return {
      selectedNodes: this.getSelected(),
      size: this.size(),
    };
  }

  /**
   * 导入选区状态
   * 
   * @param state - 选区状态
   */
  import(state: any): void {
    this.clear();
    if (state.selectedNodes && Array.isArray(state.selectedNodes)) {
      state.selectedNodes.forEach((node: any) => {
        if (node) {
          this.selectedNodes.add(node);
        }
      });
    }
    
    if (this.hasSelection()) {
      const event: SelectionEvent = {
        type: 'select',
        nodes: this.getSelected(),
      };
      this.emit('select', event);
    }
  }
}
