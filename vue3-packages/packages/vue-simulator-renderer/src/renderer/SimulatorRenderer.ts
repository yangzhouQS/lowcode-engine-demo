import { VueRenderer } from '@vue3-lowcode/vue-renderer';
import type { Component, VNode } from 'vue';
import type { IComponentMeta, ISchema } from '@vue3-lowcode/types';
import type { RenderContext, ComponentInstance } from '@vue3-lowcode/renderer-core';

/**
 * 模拟器配置
 */
export interface SimulatorConfig {
  /**
   * 容器元素
   */
  container?: Element;

  /**
   * 是否启用调试模式
   */
  debug?: boolean;

  /**
   * 是否启用性能监控
   */
  performance?: boolean;

  /**
   * 是否启用错误边界
   */
  errorBoundary?: boolean;

  /**
   * 错误处理器
   */
  errorHandler?: (error: Error) => void;

  /**
   * 警告处理器
   */
  warningHandler?: (warning: string) => void;

  /**
   * 模拟器宽度
   */
  width?: number;

  /**
   * 模拟器高度
   */
  height?: number;

  /**
   * 模拟器缩放
   */
  scale?: number;

  /**
   * 模拟器设备
   */
  device?: SimulatorDevice;

  /**
   * 自定义样式
   */
  styles?: Record<string, string>;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 模拟器设备
 */
export interface SimulatorDevice {
  /**
   * 设备名称
   */
  name: string;

  /**
   * 设备宽度
   */
  width: number;

  /**
   * 设备高度
   */
  height: number;

  /**
   * 设备缩放
   */
  scale?: number;

  /**
   * 设备描述
   */
  description?: string;
}

/**
 * 预设设备
 */
export const PRESET_DEVICES: SimulatorDevice[] = [
  {
    name: 'iPhone 12 Pro',
    width: 390,
    height: 844,
    scale: 3,
    description: 'iPhone 12 Pro - 390x844 @3x',
  },
  {
    name: 'iPhone 12',
    width: 390,
    height: 844,
    scale: 2,
    description: 'iPhone 12 - 390x844 @2x',
  },
  {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    scale: 2,
    description: 'iPhone SE - 375x667 @2x',
  },
  {
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    scale: 2,
    description: 'iPad Pro - 1024x1366 @2x',
  },
  {
    name: 'Desktop',
    width: 1920,
    height: 1080,
    scale: 1,
    description: 'Desktop - 1920x1080 @1x',
  },
];

/**
 * 模拟器渲染器实现
 * 
 * 继承自 VueRenderer，提供模拟器特定的渲染功能。
 * 支持设备模拟、缩放、样式自定义等功能。
 * 
 * @example
 * ```typescript
 * const simulator = new SimulatorRenderer({
 *   container: document.getElementById('simulator'),
 *   device: PRESET_DEVICES[0],
 *   debug: true,
 * });
 * 
 * // 渲染组件
 * simulator.render(MyComponent, schema);
 * 
 * // 设置设备
 * simulator.setDevice(PRESET_DEVICES[1]);
 * 
 * // 设置缩放
 * simulator.setScale(2);
 * ```
 */
export class SimulatorRenderer extends VueRenderer {
  /**
   * 模拟器配置
   */
  protected config: SimulatorConfig;

  /**
   * 模拟器容器
   */
  protected container?: Element;

  /**
   * 模拟器包装器
   */
  protected wrapper?: Element;

  /**
   * 模拟器内容容器
   */
  protected contentContainer?: Element;

  /**
   * 当前设备
   */
  protected currentDevice?: SimulatorDevice;

  /**
   * 当前缩放
   */
  protected currentScale: number;

  /**
   * 当前宽度
   */
  protected currentWidth: number;

  /**
   * 当前高度
   */
  protected currentHeight: number;

  /**
   * 是否已初始化
   */
  protected initialized: boolean;

  /**
   * 是否已销毁
   */
  protected destroyed: boolean;

  /**
   * 构造函数
   * 
   * @param config - 模拟器配置
   */
  constructor(config?: SimulatorConfig) {
    super(config);
    this.config = {
      debug: false,
      performance: false,
      errorBoundary: true,
      width: 1920,
      height: 1080,
      scale: 1,
      device: PRESET_DEVICES[4],
      ...config,
    };
    this.currentDevice = this.config.device;
    this.currentScale = this.config.scale || 1;
    this.currentWidth = this.config.width || 1920;
    this.currentHeight = this.config.height || 1080;
    this.initialized = false;
    this.destroyed = false;
  }

