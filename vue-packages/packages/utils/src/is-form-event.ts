/**
 * Vue3 LowCode Engine - Utils Package
 * 表单事件检查相关工具
 */

export function isFormEvent(e: any): boolean {
  if (!e) return false;
  if (typeof e !== 'object') return false;
  if (!e.target) return false;
  return (
    e.target.tagName === 'INPUT' ||
    e.target.tagName === 'TEXTAREA' ||
    e.target.tagName === 'SELECT' ||
    e.target.isContentEditable
  );
}
