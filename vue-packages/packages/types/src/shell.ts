/**
 * Vue3 LowCode Engine - Shell Types
 * 低代码引擎Shell类型定义
 */

import {
  NodeSchema,
  ComponentSchema,
  PropsMap,
  PropValue,
  JSExpression,
  JSFunction,
  JSSlot,
  I18nData,
  TransformStage,
  ComponentMetadata,
  SetterConfig,
  TitleConfig,
  TipConfig,
  ProjectSchema,
  PluginConfig,
  PluginRegisterOptions,
  IPublicTypeNpmInfo,
  ComponentInstance,
} from './schema';

/**
 * NPM信息接口
 */
export interface IPublicTypeNpmInfo {
  /**
   * 包名
   */
  package: string;

  /**
   * 版本
   */
  version: string;

  /**
   * 导出名称
   */
  exportName?: string;

  /**
   * 子名称
   */
  subName?: string;

  /**
   * 主文件
   */
  main?: string;

  /**
   * 是否解构
   */
  destructuring?: boolean;

  /**
   * 资源名称
   */
  resourceName?: string;

  /**
   * 资源
   */
  resource?: string;
}

/**
 * 编辑器模型接口
 */
export interface IPublicModelEditor {
  /**
   * 获取编辑器ID
   */
  id: string;

  /**
   * 获取项目
   */
  getProject(): IPublicModelProject;

  /**
   * 获取设计器
   */
  getDesigner(): IPublicModelDesigner;

  /**
   * 获取所有文档
   */
  getDocuments(): IPublicModelDocumentModel[];

  /**
   * 获取当前文档
   */
  getCurrentDocument(): IPublicModelDocumentModel | null;

  /**
   * 获取骨架
   */
  getSkeleton(): IPublicModelSkeleton;

  /**
   * 获取插件上下文
   */
  getPluginContext(): IPublicModelPluginContext;

  /**
   * 获取事件总线
   */
  getEventBus(): any;

  /**
   * 获取配置
   */
  getConfig(): any;

  /**
   * 获取国际化
   */
  getI18n(): any;

  /**
   * 获取快捷键
   */
  getHotkey(): any;

  /**
   * 获取日志
   */
  getLogger(): any;

  /**
   * 获取设置
   */
  getSetting(): any;

  /**
   * 获取材料
   */
  getMaterial(): any;

  /**
   * 获取工作区
   */
  getWorkspace(): any;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 项目模型接口
 */
export interface IPublicModelProject {
  /**
   * 项目ID
   */
  id: string;

  /**
   * 项目名称
   */
  name: string;

  /**
   * 项目版本
   */
  version: string;

  /**
   * 获取文档模型
   */
  getDocuments(): IPublicModelDocumentModel[];

  /**
   * 获取当前文档
   */
  getCurrentDocument(): IPublicModelDocumentModel | null;

  /**
   * 打开文档
   */
  openDocument(id: string): IPublicModelDocumentModel;

  /**
   * 关闭文档
   */
  closeDocument(id: string): void;

  /**
   * 导出Schema
   */
  export(stage?: TransformStage): any;

  /**
   * 导入Schema
   */
  import(schema: any): void;

  /**
   * 获取模拟渲染器
   */
  getSimulators(): IPublicModelSimulator[];

  /**
   * 获取设计器
   */
  getDesigner(): IPublicModelDesigner;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 设计器模型接口
 */
export interface IPublicModelDesigner {
  /**
   * 获取项目
   */
  getProject(): IPublicModelProject;

  /**
   * 获取当前文档
   */
  getCurrentDocument(): IPublicModelDocumentModel | null;

  /**
   * 获取所有文档
   */
  getDocuments(): IPublicModelDocumentModel[];

  /**
   * 获取模拟渲染器
   */
  getSimulators(): IPublicModelSimulator[];

  /**
   * 获取组件元数据
   */
  getComponentMeta(componentName: string): IPublicModelComponentMeta | null;

  /**
   * 获取所有组件元数据
   */
  getComponentMetas(): Map<string, IPublicModelComponentMeta>;

