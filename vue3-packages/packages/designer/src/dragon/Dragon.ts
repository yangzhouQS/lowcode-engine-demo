/**
 * Dragon
 * 
 * 拖拽系统类,实现组件拖拽功能
 * 
 * @public
 */
import { ref, reactive } from 'vue';

export interface DragonEvent {
  type: 'start' | 'drag' | 'end' | 'cancel';
  data: any;
  target?: any;
  position?: { x: number; y: number };
}

export interface DropTarget {
  node: any;
  position?: 'before' | 'after' | 'inside';
  index?: number;
}

export class Dragon {
  private isDragging = ref(false);
  private dragData: any = null;
  private dragTarget: any = null;
  private dragPosition = reactive({ x: 0, y: 0 });
  private dropTarget: DropTarget | null = null;
  private eventListeners: Map<string, Set<Function>> = new Map();

  /**
   * 开始拖拽
   * 
   * @param data - 拖拽数据
   * @param target - 拖拽目标
   */
  startDrag(data: any, target?: any): void {
    this.isDragging.value = true;
    this.dragData = data;
    this.dragTarget = target;
    this.dropTarget = null;
    
    const event: DragonEvent = {
      type: 'start',
      data,
      target,
    };
    this.emit('start', event);
  }

  /**
   * 拖拽中
   * 
   * @param position - 拖拽位置
   */
  onDrag(position: { x: number; y: number }): void {
    if (!this.isDragging.value) {
      return;
    }
    
    this.dragPosition.x = position.x;
    this.dragPosition.y = position.y;
    
    const event: DragonEvent = {
      type: 'drag',
      data: this.dragData,
      target: this.dragTarget,
      position,
    };
    this.emit('drag', event);
  }

  /**
   * 结束拖拽
   * 
   * @param dropTarget - 放置目标
   */
  endDrag(dropTarget?: DropTarget): void {
    if (!this.isDragging.value) {
      return;
    }
    
    this.dropTarget = dropTarget || null;
    this.isDragging.value = false;
    
    const event: DragonEvent = {
      type: 'end',
      data: this.dragData,
      target: this.dragTarget,
      position: this.dragPosition,
    };
    this.emit('end', event);
    
    // 重置拖拽状态
    this.dragData = null;
    this.dragTarget = null;
  }

  /**
   * 取消拖拽
   */
  cancelDrag(): void {
    if (!this.isDragging.value) {
      return;
    }
    
    this.isDragging.value = false;
    
    const event: DragonEvent = {
      type: 'cancel',
      data: this.dragData,
      target: this.dragTarget,
    };
    this.emit('cancel', event);
    
    // 重置拖拽状态
    this.dragData = null;
    this.dragTarget = null;
    this.dropTarget = null;
  }

  /**
   * 检测是否正在拖拽
   * 
   * @returns 是否正在拖拽
   */
  isDragActive(): boolean {
    return this.isDragging.value;
  }

  /**
   * 获取拖拽数据
   * 
   * @returns 拖拽数据
   */
  getDragData(): any {
    return this.dragData;
  }

  /**
   * 获取拖拽目标
   * 
   * @returns 拖拽目标
   */
  getDragTarget(): any {
    return this.dragTarget;
  }

  /**
   * 获取拖拽位置
   * 
   * @returns 拖拽位置
   */
  getDragPosition(): { x: number; y: number } {
    return { x: this.dragPosition.x, y: this.dragPosition.y };
  }

  /**
   * 获取放置目标
   * 
   * @returns 放置目标
   */
  getDropTarget(): DropTarget | null {
    return this.dropTarget;
  }

  /**
   * 设置放置目标
   * 
   * @param target - 放置目标
   */
  setDropTarget(target: DropTarget | null): void {
    this.dropTarget = target;
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
          console.error(`Error in dragon event listener for "${event}":`, error);
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
   * 计算拖拽位置
   * 
   * @param target - 目标节点
   * @param position - 鼠标位置
   * @returns 拖拽位置
   */
  calculateDropPosition(target: any, position: { x: number; y: number }): DropTarget | null {
    // 这里应该实现实际的拖拽位置计算逻辑
    // 包括判断是在目标节点的前面、后面还是内部
    
    // 简化实现,返回默认值
    return {
      node: target,
      position: 'inside',
      index: 0,
    };
  }

  /**
   * 验证是否可以放置
   * 
   * @param dragData - 拖拽数据
   * @param dropTarget - 放置目标
   * @returns 是否可以放置
   */
  canDrop(dragData: any, dropTarget: DropTarget): boolean {
    // 这里应该实现实际的验证逻辑
    // 包括检查目标节点是否可以接收拖拽的节点
    
    // 简化实现,返回 true
    return true;
  }
}
