/**
 * ISimulatorHost Interface
 * 
 * 模拟器宿主接口
 * 
 * @public
 */

/**
 * 模拟器宿主接口
 */
export interface ISimulatorHost {
  /** 模拟器是否可用 */
  sensorAvailable?: boolean;
  /** 内容文档 */
  contentDocument?: Document;
  /** 视口 */
  viewport?: {
    /** 转换为全局坐标 */
    toGlobalPoint: (e: MouseEvent | DragEvent) => { clientX: number; clientY: number };
  };
  /** 设置原生选择状态 */
  setNativeSelection?: (enable: boolean) => void;
  /** 设置拖拽状态 */
  setDraggingState?: (state: boolean) => void;
  /** 设置复制状态 */
  setCopyState?: (state: boolean) => void;
  /** 清除状态 */
  clearState?: () => void;
}
