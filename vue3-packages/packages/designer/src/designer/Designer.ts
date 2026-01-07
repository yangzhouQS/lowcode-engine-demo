/**
 * Designer
 * 
 * 设计器核心类,整合所有设计器模块
 * 
 * @public
 */
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { IDocumentModel, IDocument } from '@vue3-lowcode/types';
import { DocumentModel } from '../document/DocumentModel';
import { Dragon } from '../dragon/Dragon';
import { Selection } from '../selection/Selection';
import { History } from '../history/History';
import { BuiltinSimulatorHost, SimulatorConfig } from '../simulator/BuiltinSimulatorHost';
import { useEventBus } from '@vue3-lowcode/utils';

export interface DesignerConfig {
  simulator?: SimulatorConfig;
  maxHistorySize?: number;
}

export class Designer {
  private documentModel: DocumentModel;
  private dragon: Dragon;
  private selection: Selection;
  private history: History;
  private simulator: BuiltinSimulatorHost;
  private isReadyRef: Ref<boolean>;
  private eventBus: ReturnType<typeof useEventBus>;
  private maxHistorySize: number;

  constructor(config: DesignerConfig = {}) {
    this.maxHistorySize = config.maxHistorySize || 50;
    this.documentModel = new DocumentModel();
    this.dragon = new Dragon(this);
    this.selection = new Selection();
    this.history = new History();
    this.simulator = new BuiltinSimulatorHost(config.simulator);
    this.isReadyRef = ref(false);
    this.eventBus = useEventBus();

    // 初始化模块间的事件监听
    this.initModuleListeners();
  }

  /**
   * 初始化模块间的事件监听
   */
  private initModuleListeners(): void {
    // 监听文档模型变化
    this.documentModel.on('document:create', this.handleDocumentCreate.bind(this));
    this.documentModel.on('document:delete', this.handleDocumentDelete.bind(this));
    this.documentModel.on('document:change', this.handleDocumentChange.bind(this));
    this.documentModel.on('document:current-change', this.handleCurrentDocumentChange.bind(this));

    // 监听选区变化
    this.selection.on('selection:change', this.handleSelectionChange.bind(this));
    this.selection.on('selection:clear', this.handleSelectionClear.bind(this));

    // 监听历史记录变化
    this.history.on('history:push', this.handleHistoryPush.bind(this));
    this.history.on('history:undo', this.handleHistoryUndo.bind(this));
    this.history.on('history:redo', this.handleHistoryRedo.bind(this));
  }

  /**
   * 初始化设计器
   */
  async init(): Promise<void> {
    try {
      // 初始化模拟器
      await this.simulator.init(this.documentModel);
      
      this.isReadyRef.value = true;
      this.eventBus.emit('designer:ready', {});
    } catch (error) {
      console.error('Failed to initialize designer:', error);
      throw error;
    }
  }

  /**
   * 启动设计器
   */
  async start(): Promise<void> {
    if (!this.isReadyRef.value) {
      throw new Error('Designer not initialized');
    }
    
    await this.simulator.start();
    this.eventBus.emit('designer:start', {});
  }

  /**
   * 停止设计器
   */
  async stop(): Promise<void> {
    await this.simulator.stop();
    this.eventBus.emit('designer:stop', {});
  }

  /**
   * 销毁设计器
   */
  async dispose(): Promise<void> {
    await this.stop();
    await this.simulator.dispose();
    this.clearListeners();
    this.eventBus.emit('designer:dispose', {});
  }

  /**
   * 获取文档模型
   * 
   * @returns 文档模型
   */
  getDocumentModel(): DocumentModel {
    return this.documentModel;
  }

  /**
   * 获取拖拽系统
   * 
   * @returns 拖拽系统
   */
  getDragon(): Dragon {
    return this.dragon;
  }

  /**
   * 获取选区
   * 
   * @returns 选区
   */
  getSelection(): Selection {
    return this.selection;
  }

  /**
   * 获取历史记录
   * 
   * @returns 历史记录
   */
  getHistory(): History {
    return this.history;
  }

  /**
   * 获取模拟器
   * 
   * @returns 模拟器
   */
  getSimulator(): BuiltinSimulatorHost {
    return this.simulator;
  }

  /**
   * 是否已准备就绪
   * 
   * @returns 是否已准备就绪
   */
  isReady(): boolean {
    return this.isReadyRef.value;
  }

  /**
   * 获取准备就绪状态的响应式引用
   * 
   * @returns 准备就绪状态的响应式引用
   */
  getReadyRef(): Ref<boolean> {
    return this.isReadyRef;
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
   * 处理文档创建
   * 
   * @param event - 事件
   */
  private handleDocumentCreate(event: any): void {
    const { document } = event;
    this.eventBus.emit('designer:document-create', { document });
  }

  /**
   * 处理文档删除
   * 
   * @param event - 事件
   */
  private handleDocumentDelete(event: any): void {
    const { document } = event;
    this.eventBus.emit('designer:document-delete', { document });
  }

  /**
   * 处理文档变化
   * 
   * @param event - 事件
   */
  private handleDocumentChange(event: any): void {
    const { document } = event;
    this.eventBus.emit('designer:document-change', { document });
  }

  /**
   * 处理当前文档变化
   * 
   * @param event - 事件
   */
  private handleCurrentDocumentChange(event: any): void {
    const { document } = event;
    this.eventBus.emit('designer:current-document-change', { document });
  }

  /**
   * 处理选区变化
   * 
   * @param event - 事件
   */
  private handleSelectionChange(event: any): void {
    const { selected } = event;
    this.eventBus.emit('designer:selection-change', { selected });
  }

  /**
   * 处理选区清空
   * 
   * @param event - 事件
   */
  private handleSelectionClear(event: any): void {
    this.eventBus.emit('designer:selection-clear', {});
  }

  /**
   * 处理历史记录推送
   * 
   * @param event - 事件
   */
  private handleHistoryPush(event: any): void {
    const { record } = event;
    
    // 限制历史记录大小
    if (this.history.size() > this.maxHistorySize) {
      this.history.clear();
    }
    
    this.eventBus.emit('designer:history-push', { record });
  }

  /**
   * 处理历史记录撤销
   * 
   * @param event - 事件
   */
  private handleHistoryUndo(event: any): void {
    const { record } = event;
    this.eventBus.emit('designer:history-undo', { record });
  }

  /**
   * 处理历史记录重做
   * 
   * @param event - 事件
   */
  private handleHistoryRedo(event: any): void {
    const { record } = event;
    this.eventBus.emit('designer:history-redo', { record });
  }

  /**
   * 导出设计器状态
   *
   * @returns 设计器状态
   */
  exportState(): any {
    return {
      documentModel: this.documentModel.exportState(),
      dragon: this.dragon.exportState(),
      selection: this.selection.exportState(),
      history: this.history.exportState(),
      simulator: this.simulator.exportState(),
      isReady: this.isReadyRef.value,
    };
  }

  /**
   * 导入设计器状态
   *
   * @param state - 设计器状态
   */
  async importState(state: any): Promise<void> {
    await this.documentModel.importState(state.documentModel);
    await this.dragon.importState(state.dragon);
    await this.selection.importState(state.selection);
    await this.history.importState(state.history);
    await this.simulator.importState(state.simulator);
    this.isReadyRef.value = state.isReady || false;
    this.eventBus.emit('designer:import', { state });
  }
}