  /**
   * 设置组件元数据
   */
  setComponentMeta(componentName: string, meta: IPublicModelComponentMeta): void;

  /**
   * 获取拖拽对象
   */
  getDragObject(): any;

  /**
   * 设置拖拽对象
   */
  setDragObject(dragObject: any): void;

  /**
   * 清除拖拽对象
   */
  clearDragObject(): void;

  /**
   * 获取剪贴板
   */
  getClipboard(): IPublicModelClipboard;

  /**
   * 获取检测器
   */
  getDetecting(): IPublicModelDetecting;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 文档模型接口
 */
export interface IPublicModelDocumentModel {
  /**
   * 文档ID
   */
  id: string;

  /**
   * 文档标题
   */
  title: string;

  /**
   * 获取根节点
   */
  getRootNode(): IPublicModelNode;

  /**
   * 获取节点
   */
  getNode(id: string): IPublicModelNode | null;

  /**
   * 获取焦点节点
   */
  getFocusNode(): IPublicModelNode | null;

  /**
   * 获取选择
   */
  getSelection(): IPublicModelSelection;

  /**
   * 获取历史记录
   */
  getHistory(): IPublicModelHistory;

  /**
   * 获取项目
   */
  getProject(): IPublicModelProject;

  /**
   * 导出Schema
   */
  export(stage?: TransformStage): NodeSchema;

  /**
   * 导入Schema
   */
  import(schema: NodeSchema): void;

  /**
   * 添加节点
   */
  addNode(
    parent: IPublicModelNode | string,
    node: IPublicModelNode | NodeSchema,
    at?: number
  ): IPublicModelNode;

  /**
   * 移除节点
   */
  removeNode(id: string): void;

  /**
   * 选择节点
   */
  select(id: string): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 节点模型接口
 */
export interface IPublicModelNode {
  /**
   * 节点ID
   */
  id: string;

  /**
   * 节点组件名称
   */
  componentName: string;

  /**
   * 节点状态
   */
  isLocked: boolean;
  isHidden: boolean;
  isNullNode: boolean;
  isRoot: boolean;
  isPage: boolean;
  isComponent: boolean;
  isModal: boolean;
  isSlot: boolean;
  isParent: boolean;
  isLeaf: boolean;

  /**
   * 获取父节点
   */
  getParent(): IPublicModelNode | null;

  /**
   * 获取子节点
   */
  getChildren(): IPublicModelNode[];

  /**
   * 获取指定索引的子节点
   */
  getChildAt(index: number): IPublicModelNode | null;

  /**
   * 获取索引
   */
  getIndex(): number;

  /**
   * 获取所有后代节点
   */
  getDescendants(deep?: boolean): IPublicModelNode[];

  /**
   * 获取节点Schema
   */
  export(stage?: TransformStage): NodeSchema;

  /**
   * 获取节点Props
   */
  getProps(): IPublicModelProps;

  /**
   * 获取指定Prop
   */
  getProp(path: string, createIfNone?: boolean): IPublicModelProp | null;

  /**
   * 获取组件元数据
   */
  getComponentMeta(): IPublicModelComponentMeta;

  /**
   * 获取文档模型
   */
  getDocument(): IPublicModelDocumentModel;

  /**
   * 获取节点实例
   */
  getInstance(): ComponentInstance | null;

  /**
   * 设置节点锁定状态
   */
  setLocked(flag: boolean): void;

  /**
   * 设置节点隐藏状态
   */
  setHidden(flag: boolean): void;

  /**
   * 设置节点条件
   */
  setCondition(condition: boolean | JSExpression): void;

  /**
   * 设置节点循环
   */
  setLoop(loop: JSExpression | Array<any> | string): void;

  /**
   * 添加子节点
   */
  addChild(
    node: IPublicModelNode | NodeSchema,
    at?: number | undefined,
    copy?: boolean | undefined
  ): IPublicModelNode;

  /**
   * 移除子节点
   */
  removeChild(node: IPublicModelNode | string): void;

