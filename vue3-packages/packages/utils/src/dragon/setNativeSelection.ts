/**
 * setNativeSelection
 * 
 * 设置原生选择状态
 * 
 * @param enableFlag - 是否启用原生选择
 */
export function setNativeSelection(enableFlag: boolean): void {
  if (enableFlag) {
    document.body.style.userSelect = 'auto';
  } else {
    document.body.style.userSelect = 'none';
  }
}
