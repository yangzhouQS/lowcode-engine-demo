import { VueRenderer } from '@vue3-lowcode/vue-renderer';
import type { IRendererProps } from '@vue3-lowcode/renderer-core';

/**
 * Vue3 simulator renderer implementation
 * Vue3 模拟器渲染器实现
 */
export class SimulatorRenderer extends VueRenderer {
  protected _simulatorMode: boolean;
  protected _device: 'desktop' | 'mobile' | 'tablet';

  constructor(config: Record<string, any> = {}) {
    super(config);
    this._simulatorMode = false;
    this._device = 'desktop';
  }

  /**
   * Enable simulator mode
   * 启用模拟器模式
   */
  enableSimulatorMode(): void {
    this._simulatorMode = true;
    this.emit('simulatorModeEnabled');
  }

  /**
   * Disable simulator mode
   * 禁用模拟器模式
   */
  disableSimulatorMode(): void {
    this._simulatorMode = false;
    this.emit('simulatorModeDisabled');
  }

  /**
   * Check if simulator mode is enabled
   * 检查是否启用了模拟器模式
   */
  isSimulatorMode(): boolean {
    return this._simulatorMode;
  }

  /**
   * Set device
   * 设置设备
   * @param device - The device type
   */
  setDevice(device: 'desktop' | 'mobile' | 'tablet'): void {
    this._device = device;
    this.emit('deviceChanged', device);
  }

  /**
   * Get device
   * 获取设备
   */
  getDevice(): 'desktop' | 'mobile' | 'tablet' {
    return this._device;
  }

  /**
   * Render a component
   * 渲染组件
   * @param props - The renderer props
   */
  render(props: IRendererProps): void {
    // Add simulator mode and device to props
    const simulatorProps = {
      ...props,
      simulatorMode: this._simulatorMode,
      device: this._device,
    };
    super.render(simulatorProps);
    this.emit('simulatorRendered', simulatorProps);
  }

  /**
   * Dispose the renderer
   * 销毁渲染器
   */
  dispose(): void {
    this._simulatorMode = false;
    this._device = 'desktop';
    super.dispose();
  }
}
