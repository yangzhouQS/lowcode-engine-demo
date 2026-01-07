/**
 * BuiltinSimulatorHost
 * 
 * 内置模拟器宿主类,管理模拟器的生命周期、配置和渲染
 * 
 * @public
 */
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { IDocumentModel } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';

export interface SimulatorConfig {
  container?: HTMLElement;
  device?: 'mobile' | 'desktop' | 'tablet';
  width?: number;
  height?: number;
  scale?: number;
  locale?: string;
}

export class BuiltinSimulatorHost {
  private documentModel: IDocumentModel | null;
  private config: SimulatorConfig;
  private isReadyRef: Ref<boolean>;
  private configRef: Ref<SimulatorConfig>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor(config: SimulatorConfig = {}) {
    this.documentModel = null;
    this.config = {
      device: 'desktop',
      width: 1200,
      height: 800,
      scale: 1,
      locale: 'zh-CN',
      ...config,
    };
    this.isReadyRef = ref(false);
    this.configRef = ref({ ...this.config });
    this.eventBus = useEventBus();
  }

  /**
   * 初始化模拟器
   * 
   * @param documentModel - 文档模型
   */
  async init(documentModel: IDocumentModel): Promise<void> {
    this.documentModel = documentModel;
    this.isReadyRef.value = false;
    
    // 监听文档变化
    documentModel.on('document:change', this.handleDocumentChange.bind(this));
    
    this.isReadyRef.value = true;
    this.eventBus.emit('simulator:ready', { config: this.config });
  }

  /**
   * 启动模拟器
   */
  async start(): Promise<void> {
    if (!this.isReadyRef.value) {
      throw new Error('Simulator not initialized');
    }
    
    this.eventBus.emit('simulator:start', { config: this.config });
  }

  /**
   * 停止模拟器
   */
  async stop(): Promise<void> {
    this.isReadyRef.value = false;
    this.eventBus.emit('simulator:stop', {});
  }

  /**
   * 重新渲染模拟器
   */
  async render(): Promise<void> {
    if (!this.isReadyRef.value) {
      throw new Error('Simulator not initialized');
    }
    
    this.eventBus.emit('simulator:render', { document: this.documentModel?.getCurrentDocument() });
  }

  /**
   * 更新配置
   * 
   * @param config - 配置
   */
  updateConfig(config: Partial<SimulatorConfig>): void {
    this.config = { ...this.config, ...config };
    this.configRef.value = { ...this.config };
    this.eventBus.emit('simulator:config-change', { config: this.config });
  }

  /**
   * 获取配置
   * 
   * @returns 配置
   */
  getConfig(): SimulatorConfig {
    return { ...this.config };
  }

  /**
   * 获取配置的响应式引用
   * 
   * @returns 配置的响应式引用
   */
  getConfigRef(): Ref<SimulatorConfig> {
    return this.configRef;
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
   * 获取文档模型
   * 
   * @returns 文档模型
   */
  getDocumentModel(): IDocumentModel | null {
    return this.documentModel;
  }

  /**
   * 设置设备类型
   * 
   * @param device - 设备类型
   */
  setDevice(device: 'mobile' | 'desktop' | 'tablet'): void {
    this.config.device = device;
    
    // 根据设备类型设置默认尺寸
    switch (device) {
      case 'mobile':
        this.config.width = 375;
        this.config.height = 667;
        break;
      case 'tablet':
        this.config.width = 768;
        this.config.height = 1024;
        break;
      case 'desktop':
      default:
        this.config.width = 1200;
        this.config.height = 800;
        break;
    }
    
    this.configRef.value = { ...this.config };
    this.eventBus.emit('simulator:device-change', { device, config: this.config });
  }

  /**
   * 设置尺寸
   * 
   * @param width - 宽度
   * @param height - 高度
   */
  setSize(width: number, height: number): void {
    this.config.width = width;
    this.config.height = height;
    this.configRef.value = { ...this.config };
    this.eventBus.emit('simulator:size-change', { width, height });
  }

  /**
   * 设置缩放比例
   * 
   * @param scale - 缩放比例
   */
  setScale(scale: number): void {
    this.config.scale = scale;
    this.configRef.value = { ...this.config };
    this.eventBus.emit('simulator:scale-change', { scale });
  }

  /**
   * 设置语言
   * 
   * @param locale - 语言
   */
  setLocale(locale: string): void {
    this.config.locale = locale;
    this.configRef.value = { ...this.config };
    this.eventBus.emit('simulator:locale-change', { locale });
  }

  /**
   * 处理文档变化
   * 
   * @param event - 事件
   */
  private handleDocumentChange(event: any): void {
    this.eventBus.emit('simulator:document-change', event);
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
   * 销毁模拟器
   */
  async dispose(): Promise<void> {
    await this.stop();
    this.clearListeners();
    this.eventBus.emit('simulator:dispose', {});
  }

  /**
   * 导出模拟器状态
   * 
   * @returns 模拟器状态
   */
  export(): any {
    return {
      config: this.config,
      isReady: this.isReadyRef.value,
    };
  }

  /**
   * 导入模拟器状态
   * 
   * @param state - 模拟器状态
   */
  async import(state: any): Promise<void> {
    this.config = { ...this.config, ...state.config };
    this.configRef.value = { ...this.config };
    this.isReadyRef.value = state.isReady || false;
    this.eventBus.emit('simulator:import', { state });
  }
}