  /**
   * 插入子节点
   */
  insertChild(
    node: IPublicModelNode | NodeSchema,
    at?: number | undefined,
    copy?: boolean | undefined
  ): IPublicModelNode;

  /**
   * 移动节点
   */
  move(target: IPublicModelNode, index?: number): void;

  /**
   * 选择节点
   */
  select(): void;

  /**
   * 悬停节点
   */
  hover(flag: boolean): void;

  /**
   * 内部节点
   */
  internalSetParent(parent: IPublicModelNode | null): void;

  /**
   * 内部设置组件元数据
   */
  internalSetComponentMeta(meta: IPublicModelComponentMeta): void;

  /**
   * 内部设置节点Schema
   */
  internalSetNodeSchema(schema: NodeSchema): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * Props模型接口
 */
export interface IPublicModelProps {
  /**
   * 获取所有Props
   */
  getProps(): Map<string, IPublicModelProp>;

  /**
   * 获取指定Prop
   */
  getProp(path: string): IPublicModelProp | null;

  /**
   * 获取路径
   */
  getPath(): string;

  /**
   * 获取节点
   */
  getNode(): IPublicModelNode;

  /**
   * 导出Props
   */
  export(stage?: TransformStage): PropsMap;

  /**
   * 内部设置节点
   */
  internalSetNode(node: IPublicModelNode): void;
}

/**
 * Prop模型接口
 */
export interface IPublicModelProp {
  /**
   * Prop键
   */
  key: string;

  /**
   * Prop路径
   */
  path: string;

  /**
   * Prop值
   */
  value: PropValue;

  /**
   * 是否是表达式
   */
  isUnset: boolean;

  /**
   * 是否是必需的
   */
  isRequired: boolean;

  /**
   * 是否是响应式的
   */
  isResponsive: boolean;

  /**
   * 获取值
   */
  getValue(): PropValue;

  /**
   * 设置值
   */
  setValue(val: PropValue): void;

  /**
   * 清除值
   */
  clearValue(): void;

  /**
   * 获取节点
   */
  getNode(): IPublicModelNode;

  /**
   * 获取Props
   */
  getProps(): IPublicModelProps;

  /**
   * 导出Prop
   */
  export(stage?: TransformStage): PropValue;

  /**
   * 获取Prop描述
   */
  getPropDescription(): {
    name: string;
    title?: TitleConfig;
    tip?: TipConfig;
    description?: string;
    defaultValue?: any;
    type?: string;
    isRequired?: boolean;
    setter?: SetterConfig | SetterConfig[];
  } | null;

  /**
   * 内部设置节点
   */
  internalSetNode(node: IPublicModelNode): void;
}

/**
 * 选择模型接口
 */
export interface IPublicModelSelection {
  /**
   * 获取选中节点
   */
  getNodes(): IPublicModelNode[];

  /**
   * 获取选中节点ID
   */
  getSelected(): string[];

  /**
   * 添加选中
   */
  add(id: string): void;

  /**
   * 移除选中
   */
  remove(id: string): void;

  /**
   * 清除选中
   */
  clear(): void;

  /**
   * 全选
   */
  selectAll(): void;

  /**
   * 是否选中
   */
  has(id: string): boolean;

  /**
   * 获取文档模型
   */
  getDocument(): IPublicModelDocumentModel;
}

/**
 * 历史记录模型接口
 */
export interface IPublicModelHistory {
  /**
   * 是否可以撤销
   */
  isEnableUndo: boolean;

  /**
   * 是否可以重做
   */
  isEnableRedo: boolean;

  /**
   * 获取状态
   */
  getState(): {
    isEnableUndo: boolean;
    isEnableRedo: boolean;
  };

  /**
   * 撤销
   */
  undo(): void;

  /**
   * 重做
   */
  redo(): void;

  /**
   * 保存状态
   */
  savePoint(): void;

  /**
   * 获取当前会话
   */
  getSession(): IPublicModelHistorySession | null;

  /**
   * 获取文档模型
   */
  getDocument(): IPublicModelDocumentModel;
}

/**
 * 历史记录会话接口
 */
export interface IPublicModelHistorySession {
  /**
   * 会话ID
   */
  id: string;

