/**
 * Cursor utilities
 * 
 * 鼠标光标状态管理
 */

/**
 * 设置拖拽状态
 * @param state - 是否正在拖拽
 */
export function setDragging(state: boolean): void {
  if (state) {
    document.body.style.cursor = 'move';
  } else {
    document.body.style.cursor = '';
  }
}

/**
 * 设置复制状态
 * @param state - 是否为复制模式
 */
export function setCopy(state: boolean): void {
  if (state) {
    document.body.style.cursor = 'copy';
  } else {
    document.body.style.cursor = '';
  }
}

/**
 * 释放光标状态
 */
export function release(): void {
  document.body.style.cursor = '';
}

/**
 * 导出所有光标工具函数
 */
export const cursor = {
  setDragging,
  setCopy,
  release,
};
