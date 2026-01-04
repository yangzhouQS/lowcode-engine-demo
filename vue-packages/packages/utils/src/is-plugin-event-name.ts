/**
 * Vue3 LowCode Engine - Utils Package
 * 插件事件名检查相关工具
 */

export function isPluginEventName(eventName: string): boolean {
  return eventName && eventName.startsWith('plugin.');
}