  /**
   * 初始化模拟器
   */
  init(): void {
    if (this.initialized) {
      console.warn('[SimulatorRenderer] Simulator already initialized');
      return;
    }

    // 创建模拟器结构
    this.createSimulatorStructure();

    // 应用初始配置
    this.applyConfig();

    this.initialized = true;
    this.log('[SimulatorRenderer] Simulator initialized');
  }

  /**
   * 渲染组件到模拟器
   * 
   * @param component - 要渲染的组件
   * @param schema - 组件 Schema
   * @param context - 渲染上下文
   * @returns 渲染的 VNode
   */
  render(
    component: Component,
    schema?: ISchema,
    context?: RenderContext
  ): VNode {
    if (this.destroyed) {
      throw new Error('[SimulatorRenderer] Simulator has been destroyed');
    }

    if (!this.initialized) {
      this.init();
    }

    if (!this.contentContainer) {
      throw new Error('[SimulatorRenderer] Content container not found');
    }

    // 渲染组件
    return super.renderComponent(component, this.contentContainer, context);
  }

  /**
   * 设置容器
   * 
   * @param container - 容器元素
   */
  setContainer(container: Element): void {
    this.config.container = container;
    this.container = container;

    // 重新创建模拟器结构
    if (this.initialized) {
      this.createSimulatorStructure();
      this.applyConfig();
    }

    this.log('[SimulatorRenderer] Container set');
  }

  /**
   * 设置设备
   * 
   * @param device - 设备
   */
  setDevice(device: SimulatorDevice): void {
    this.currentDevice = device;
    this.currentWidth = device.width;
    this.currentHeight = device.height;
    this.currentScale = device.scale || 1;

    this.applyConfig();
    this.log('[SimulatorRenderer] Device set:', device.name);
  }

  /**
   * 设置缩放
   * 
   * @param scale - 缩放比例
   */
  setScale(scale: number): void {
    this.currentScale = scale;
    this.applyConfig();
    this.log('[SimulatorRenderer] Scale set:', scale);
  }

  /**
   * 设置宽度
   * 
   * @param width - 宽度
   */
  setWidth(width: number): void {
    this.currentWidth = width;
    this.applyConfig();
    this.log('[SimulatorRenderer] Width set:', width);
  }

  /**
   * 设置高度
   * 
   * @param height - 高度
   */
  setHeight(height: number): void {
    this.currentHeight = height;
    this.applyConfig();
    this.log('[SimulatorRenderer] Height set:', height);
  }

  /**
   * 设置大小
   * 
   * @param width - 宽度
   * @param height - 高度
   */
  setSize(width: number, height: number): void {
    this.currentWidth = width;
    this.currentHeight = height;
    this.applyConfig();
    this.log('[SimulatorRenderer] Size set:', width, 'x', height);
  }

  /**
   * 设置样式
   * 
   * @param styles - 样式
   */
  setStyles(styles: Record<string, string>): void {
    this.config.styles = styles;
    this.applyConfig();
    this.log('[SimulatorRenderer] Styles set');
  }

  /**
   * 设置类名
   * 
   * @param className - 类名
   */
  setClassName(className: string): void {
    this.config.className = className;
    this.applyConfig();
    this.log('[SimulatorRenderer] Class name set:', className);
  }

  /**
   * 获取当前设备
   * 
   * @returns 当前设备
   */
  getDevice(): SimulatorDevice | undefined {
    return this.currentDevice;
  }

  /**
   * 获取当前缩放
   * 
   * @returns 当前缩放
   */
  getScale(): number {
    return this.currentScale;
  }

  /**
   * 获取当前宽度
   * 
   * @returns 当前宽度
   */
  getWidth(): number {
    return this.currentWidth;
  }

  /**
   * 获取当前高度
   * 
   * @returns 当前高度
   */
  getHeight(): number {
    return this.currentHeight;
  }

  /**
   * 获取配置
   * 
   * @returns 模拟器配置
   */
  getConfig(): SimulatorConfig {
    return { ...this.config };
  }

  /**
   * 设置配置
   * 
   * @param config - 模拟器配置
   */
  setConfig(config: Partial<SimulatorConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };

    if (config.device) {
      this.currentDevice = config.device;
      this.currentWidth = config.device.width;
      this.currentHeight = config.device.height;
      this.currentScale = config.device.scale || 1;
    }

    if (config.scale) {
      this.currentScale = config.scale;
    }

    if (config.width) {
      this.currentWidth = config.width;
    }

    if (config.height) {
      this.currentHeight = config.height;
    }

    this.applyConfig();
    this.log('[SimulatorRenderer] Config updated');
  }

