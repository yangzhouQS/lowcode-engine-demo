/**
 * @vue3-lowcode/renderer-core
 * 
 * Vue3 低代码引擎渲染器核心包
 * 
 * 提供渲染器基础接口和抽象类，用于实现不同框架的渲染器。
 * 
 * @packageDocumentation
 */

// 导出运行时接口
export type {
  IRuntime,
  RenderContext,
  ComponentInstance,
  RuntimeConfig,
} from './runtime/IRuntime';

// 导出渲染器基类
export { BaseRenderer } from './renderer/BaseRenderer';
