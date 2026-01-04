/**
 * Vue3 LowCode Engine - Utils Package
 * 原生选择相关工具
 */

export function getNativeSelection(): Selection | null {
  if (typeof window !== 'undefined' && window.getSelection) {
    return window.getSelection();
  }
  return null;
}

export function clearNativeSelection(): void {
  const selection = getNativeSelection();
  if (selection) {
    selection.removeAllRanges();
  }
}
