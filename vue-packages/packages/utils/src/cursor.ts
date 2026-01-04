/**
 * Vue3 LowCode Engine - Utils Package
 * 光标相关工具
 */

export enum CursorType {
  DEFAULT = 'default',
  POINTER = 'pointer',
  MOVE = 'move',
  CROSSHAIR = 'crosshair',
  TEXT = 'text',
  WAIT = 'wait',
  HELP = 'help',
  RESIZE_N = 'n-resize',
  RESIZE_S = 's-resize',
  RESIZE_E = 'e-resize',
  RESIZE_W = 'w-resize',
  RESIZE_NE = 'ne-resize',
  RESIZE_NW = 'nw-resize',
  RESIZE_SE = 'se-resize',
  RESIZE_SW = 'sw-resize',
  COL_RESIZE = 'col-resize',
  ROW_RESIZE = 'row-resize',
  NOT_ALLOWED = 'not-allowed',
  GRAB = 'grab',
  GRABBING = 'grabbing',
}

let currentCursor: CursorType = CursorType.DEFAULT;

export function setCursor(cursor: CursorType): void {
  if (currentCursor === cursor) {
    return;
  }
  currentCursor = cursor;
  document.body.style.cursor = cursor;
}

export function getCursor(): CursorType {
  return currentCursor;
}

export function resetCursor(): void {
  setCursor(CursorType.DEFAULT);
}