  /**
   * 会话标题
   */
  title: string;

  /**
   * 会话描述
   */
  description: string;

  /**
   * 会话时间
   */
  timestamp: number;

  /**
   * 会话数据
   */
  data: any;

  /**
   * 恢复会话
   */
  restore(): void;

  /**
   * 获取历史记录
   */
  getHistory(): IPublicModelHistory;
}

/**
 * 组件元数据模型接口
 */
export interface IPublicModelComponentMeta {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * 组件标题
   */
  title: string;

  /**
   * 组件描述
   */
  description: string;

  /**
   * 组件文档URL
   */
  docUrl: string;

  /**
   * 组件截图
   */
  screenshot: string;

  /**
   * 组件开发模式
   */
  devMode: string;

  /**
   * NPM信息
   */
  npm: IPublicTypeNpmInfo;

  /**
   * 组件配置
   */
  configure: any;

  /**
   * 代码片段
   */
  snippets: any[];

  /**
   * 实验性功能
   */
  experimental: any;

  /**
   * 组件图标
   */
  icon: string;

  /**
   * 获取组件元数据
   */
  getMetadata(): ComponentMetadata;

  /**
   * 设置组件元数据
   */
  setMetadata(metadata: ComponentMetadata): void;
}

/**
 * 模拟渲染器模型接口
 */
export interface IPublicModelSimulator {
  /**
   * 获取模拟渲染器ID
   */
  id: string;

  /**
   * 获取模拟渲染器容器
   */
  getContainer(): HTMLElement;

  /**
   * 获取模拟渲染器内容
   */
  getContent(): HTMLElement;

  /**
   * 获取模拟渲染器视口
   */
  getViewport(): HTMLElement;

  /**
   * 获取模拟渲染器文档
   */
  getDocument(): Document;

  /**
   * 获取模拟渲染器窗口
   */
  getWindow(): Window;

  /**
   * 获取模拟渲染器组件
   */
  getComponent(componentName: string): any;

  /**
   * 获取模拟渲染器组件实例
   */
  getComponentInstance(nodeId: string): ComponentInstance | null;

  /**
   * 刷新模拟渲染器
   */
  refresh(): void;

