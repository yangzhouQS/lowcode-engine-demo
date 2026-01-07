/**
 * History
 * 
 * 历史记录类,管理撤销/重做功能
 * 
 * @public
 */
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';

export interface HistoryRecord {
  type: string;
  data: any;
  timestamp: number;
}

export class History {
  private records: HistoryRecord[];
  private currentIndex: number;
  private recordsRef: Ref<HistoryRecord[]>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor() {
    this.records = [];
    this.currentIndex = -1;
    this.recordsRef = ref<HistoryRecord[]>(this.records);
    this.eventBus = useEventBus();
  }

  /**
   * 添加历史记录
   * 
   * @param record - 历史记录
   */
  push(record: HistoryRecord): void {
    // 删除当前位置之后的所有记录
    this.records = this.records.slice(0, this.currentIndex + 1);
    
    // 添加新记录
    this.records.push({
      ...record,
      timestamp: Date.now(),
    });
    
    this.currentIndex = this.records.length - 1;
    this.recordsRef.value = [...this.records];
    this.eventBus.emit('history:push', { record });
  }

  /**
   * 撤销
   */
  undo(): void {
    if (this.canUndo()) {
      this.currentIndex--;
      const record = this.records[this.currentIndex];
      this.recordsRef.value = [...this.records];
      this.eventBus.emit('history:undo', { record });
    }
  }

  /**
   * 重做
   */
  redo(): void {
    if (this.canRedo()) {
      this.currentIndex++;
      const record = this.records[this.currentIndex];
      this.recordsRef.value = [...this.records];
      this.eventBus.emit('history:redo', { record });
    }
  }

  /**
   * 是否可以撤销
   * 
   * @returns 是否可以撤销
   */
  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * 是否可以重做
   * 
   * @returns 是否可以重做
   */
  canRedo(): boolean {
    return this.currentIndex < this.records.length - 1;
  }

  /**
   * 清空历史记录
   */
  clear(): void {
    this.records = [];
    this.currentIndex = -1;
    this.recordsRef.value = [];
    this.eventBus.emit('history:clear', {});
  }

  /**
   * 获取当前索引
   * 
   * @returns 当前索引
   */
  getIndex(): number {
    return this.currentIndex;
  }

  /**
   * 获取历史记录数量
   * 
   * @returns 历史记录数量
   */
  size(): number {
    return this.records.length;
  }

  /**
   * 获取所有历史记录
   * 
   * @returns 所有历史记录
   */
  getAll(): HistoryRecord[] {
    return [...this.records];
  }

  /**
   * 获取当前记录
   * 
   * @returns 当前记录
   */
  getCurrent(): HistoryRecord | undefined {
    if (this.currentIndex >= 0 && this.currentIndex < this.records.length) {
      return this.records[this.currentIndex];
    }
    return undefined;
  }

  /**
   * 获取上一条记录
   * 
   * @returns 上一条记录
   */
  getPrevious(): HistoryRecord | undefined {
    if (this.currentIndex > 0) {
      return this.records[this.currentIndex - 1];
    }
    return undefined;
  }

  /**
   * 获取下一条记录
   * 
   * @returns 下一条记录
   */
  getNext(): HistoryRecord | undefined {
    if (this.currentIndex < this.records.length - 1) {
      return this.records[this.currentIndex + 1];
    }
    return undefined;
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
   * 导出历史记录
   * 
   * @returns 历史记录
   */
  export(): any {
    return {
      records: this.records,
      currentIndex: this.currentIndex,
    };
  }

  /**
   * 导入历史记录
   * 
   * @param state - 历史记录状态
   */
  async import(state: any): Promise<void> {
    this.records = state.records || [];
    this.currentIndex = state.currentIndex || -1;
    this.recordsRef.value = [...this.records];
    this.eventBus.emit('history:import', { state });
  }
}
