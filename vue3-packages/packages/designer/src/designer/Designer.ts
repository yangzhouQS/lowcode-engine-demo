/**
 * Designer
 * 
 * 设计器核心类,整合所有设计器模块
 * 
 * @public
 */
import { ref, reactive, computed } from 'vue';
import type { IDesigner } from '@vue3-lowcode/types';
import { DocumentModel } from '../document/DocumentModel';
import { Document } from '../document/Document';
import { Node } from '../node/Node';
import { Props } from '../props/Props';
import { Dragon } from '../dragon/Dragon';
import { Selection } from '../selection/Selection';
import { History } from '../history/History';
import { BuiltinSimulatorHost } from '../simulator/BuiltinSimulatorHost';

export interface DesignerConfig {
  documentModel?: DocumentModel;
  dragon?: Dragon;
  selection?: Selection;
  history?: History;
  simulator?: BuiltinSimulatorHost;
  [key: string]: any;
}

export interface DesignerEvent {
  type: 'init' | 'start' | 'stop' | 'dispose' | 'change';
  data?: any;
}

export class Designer implements IDesigner {
  private isInitialized = ref(false);
  private isStarted = ref(false);
  private config: DesignerConfig = {};
  private documentModel: DocumentModel;
  private dragon: Dragon;
  private selection: Selection;
  private history: History;
  private simulator: BuiltinSimulatorHost;
  private eventListeners: Map<string, Set<Function>> = new Map();

  constructor(config: DesignerConfig = {}) {
    this.config = config;
    
    // 初始化各个模块
    this.documentModel = config.documentModel || new DocumentModel();
    this.dragon = config.dragon || new Dragon();
    this.selection = config.selection || new Selection();
    this.history = config.history || new History();
    this.simulator = config.simulator || new BuiltinSimulatorHost();
  }

  /**
   * 初始化
   * 
   * @returns Promise<void>
   */
  async init(): Promise<void> {
    if (this.isInitialized.value) {
      return;
    }
    
    // 初始化各个模块
    await this.documentModel.init();
    await this.simulator.init();
    
    // 设置事件监听
    this.setupEventListeners();
    
    this.isInitialized.value = true;
    
    const event: DesignerEvent = {
      type: 'init',
      data: { config: this.config },
    };
    this.emit('init', event);
  }

  /**
   * 启动
   * 
   * @returns Promise<void>
   */
  async start(): Promise<void> {
    if (!this.isInitialized.value) {
      await this.init();
    }
    
    if (this.isStarted.value) {
      return;
    }
    
    // 启动各个模块
    await this.simulator.start();
    
    this.isStarted.value = true;
    
    const event: DesignerEvent = {
      type: 'start',
      data: { config: this.config },
    };
    this.emit('start', event);
  }

  /**
   * 停止
   * 
   * @returns Promise<void>
   */
  async stop(): Promise<void> {
    if (!this.isStarted.value) {
      return;
    }
    
    // 停止各个模块
    await this.simulator.stop();
    
    this.isStarted.value = false;
    
    const event: DesignerEvent = {
      type: 'stop',
    };
    this.emit('stop', event);
  }

  /**
   * 销毁
   * 
   * @returns Promise<void>
   */
  async dispose(): Promise<void> {
    // 先停止
    if (this.isStarted.value) {
      await this.stop();
    }
    
    // 销毁各个模块
    await this.simulator.dispose();
    this.dragon.clearListeners();
    this.selection.clearListeners();
    this.history.clearListeners();
    
    // 清除事件监听器
    this.clearListeners();
    
    this.isInitialized.value = false;
    
    const event: DesignerEvent = {
      type: 'dispose',
    };
    this.emit('dispose', event);
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
   * 获取当前文档
   * 
   * @returns 当前文档
   */
  getCurrentDocument(): Document | null {
    return this.documentModel.getCurrentDocument();
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
   * 获取拖拽系统
   * 
   * @returns 拖拽系统
   */
  getDragon(): Dragon {
    return this.dragon;
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
   * 获取配置
   * 
   * @returns 配置
   */
  getConfig(): DesignerConfig {
    return { ...this.config };
  }

  /**
   * 设置配置
   * 
   * @param config - 配置
   */
  setConfig(config: Partial<DesignerConfig>): void {
    this.config = { ...this.config, ...config };
    
    // 更新各个模块的配置
    if (config.simulator) {
      this.simulator.setConfig(config.simulator);
    }
  }

  /**
   * 是否已初始化
   * 
   * @returns 是否已初始化
   */
  isReady(): boolean {
    return this.isInitialized.value;
  }

  /**
   * 是否已启动
   * 
   * @returns 是否已启动
   */
  isActive(): boolean {
    return this.isStarted.value;
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
          console.error(`Error in designer event listener for "${event}":`, error);
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
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 监听拖拽事件
    this.dragon.on('start', (data) => {
      console.log('Dragon start:', data);
    });
    
    this.dragon.on('drag', (data) => {
      console.log('Dragon drag:', data);
    });
    
    this.dragon.on('end', (data) => {
      console.log('Dragon end:', data);
      // 触发变更事件
      this.emit('change', { type: 'drag', data });
    });
    
    this.dragon.on('cancel', (data) => {
      console.log('Dragon cancel:', data);
    });
    
    // 监听选区事件
    this.selection.on('select', (data) => {
      console.log('Selection select:', data);
      // 触发变更事件
      this.emit('change', { type: 'selection', data });
    });
    
    this.selection.on('deselect', (data) => {
      console.log('Selection deselect:', data);
      // 触发变更事件
      this.emit('change', { type: 'selection', data });
    });
    
    // 监听历史记录事件
    this.history.on('push', (data) => {
      console.log('History push:', data);
    });
    
    this.history.on('undo', (data) => {
      console.log('History undo:', data);
      // 触发变更事件
      this.emit('change', { type: 'history', data });
    });
    
    this.history.on('redo', (data) => {
      console.log('History redo:', data);
      // 触发变更事件
      this.emit('change', { type: 'history', data });
    });
    
    // 监听模拟器事件
    this.simulator.on('render', (data) => {
      console.log('Simulator render:', data);
    });
  }

  /**
   * 导出设计器状态
   * 
   * @returns 设计器状态
   */
  export(): any {
    return {
      initialized: this.isInitialized.value,
      started: this.isStarted.value,
      config: this.config,
      documentModel: this.documentModel.export(),
      selection: this.selection.export(),
      history: this.history.export(),
      simulator: this.simulator.getState(),
    };
  }

  /**
   * 导入设计器状态
   * 
   * @param state - 设计器状态
   */
  import(state: any): void {
    if (state.config) {
      this.config = state.config;
    }
    
    if (state.history) {
      this.history.import(state.history);
    }
    
    if (state.selection) {
      this.selection.import(state.selection);
    }
  }
}