  /**
   * 创建模拟器结构
   */
  protected createSimulatorStructure(): void {
    if (!this.config.container) {
      console.warn('[SimulatorRenderer] Container not provided');
      return;
    }

    // 清空容器
    this.config.container.innerHTML = '';

    // 创建包装器
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'simulator-wrapper';
    this.applyWrapperStyles(this.wrapper);

    // 创建内容容器
    this.contentContainer = document.createElement('div');
    this.contentContainer.className = 'simulator-content';
    this.applyContentStyles(this.contentContainer);

    // 组装结构
    this.wrapper.appendChild(this.contentContainer);
    this.config.container.appendChild(this.wrapper);

    this.log('[SimulatorRenderer] Simulator structure created');
  }

  /**
   * 应用配置
   */
  protected applyConfig(): void {
    if (!this.wrapper || !this.contentContainer) {
      return;
    }

    // 应用内容容器样式
    this.applyContentStyles(this.contentContainer);

    // 应用包装器样式
    this.applyWrapperStyles(this.wrapper);

    // 应用自定义样式
    if (this.config.styles) {
      for (const [property, value] of Object.entries(this.config.styles)) {
        if (this.contentContainer) {
          (this.contentContainer as HTMLElement).style[property as any] = value;
        }
      }
    }

    // 应用自定义类名
    if (this.config.className) {
      if (this.wrapper) {
        this.wrapper.className = `simulator-wrapper ${this.config.className}`;
      }
    }

    this.log('[SimulatorRenderer] Config applied');
  }

  /**
   * 应用包装器样式
   * 
   * @param wrapper - 包装器元素
   */
  protected applyWrapperStyles(wrapper: Element): void {
    const styles: Record<string, string> = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      boxSizing: 'border-box',
    };

    for (const [property, value] of Object.entries(styles)) {
      (wrapper as HTMLElement).style[property as any] = value;
    }
  }

  /**
   * 应用内容容器样式
   * 
   * @param container - 内容容器元素
   */
  protected applyContentStyles(container: Element): void {
    const styles: Record<string, string> = {
      width: `${this.currentWidth}px`,
      height: `${this.currentHeight}px`,
      transform: `scale(${this.currentScale})`,
      transformOrigin: 'top left',
      backgroundColor: '#ffffff',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    };

    for (const [property, value] of Object.entries(styles)) {
      (container as HTMLElement).style[property as any] = value;
    }
  }

  /**
   * 销毁模拟器
   */
  destroy(): void {
    if (this.destroyed) {
      console.warn('[SimulatorRenderer] Simulator already destroyed');
      return;
    }

    // 清空容器
    if (this.config.container) {
      this.config.container.innerHTML = '';
    }

    // 清空引用
    this.wrapper = undefined;
    this.contentContainer = undefined;
    this.container = undefined;

    // 销毁父类
    super.destroy();

    this.destroyed = true;
    this.log('[SimulatorRenderer] Simulator destroyed');
  }

  /**
   * 记录日志
   * 
   * @param message - 日志消息
   * @param data - 附加数据
   */
  protected log(message: string, ...data: any[]): void {
    if (this.config.debug) {
      console.log(message, ...data);
    }
  }

  /**
   * 重置模拟器
   */
  reset(): void {
    this.currentDevice = this.config.device;
    this.currentScale = this.config.scale || 1;
    this.currentWidth = this.config.width || 1920;
    this.currentHeight = this.config.height || 1080;
    this.applyConfig();
    this.log('[SimulatorRenderer] Simulator reset');
  }

  /**
   * 获取预设设备
   * 
   * @returns 预设设备列表
   */
  static getPresetDevices(): SimulatorDevice[] {
    return [...PRESET_DEVICES];
  }

  /**
   * 添加自定义设备
   * 
   * @param device - 设备
   */
  static addPresetDevice(device: SimulatorDevice): void {
    PRESET_DEVICES.push(device);
  }

  /**
   * 移除预设设备
   * 
   * @param name - 设备名称
   */
  static removePresetDevice(name: string): void {
    const index = PRESET_DEVICES.findIndex((d) => d.name === name);
    if (index !== -1) {
      PRESET_DEVICES.splice(index, 1);
    }
  }

  /**
   * 清空预设设备
   */
  static clearPresetDevices(): void {
    PRESET_DEVICES.length = 0;
  }

  /**
   * 获取设备信息
   * 
   * @returns 设备信息
   */
  getDeviceInfo(): {
    device?: SimulatorDevice;
    width: number;
    height: number;
    scale: number;
  } {
    return {
      device: this.currentDevice,
      width: this.currentWidth,
      height: this.currentHeight,
      scale: this.currentScale,
    };
  }

  /**
   * 检查是否已初始化
   * 
   * @returns 是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * 检查是否已销毁
   * 
   * @returns 是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
}
