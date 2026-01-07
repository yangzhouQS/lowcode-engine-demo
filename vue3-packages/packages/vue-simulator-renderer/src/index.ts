/**
 * @vue3-lowcode/vue-simulator-renderer
 * 
 * Vue3 低代码引擎 Vue 模拟器渲染器包
 * 
 * 提供模拟器特定的渲染器实现，支持设备模拟、缩放等功能。
 * 
 * @packageDocumentation
 */

// 导出模拟器渲染器
export { SimulatorRenderer } from './renderer/SimulatorRenderer';

// 导出类型
export type { SimulatorConfig, SimulatorDevice } from './renderer/SimulatorRenderer';

// 导出预设设备
export { PRESET_DEVICES } from './renderer/SimulatorRenderer';
