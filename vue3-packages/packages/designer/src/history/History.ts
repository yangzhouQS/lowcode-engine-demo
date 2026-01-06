/**
 * History
 * 
 * 历史记录类,实现撤销/重做功能
 * 
 * @public
 */
import { ref, computed } from 'vue';

export interface HistoryRecord {
  data: any;
  timestamp: number;
}

export interface HistoryEvent {
  type: 'push' | 'undo' | 'redo' | 'clear';
  record?: HistoryRecord;
  index?: number;
}

export class History {
  private history: HistoryRecord[] = [];
  private currentIndex = ref(-1);
  private maxSize = 50; // 最大历史记录数量
  private eventListeners: Map<string, Set<Function>> = new Map();

  /**
   * 推入历史记录
   * 
   * @param data - 历史数据
   */
  push(data: any): void {
    // 如果当前不在历史记录的末尾,删除当前位置之后的所有记录
    if (this.currentIndex.value < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex.value + 1);
    }
    
    // 添加新记录
    const record: HistoryRecord = {
      data,
      timestamp: Date.now(),
    };
    
    this.history.push(record);
    
    // 限制历史记录数量
    if (this.history.length > this.maxSize) {
      this.history.shift();
    } else {
      this.currentIndex.value++;
    }
    
    const event: HistoryEvent = {
      type: 'push',
      record,
      index: this.currentIndex.value,
    };
    this.emit('push', event);
  }

  /**
   * 撤销
   * 
   * @returns 撤销的数据
   */
  undo(): any | null {
    if (!this.canUndo()) {
      return null;
    }
    
    const record = this.history[this.currentIndex.value];
    this.currentIndex.value--;
    
    const event: HistoryEvent = {
      type: 'undo',
      record,
      index: this.currentIndex.value,
    };
    this.emit('undo', event);
    
    return record.data;
  }

  /**
   * 重做
   * 
   * @returns 重做的数据
   */
  redo(): any | null {
    if (!this.canRedo()) {
      return null;
    }
    
    this.currentIndex.value++;
    const record = this.history[this.currentIndex.value];
    
    const event: HistoryEvent = {
      type: 'redo',
      record,
      index: this.currentIndex.value,
    };
    this.emit('redo', event);
    
    return record.data;
  }

  /**
   * 是否可以撤销
   * 
   * @returns 是否可以撤销
   */
  canUndo(): boolean {
    return this.currentIndex.value > 0;
  }

  /**
   * 是否可以重做
   * 
   * @returns 是否可以重做
   */
  canRedo(): boolean {
    return this.currentIndex.value < this.history.length - 1;
  }

  /**
   * 清除历史记录
   */
  clear(): void {
    this.history = [];
    this.currentIndex.value = -1;
    
    const event: HistoryEvent = {
      type: 'clear',
    };
    this.emit('clear', event);
  }

  /**
   * 获取当前索引
   * 
   * @returns 当前索引
   */
  getIndex(): number {
    return this.currentIndex.value;
  }

  /**
   * 获取历史记录数量
   * 
   * @returns 历史记录数量
   */
  size(): number {
    return this.history.length;
  }

  /**
   * 获取所有历史记录
   * 
   * @returns 所有历史记录
   */
  getAll(): HistoryRecord[] {
    return [...this.history];
  }

  /**
   * 获取当前记录
   * 
   * @returns 当前记录
   */
  getCurrent(): HistoryRecord | null {
    if (this.currentIndex.value >= 0 && this.currentIndex.value < this.history.length) {
      return this.history[this.currentIndex.value];
    }
    return null;
  }

  /**
   * 获取上一个记录
   * 
   * @returns 上一个记录
   */
  getPrevious(): HistoryRecord | null {
    if (this.canUndo()) {
      return this.history[this.currentIndex.value - 1];
    }
    return null;
  }

  /**
   * 获取下一个记录
   * 
   * @returns 下一个记录
   */
  getNext(): HistoryRecord | null {
    if (this.canRedo()) {
      return this.history[this.currentIndex.value + 1];
    }
    return null;
  }

  /**
   * 设置最大历史记录数量
   * 
   * @param size - 最大数量
   */
  setMaxSize(size: number): void {
    this.maxSize = Math.max(1, size);
    
    // 如果当前历史记录超过新的最大数量,裁剪历史记录
    if (this.history.length > this.maxSize) {
      const excess = this.history.length - this.maxSize;
      this.history = this.history.slice(excess);
      this.currentIndex.value = Math.max(-1, this.currentIndex.value - excess);
    }
  }

  /**
   * 获取最大历史记录数量
   * 
   * @returns 最大数量
   */
  getMaxSize(): number {
    return this.maxSize;
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
          console.error(`Error in history event listener for "${event}":`, error);
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
   * 导出历史记录
   * 
   * @returns 历史记录数据
   */
  export(): any {
    return {
      history: this.history,
      currentIndex: this.currentIndex.value,
      maxSize: this.maxSize,
    };
  }

  /**
   * 导入历史记录
   * 
   * @param data - 历史记录数据
   */
  import(data: any): void {
    if (data.history && Array.isArray(data.history)) {
      this.history = data.history;
      this.currentIndex.value = data.currentIndex || -1;
      this.maxSize = data.maxSize || 50;
    }
  }
}