  /**
   * 清除模拟渲染器
   */
  clear(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 剪贴板模型接口
 */
export interface IPublicModelClipboard {
  /**
   * 获取剪贴板数据
   */
  getData(): NodeSchema[];

  /**
   * 设置剪贴板数据
   */
  setData(data: NodeSchema[]): void;

  /**
   * 清除剪贴板
   */
  clear(): void;

  /**
   * 是否为空
   */
  isEmpty(): boolean;
}

/**
 * 检测器模型接口
 */
export interface IPublicModelDetecting {
  /**
   * 获取检测节点
   */
  getDetecting(): IPublicModelNode | null;

  /**
   * 设置检测节点
   */
  setDetecting(node: IPublicModelNode | null): void;

  /**
   * 清除检测节点
   */
  clear(): void;
}

/**
 * 骨架模型接口
 */
export interface IPublicModelSkeleton {
  /**
   * 添加面板
   */
  addPanel(config: any): void;

  /**
   * 移除面板
   */
  removePanel(name: string): void;

  /**
   * 获取面板
   */
  getPanel(name: string): any;

  /**
   * 获取所有面板
   */
  getPanels(): any[];

  /**
   * 添加面板项
   */
  addPanelItem(panelName: string, item: any): void;

  /**
   * 移除面板项
   */
  removePanelItem(panelName: string, itemName: string): void;

  /**
   * 获取面板项
   */
  getPanelItem(panelName: string, itemName: string): any;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 插件上下文模型接口
 */
export interface IPublicModelPluginContext {
  /**
   * 获取编辑器
   */
  getEditor(): IPublicModelEditor;

  /**
   * 获取项目
   */
  getProject(): IPublicModelProject;

  /**
   * 获取设计器
   */
  getDesigner(): IPublicModelDesigner;

  /**
   * 获取文档
   */
  getDocument(): IPublicModelDocumentModel | null;

  /**
   * 获取节点
   */
  getNode(id: string): IPublicModelNode | null;

  /**
   * 获取选择
   */
  getSelection(): IPublicModelSelection;

  /**
   * 获取事件总线
   */
  getEventBus(): any;

  /**
   * 获取配置
   */
  getConfig(): any;

  /**
   * 获取国际化
   */
  getI18n(): any;

  /**
   * 获取快捷键
   */
  getHotkey(): any;

  /**
   * 获取日志
   */
  getLogger(): any;

  /**
   * 获取设置
   */
  getSetting(): any;

  /**
   * 获取材料
   */
  getMaterial(): any;

  /**
   * 获取工作区
   */
  getWorkspace(): any;
}

/**
 * 设置字段模型接口
 */
export interface IPublicModelSettingField {
  /**
   * 获取字段ID
   */
  id: string;

  /**
   * 获取字段键
   */
  key: string;

  /**
   * 获取字段值
   */
  getValue(): any;

  /**
   * 设置字段值
   */
  setValue(value: any): void;

  /**
   * 获取字段路径
   */
  getPath(): string;

  /**
   * 获取节点
   */
  getNode(): IPublicModelNode;

  /**
   * 获取父字段
   */
  getParent(): IPublicModelSettingField | null;

  /**
   * 获取子字段
   */
  getChildren(): IPublicModelSettingField[];

  /**
   * 获取配置
   */
  getConfig(): any;

  /**
   * 内部设置节点
   */
  internalSetNode(node: IPublicModelNode): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 设置目标模型接口
 */
export interface IPublicModelSettingTarget {
  /**
   * 获取目标节点
   */
  getNode(): IPublicModelNode;

  /**
   * 获取所有设置字段
   */
  getFields(): IPublicModelSettingField[];

  /**
   * 获取设置字段
   */
  getField(path: string): IPublicModelSettingField | null;

  /**
   * 获取配置
   */
  getConfig(): any;

  /**
   * 内部设置节点
   */
  internalSetNode(node: IPublicModelNode): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 设置顶级条目模型接口
 */
export interface IPublicModelSettingTopEntry {
  /**
   * 获取条目ID
   */
  id: string;

  /**
   * 获取目标
   */
  getTarget(): IPublicModelSettingTarget;

  /**
   * 获取名称
   */
  getName(): string;

  /**
   * 获取描述
   */
  getDescription(): string;

  /**
   * 获取图标
   */
  getIcon(): string;

  /**
   * 内部设置目标
   */
  internalSetTarget(target: IPublicModelSettingTarget): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 设置属性条目模型接口
 */
export interface IPublicModelSettingPropEntry {
  /**
   * 获取条目ID
   */
  id: string;

  /**
   * 获取目标
   */
  getTarget(): IPublicModelSettingTarget;

  /**
   * 获取名称
   */
  getName(): string;

  /**
   * 获取描述
   */
  getDescription(): string;

  /**
   * 获取图标
   */
  getIcon(): string;

  /**
   * 获取配置
   */
  getConfig(): any;

  /**
   * 内部设置目标
   */
  internalSetTarget(target: IPublicModelSettingTarget): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 活动追踪器模型接口
 */
export interface IPublicModelActiveTracker {
  /**
   * 获取活动节点
   */
  getActiveNode(): IPublicModelNode | null;

  /**
   * 设置活动节点
   */
  setActiveNode(node: IPublicModelNode | null): void;

  /**
   * 清除活动节点
   */
  clear(): void;
}

/**
 * 拖拽对象模型接口
 */
export interface IPublicModelDragObject {
  /**
   * 获取拖拽类型
   */
  getType(): string;

  /**
   * 获取拖拽数据
   */
  getData(): any;

  /**
   * 获取节点
   */
  getNodes(): IPublicModelNode[];

  /**
   * 获取位置
   */
  getLocation(): any | null;

  /**
   * 设置位置
   */
  setLocation(location: any): void;

  /**
   * 清除位置
   */
  clearLocation(): void;
}

/**
 * 拖拽引擎模型接口
 */
export interface IPublicModelDragon {
  /**
   * 开始拖拽
   */
  start(dragObject: any): void;

  /**
   * 结束拖拽
   */
  end(): void;

  /**
   * 获取拖拽对象
   */
  getDragObject(): IPublicModelDragObject | null;

  /**
   * 设置拖拽对象
   */
  setDragObject(dragObject: IPublicModelDragObject | null): void;

  /**
   * 清除拖拽对象
   */
  clearDragObject(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 位置模型接口
 */
export interface IPublicModelLocation {
  /**
   * 获取目标节点
   */
  getTarget(): IPublicModelNode | null;

  /**
   * 获取位置详情
   */
  getDetail(): any | null;

  /**
   * 设置位置
   */
  setLocation(location: any): void;

  /**
   * 清除位置
   */
  clear(): void;
}

/**
 * 滚动器模型接口
 */
export interface IPublicModelScroller {
  /**
   * 滚动到指定位置
   */
  scrollTo(target: any): void;

  /**
   * 获取滚动位置
   */
  getScrollPosition(): { scrollTop: number; scrollLeft: number };

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 偏移观察器模型接口
 */
export interface IPublicModelOffsetObserver {
  /**
   * 获取偏移
   */
  getOffset(): { top: number; left: number };

  /**
   * 订阅偏移变化
   */
  subscribe(callback: (offset: { top: number; left: number }) => void): () => void;

  /**
   * 取消订阅
   */
  unsubscribe(callback: (offset: { top: number; left: number }) => void): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 模态节点管理器模型接口
 */
export interface IPublicModelModalNodesManager {
  /**
   * 获取所有模态节点
   */
  getModalNodes(): IPublicModelNode[];

  /**
   * 添加模态节点
   */
  addModalNode(node: IPublicModelNode): void;

  /**
   * 移除模态节点
   */
  removeModalNode(node: IPublicModelNode): void;

  /**
   * 清除所有模态节点
   */
  clear(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 独占组模型接口
 */
export interface IPublicModelExclusiveGroup {
  /**
   * 获取组ID
   */
  id: string;

  /**
   * 获取组名
   */
  name: string;

  /**
   * 获取所有节点
   */
  getNodes(): IPublicModelNode[];

  /**
   * 添加节点
   */
  addNode(node: IPublicModelNode): void;

  /**
   * 移除节点
   */
  removeNode(node: IPublicModelNode): void;

  /**
   * 清除所有节点
   */
  clear(): void;
}

/**
 * 资源模型接口
 */
export interface IPublicModelResource {
  /**
   * 获取资源ID
   */
  id: string;

  /**
   * 获取资源名称
   */
  name: string;

  /**
   * 获取资源类型
   */
  getType(): string;

  /**
   * 获取资源数据
   */
  getData(): any;

  /**
   * 设置资源数据
   */
  setData(data: any): void;

  /**
   * 获取资源配置
   */
  getConfig(): any;

  /**
   * 设置资源配置
   */
  setConfig(config: any): void;
}

/**
 * 传感器模型接口
 */
export interface IPublicModelSensor {
  /**
   * 获取传感器ID
   */
  id: string;

  /**
   * 获取传感器类型
   */
  getType(): string;

  /**
   * 是否激活
   */
  isActive: boolean;

  /**
   * 激活传感器
   */
  activate(): void;

  /**
   * 停用传感器
   */
  deactivate(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 窗口模型接口
 */
export interface IPublicModelWindow {
  /**
   * 获取窗口ID
   */
  id: string;

  /**
   * 获取窗口标题
   */
  getTitle(): string;

  /**
   * 获取窗口内容
   */
  getContent(): any;

  /**
   * 设置窗口内容
   */
  setContent(content: any): void;

  /**
   * 显示窗口
   */
  show(): void;

  /**
   * 隐藏窗口
   */
  hide(): void;

  /**
   * 关闭窗口
   */
  close(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 模拟渲染模型接口
 */
export interface IPublicModelSimulatorRender {
  /**
   * 获取模拟渲染器ID
   */
  id: string;

  /**
   * 获取模拟渲染器容器
   */
  getContainer(): HTMLElement;

  /**
   * 获取模拟渲染器内容
   */
  getContent(): HTMLElement;

  /**
   * 获取模拟渲染器视口
   */
  getViewport(): HTMLElement;

  /**
   * 获取模拟渲染器文档
   */
  getDocument(): Document;

  /**
   * 获取模拟渲染器窗口
   */
  getWindow(): Window;

  /**
   * 刷新模拟渲染器
   */
  refresh(): void;

  /**
   * 清除模拟渲染器
   */
  clear(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 骨架条目模型接口
 */
export interface IPublicModelSkeletonItem {
  /**
   * 获取条目ID
   */
  id: string;

  /**
   * 获取条目名称
   */
  name: string;

  /**
   * 获取条目类型
   */
  getType(): string;

  /**
   * 获取条目配置
   */
  getConfig(): any;

  /**
   * 设置条目配置
   */
  setConfig(config: any): void;

  /**
   * 显示条目
   */
  show(): void;

  /**
   * 隐藏条目
   */
  hide(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 编辑器视图模型接口
 */
export interface IPublicModelEditorView {
  /**
   * 获取视图ID
   */
  id: string;

  /**
   * 获取视图名称
   */
  getName(): string;

  /**
   * 获取视图类型
   */
  getType(): string;

  /**
   * 获取视图配置
   */
  getConfig(): any;

  /**
   * 设置视图配置
   */
  setConfig(config: any): void;

  /**
   * 显示视图
   */
  show(): void;

  /**
   * 隐藏视图
   */
  hide(): void;

  /**
   * 内部初始化
   */
  internalInit(): void;

  /**
   * 内部销毁
   */
  internalDestroy(): void;
}

/**
 * 引擎配置模型接口
 */
export interface IPublicModelEngineConfig {
  /**
   * 获取配置
   */
  getConfig(): any;

  /**
   * 设置配置
   */
  setConfig(config: any): void;

  /**
   * 获取配置项
   */
  get(key: string): any;

  /**
   * 设置配置项
   */
  set(key: string, value: any): void;
}

/**
 * 插件实例模型接口
 */
export interface IPublicModelPluginInstance {
  /**
   * 获取插件ID
   */
  id: string;

  /**
   * 获取插件名称
   */
  name: string;

  /**
   * 获取插件配置
   */
  getConfig(): any;

  /**
   * 获取插件上下文
   */
  getContext(): IPublicModelPluginContext;

  /**
   * 初始化插件
   */
  init(): void;

  /**
   * 销毁插件
   */
  destroy(): void;
}

/**
 * 偏好设置模型接口
 */
export interface IPublicModelPreference {
  /**
   * 获取偏好设置
   */
  getPreference(): Record<string, any>;

  /**
   * 设置偏好设置
   */
  setPreference(preference: Record<string, any>): void;

  /**
   * 获取偏好设置项
   */
  get(key: string): any;

  /**
   * 设置偏好设置项
   */
  set(key: string, value: any): void;
}

/**
 * 定位事件模型接口
 */
export interface IPublicModelLocateEvent {
  /**
   * 获取事件类型
   */
  getType(): string;

  /**
   * 获取事件目标
   */
  getTarget(): any;

  /**
   * 获取事件数据
   */
  getData(): any;

  /**
   * 阻止事件传播
   */
  stopPropagation(): void;

  /**
   * 阻止默认行为
   */
  preventDefault(): void;
}

/**
 * 丢弃位置模型接口
 */
export interface IPublicModelDropLocation {
  /**
   * 获取目标节点
   */
  getTarget(): IPublicModelNode | null;

  /**
   * 获取位置详情
   */
  getDetail(): any | null;

  /**
   * 设置位置
   */
  setLocation(location: any): void;

  /**
   * 清除位置
   */
  clear(): void;
}
