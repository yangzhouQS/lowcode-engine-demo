/**
 * IDragon Interface
 * 
 * 拖拽引擎接口
 * 
 * @public
 */

/**
 * 拖拽对象类型枚举
 */
export enum IPublicEnumDragObjectType {
  /** 节点拖拽 */
  Node = 'node',
  /** 节点数据拖拽 */
  NodeData = 'nodedata',
}

/**
 * 拖拽节点对象
 */
export interface IPublicTypeDragNodeObject {
  /** 拖拽对象类型 */
  type: IPublicEnumDragObjectType.Node;
  /** 节点列表 */
  nodes: any[];
}

/**
 * 拖拽节点数据对象
 */
export interface IPublicTypeDragNodeDataObject {
  /** 拖拽对象类型 */
  type: IPublicEnumDragObjectType.NodeData;
  /** 节点数据 */
  data: any | any[];
}

/**
 * 拖拽任意对象
 */
export interface IPublicTypeDragAnyObject {
  /** 拖拽对象类型 */
  type: string;
  /** 拖拽数据 */
  data: any;
}

/**
 * 拖拽对象（联合类型）
 */
export type IPublicModelDragObject = IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject | IPublicTypeDragAnyObject;

/**
 * 定位事件
 */
export interface IPublicModelLocateEvent {
  /** 事件类型 */
  type: string;
  /** 拖拽对象 */
  dragObject: IPublicModelDragObject;
  /** 目标元素 */
  target: any;
  /** 原始事件 */
  originalEvent: MouseEvent | DragEvent;
  /** 全局X坐标 */
  globalX: number;
  /** 全局Y坐标 */
  globalY: number;
  /** 画布X坐标 */
  canvasX?: number;
  /** 画布Y坐标 */
  canvasY?: number;
  /** 感应器 */
  sensor?: IPublicModelSensor;
}

/**
 * 模拟器接口
 */
export interface IPublicModelSensor {
  /** 感应器是否可用 */
  sensorAvailable?: boolean;
  /** 是否进入感应器 */
  isEnter?: (e: IPublicModelLocateEvent) => boolean;
  /** 修复事件 */
  fixEvent?: (e: IPublicModelLocateEvent) => void;
  /** 定位 */
  locate?: (e: IPublicModelLocateEvent) => void;
  /** 停用感应器 */
  deactiveSensor?: () => void;
  /** 获取投放容器 */
  getDropContainer?: (e: IPublicModelLocateEvent) => any;
  /** 从元素获取节点实例 */
  getNodeInstanceFromElement?: (element: Element) => any;
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

/**
 * 可释放对象
 */
export interface IPublicTypeDisposable {
  /** 释放函数 */
  dispose: () => void;
}

/**
 * Dragon 接口
 */
export interface IPublicModelDragon<TNode = any, TLocateEvent = IPublicModelLocateEvent> {
  /** 是否正在拖拽 */
  isDragging: boolean;
  /** 当前激活的感应器 */
  _activeSensor?: IPublicModelSensor;
  /** 添加感应器 */
  addSensor: (sensor: IPublicModelSensor) => void;
  /** 移除感应器 */
  removeSensor: (sensor: IPublicModelSensor) => void;
  /** 监听拖拽开始 */
  onDragstart: (func: (e: TLocateEvent) => any) => IPublicTypeDisposable;
  /** 监听拖拽进行 */
  onDrag: (func: (e: TLocateEvent) => any) => IPublicTypeDisposable;
  /** 监听拖拽结束 */
  onDragend: (func: (x: { dragObject: IPublicModelDragObject; copy: boolean }) => any) => IPublicTypeDisposable;
}
