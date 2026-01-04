/**
 * Vue3 LowCode Engine - API Types
 * 低代码引擎API类型定义
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
} from './schema';
import {
  IPublicModelNode,
  IPublicModelProps,
  IPublicModelProp,
  IPublicModelDocumentModel,
  IPublicModelSelection,
  IPublicModelHistory,
  IPublicModelComponentMeta,
  IPublicModelProject,
  IPublicModelDesigner,
  IPublicModelEditor,
  IPublicModelPluginContext,
  IPublicModelSettingField,
  IPublicModelSettingTarget,
  IPublicModelSettingTopEntry,
  IPublicModelSettingPropEntry,
} from './model';

/**
 * 编辑器API接口
 */
export interface IPublicApiEditor {
  /**
   * 获取编辑器ID
   */
  getId(): string;

  /**
   * 获取项目
   */
  getProject(): IPublicApiProject;

  /**
   * 获取设计器
   */
  getDesigner(): IPublicApiDesigner;

  /**
   * 获取所有文档
   */
  getDocuments(): IPublicApiDocumentModel[];

  /**
   * 获取当前文档
   */
  getCurrentDocument(): IPublicApiDocumentModel | null;

  /**
   * 获取骨架
   */
  getSkeleton(): IPublicApiSkeleton;

  /**
   * 获取插件上下文
   */
  getPluginContext(): IPublicModelPluginContext;

  /**
   * 获取事件总线
   */
  getEventBus(): IPublicApiEventBus;

  /**
   * 获取配置
   */
  getConfig(): IPublicApiConfig;

  /**
   * 获取国际化
   */
  getI18n(): IPublicApiI18n;

  /**
   * 获取快捷键
   */
  getHotkey(): IPublicApiHotkey;

  /**
   * 获取日志
   */
  getLogger(): IPublicApiLogger;

  /**
   * 获取设置
   */
  getSetting(): IPublicApiSetting;

  /**
   * 获取材料
   */
  getMaterial(): IPublicApiMaterial;

  /**
   * 获取工作区
   */
  getWorkspace(): IPublicApiWorkspace;

  /**
   * 获取画布
   */
  getCanvas(): IPublicApiCanvas;

  /**
   * 获取命令
   */
  getCommand(): IPublicApiCommand;

  /**
   * 获取通用UI
   */
  getCommonUI(): IPublicApiCommonUI;

  /**
   * 获取模拟渲染器宿主
   */
  getSimulatorHost(): IPublicApiSimulatorHost;

  /**
   * 获取项目
   */
  getProjectApi(): IPublicApiProject;

  /**
   * 获取设置器
   */
  getSetters(): IPublicApiSetters;

  /**
   * 获取工作区API
   */
  getWorkspaceApi(): IPublicApiWorkspace;
}

/**
 * 项目API接口
 */
export interface IPublicApiProject {
  /**
   * 获取项目ID
   */
  getId(): string;

  /**
   * 获取项目名称
   */
  getName(): string;

  /**
   * 获取项目版本
   */
  getVersion(): string;

  /**
   * 获取文档模型
   */
  getDocuments(): IPublicApiDocumentModel[];

  /**
   * 获取当前文档
   */
  getCurrentDocument(): IPublicApiDocumentModel | null;

  /**
   * 打开文档
   */
  openDocument(id: string): IPublicApiDocumentModel;

  /**
   * 关闭文档
   */
  closeDocument(id: string): void;

  /**
   * 导出Schema
   */
  export(stage?: TransformStage): ProjectSchema;

  /**
   * 导入Schema
   */
  import(schema: ProjectSchema): void;

  /**
   * 获取模拟渲染器
   */
  getSimulators(): IPublicApiSimulator[];

  /**
   * 获取设计器
   */
  getDesigner(): IPublicApiDesigner;

  /**
   * 获取项目模型
   */
  getModel(): IPublicModelProject;
}

/**
 * 设计器API接口
 */
export interface IPublicApiDesigner {
  /**
   * 获取项目
   */
  getProject(): IPublicApiProject;

  /**
   * 获取当前文档
   */
  getCurrentDocument(): IPublicApiDocumentModel | null;

  /**
   * 获取所有文档
   */
  getDocuments(): IPublicApiDocumentModel[];

  /**
   * 获取模拟渲染器
   */
  getSimulators(): IPublicApiSimulator[];

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
  getClipboard(): IPublicApiClipboard;

  /**
   * 获取检测器
   */
  getDetecting(): IPublicApiDetecting;

  /**
   * 获取设计器模型
   */
  getModel(): IPublicModelDesigner;
}

/**
 * 文档模型API接口
 */
export interface IPublicApiDocumentModel {
  /**
   * 获取文档ID
   */
  getId(): string;

  /**
   * 获取文档标题
   */
  getTitle(): string;

  /**
   * 获取根节点
   */
  getRootNode(): IPublicApiNode;

  /**
   * 获取节点
   */
  getNode(id: string): IPublicApiNode | null;

  /**
   * 获取焦点节点
   */
  getFocusNode(): IPublicApiNode | null;

  /**
   * 获取选择
   */
  getSelection(): IPublicApiSelection;

  /**
   * 获取历史记录
   */
  getHistory(): IPublicApiHistory;

  /**
   * 获取项目
   */
  getProject(): IPublicApiProject;

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
    parent: IPublicApiNode | string,
    node: IPublicApiNode | NodeSchema,
    at?: number
  ): IPublicApiNode;

  /**
   * 移除节点
   */
  removeNode(id: string): void;

  /**
   * 选择节点
   */
  select(id: string): void;

  /**
   * 获取文档模型
   */
  getModel(): IPublicModelDocumentModel;
}

/**
 * 节点API接口
 */
export interface IPublicApiNode {
  /**
   * 获取节点ID
   */
  getId(): string;

  /**
   * 获取节点组件名称
   */
  getComponentName(): string;

  /**
   * 获取节点状态
   */
  isLocked(): boolean;
  isHidden(): boolean;
  isNullNode(): boolean;
  isRoot(): boolean;
  isPage(): boolean;
  isComponent(): boolean;
  isModal(): boolean;
  isSlot(): boolean;
  isParent(): boolean;
  isLeaf(): boolean;

  /**
   * 获取父节点
   */
  getParent(): IPublicApiNode | null;

  /**
   * 获取子节点
   */
  getChildren(): IPublicApiNode[];

  /**
   * 获取指定索引的子节点
   */
  getChildAt(index: number): IPublicApiNode | null;

  /**
   * 获取索引
   */
  getIndex(): number;

  /**
   * 获取所有后代节点
   */
  getDescendants(deep?: boolean): IPublicApiNode[];

  /**
   * 获取节点Schema
   */
  export(stage?: TransformStage): NodeSchema;

  /**
   * 获取节点Props
   */
  getProps(): IPublicApiProps;

  /**
   * 获取指定Prop
   */
  getProp(path: string, createIfNone?: boolean): IPublicApiProp | null;

  /**
   * 获取组件元数据
   */
  getComponentMeta(): IPublicModelComponentMeta;

  /**
   * 获取文档模型
   */
  getDocument(): IPublicApiDocumentModel;

  /**
   * 获取节点实例
   */
  getInstance(): any;

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
    node: IPublicApiNode | NodeSchema,
    at?: number | undefined,
    copy?: boolean | undefined
  ): IPublicApiNode;

  /**
   * 移除子节点
   */
  removeChild(node: IPublicApiNode | string): void;

  /**
   * 插入子节点
   */
  insertChild(
    node: IPublicApiNode | NodeSchema,
    at?: number | undefined,
    copy?: boolean | undefined
  ): IPublicApiNode;

  /**
   * 移动节点
   */
  move(target: IPublicApiNode, index?: number): void;

  /**
   * 选择节点
   */
  select(): void;

  /**
   * 悬停节点
   */
  hover(flag: boolean): void;

  /**
   * 获取节点模型
   */
  getModel(): IPublicModelNode;
}

/**
 * Props API接口
 */
export interface IPublicApiProps {
  /**
   * 获取所有Props
   */
  getProps(): Map<string, IPublicApiProp>;

  /**
   * 获取指定Prop
   */
  getProp(path: string): IPublicApiProp | null;

  /**
   * 获取路径
   */
  getPath(): string;

  /**
   * 获取节点
   */
  getNode(): IPublicApiNode;

  /**
   * 导出Props
   */
  export(stage?: TransformStage): PropsMap;

  /**
   * 获取Props模型
   */
  getModel(): IPublicModelProps;
}

/**
 * Prop API接口
 */
export interface IPublicApiProp {
  /**
   * 获取Prop键
   */
  getKey(): string;

  /**
   * 获取Prop路径
   */
  getPath(): string;

  /**
   * 获取Prop值
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
  getNode(): IPublicApiNode;

  /**
   * 获取Props
   */
  getProps(): IPublicApiProps;

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
   * 获取Prop模型
   */
  getModel(): IPublicModelProp;
}

/**
 * 选择API接口
 */
export interface IPublicApiSelection {
  /**
   * 获取选中节点
   */
  getNodes(): IPublicApiNode[];

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
  getDocument(): IPublicApiDocumentModel;

  /**
   * 获取选择模型
   */
  getModel(): IPublicModelSelection;
}

/**
 * 历史记录API接口
 */
export interface IPublicApiHistory {
  /**
   * 是否可以撤销
   */
  isEnableUndo(): boolean;

  /**
   * 是否可以重做
   */
  isEnableRedo(): boolean;

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
  getSession(): IPublicApiHistorySession | null;

  /**
   * 获取文档模型
   */
  getDocument(): IPublicApiDocumentModel;

  /**
   * 获取历史记录模型
   */
  getModel(): IPublicModelHistory;
}

/**
 * 历史记录会话API接口
 */
export interface IPublicApiHistorySession {
  /**
   * 获取会话ID
   */
  getId(): string;

  /**
   * 获取会话标题
   */
  getTitle(): string;

  /**
   * 获取会话描述
   */
  getDescription(): string;

  /**
   * 获取会话时间
   */
  getTimestamp(): number;

  /**
   * 获取会话数据
   */
  getData(): any;

  /**
   * 恢复会话
   */
  restore(): void;

  /**
   * 获取历史记录
   */
  getHistory(): IPublicApiHistory;

  /**
   * 获取历史记录会话模型
   */
  getModel(): IPublicModelHistorySession;
}

/**
 * 模拟渲染器API接口
 */
export interface IPublicApiSimulator {
  /**
   * 获取模拟渲染器ID
   */
  getId(): string;

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
  getComponentInstance(nodeId: string): any;

  /**
   * 刷新模拟渲染器
   */
  refresh(): void;

  /**
   * 清除模拟渲染器
   */
  clear(): void;

  /**
   * 获取模拟渲染器模型
   */
  getModel(): IPublicModelSimulator;
}

/**
 * 剪贴板API接口
 */
export interface IPublicApiClipboard {
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

  /**
   * 获取剪贴板模型
   */
  getModel(): IPublicModelClipboard;
}

/**
 * 检测器API接口
 */
export interface IPublicApiDetecting {
  /**
   * 获取检测节点
   */
  getDetecting(): IPublicApiNode | null;

  /**
   * 设置检测节点
   */
  setDetecting(node: IPublicApiNode | null): void;

  /**
   * 清除检测节点
   */
  clear(): void;

  /**
   * 获取检测器模型
   */
  getModel(): IPublicModelDetecting;
}

/**
 * 骨架API接口
 */
export interface IPublicApiSkeleton {
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
   * 获取骨架模型
   */
  getModel(): IPublicModelSkeleton;
}

/**
 * 事件总线API接口
 */
export interface IPublicApiEventBus {
  /**
   * 订阅事件
   */
  on(event: string, handler: (...args: any[]) => void): void;

  /**
   * 取消订阅
   */
  off(event: string, handler: (...args: any[]) => void): void;

  /**
   * 订阅一次
   */
  once(event: string, handler: (...args: any[]) => void): void;

  /**
   * 触发事件
   */
  emit(event: string, ...args: any[]): void;
}

/**
 * 配置API接口
 */
export interface IPublicApiConfig {
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

  /**
   * 获取配置模型
   */
  getModel(): IPublicModelEngineConfig;
}

/**
 * 国际化API接口
 */
export interface IPublicApiI18n {
  /**
   * 获取当前语言
   */
  getCurrentLocale(): string;

  /**
   * 设置语言
   */
  setLocale(locale: string): void;

  /**
   * 翻译
   */
  t(key: string, params?: any): string;

  /**
   * 获取所有语言
   */
  getLocales(): string[];
}

/**
 * 快捷键API接口
 */
export interface IPublicApiHotkey {
  /**
   * 绑定快捷键
   */
  bind(key: string, handler: (...args: any[]) => void): void;

  /**
   * 解绑快捷键
   */
  unbind(key: string): void;

  /**
   * 触发快捷键
   */
  trigger(key: string, event: Event): void;
}

/**
 * 日志API接口
 */
export interface IPublicApiLogger {
  /**
   * 记录信息
   */
  info(message: string, ...args: any[]): void;

  /**
   * 记录警告
   */
  warn(message: string, ...args: any[]): void;

  /**
   * 记录错误
   */
  error(message: string, ...args: any[]): void;

  /**
   * 记录调试
   */
  debug(message: string, ...args: any[]): void;
}

/**
 * 设置API接口
 */
export interface IPublicApiSetting {
  /**
   * 获取设置顶级条目
   */
  getTopEntries(): IPublicModelSettingTopEntry[];

  /**
   * 获取设置顶级条目
   */
  getTopEntry(id: string): IPublicModelSettingTopEntry | null;

  /**
   * 获取设置字段
   */
  getField(path: string): IPublicModelSettingField | null;

  /**
   * 获取设置目标
   */
  getTarget(): IPublicModelSettingTarget | null;
}

/**
 * 材料API接口
 */
export interface IPublicApiMaterial {
  /**
   * 获取组件
   */
  getComponent(componentName: string): any;

  /**
   * 获取所有组件
   */
  getComponents(): Map<string, any>;

  /**
   * 获取组件元数据
   */
  getComponentMeta(componentName: string): ComponentMetadata | null;

  /**
   * 获取所有组件元数据
   */
  getComponentMetas(): Map<string, ComponentMetadata>;

  /**
   * 设置组件元数据
   */
  setComponentMeta(componentName: string, meta: ComponentMetadata): void;

  /**
   * 获取设置器
   */
  getSetter(setterName: string): any;

  /**
   * 获取所有设置器
   */
  getSetters(): Map<string, any>;

  /**
   * 设置设置器
   */
  setSetter(setterName: string, setter: any): void;
}

/**
 * 工作区API接口
 */
export interface IPublicApiWorkspace {
  /**
   * 获取工作区ID
   */
  getId(): string;

  /**
   * 获取工作区名称
   */
  getName(): string;

  /**
   * 获取编辑器
   */
  getEditor(): IPublicApiEditor;

  /**
   * 获取窗口
   */
  getWindow(): IPublicModelWindow | null;

  /**
   * 获取资源
   */
  getResource(id: string): IPublicModelResource | null;

  /**
   * 获取所有资源
   */
  getResources(): IPublicModelResource[];
}

/**
 * 画布API接口
 */
export interface IPublicApiCanvas {
  /**
   * 获取画布容器
   */
  getContainer(): HTMLElement;

  /**
   * 获取画布内容
   */
  getContent(): HTMLElement;

  /**
   * 获取画布视口
   */
  getViewport(): HTMLElement;

  /**
   * 滚动到指定位置
   */
  scrollTo(target: any): void;

  /**
   * 获取滚动位置
   */
  getScrollPosition(): { scrollTop: number; scrollLeft: number };
}

/**
 * 命令API接口
 */
export interface IPublicApiCommand {
  /**
   * 注册命令
   */
  registerCommand(name: string, handler: (...args: any[]) => any): void;

  /**
   * 执行命令
   */
  executeCommand(name: string, ...args: any[]): any;

  /**
   * 批量执行命令
   */
  batchExecuteCommand(commands: Array<{ name: string; args?: any[] }>): any[];

  /**
   * 取消注册命令
   */
  unregisterCommand(name: string): void;

  /**
   * 获取所有命令
   */
  getCommands(): string[];
}

/**
 * 通用UI API接口
 */
export interface IPublicApiCommonUI {
  /**
   * 显示对话框
   */
  showDialog(config: any): void;

  /**
   * 关闭对话框
   */
  closeDialog(): void;

  /**
   * 显示提示
   */
  showTip(config: any): void;

  /**
   * 关闭提示
   */
  closeTip(): void;
}

/**
 * 模拟渲染器宿主API接口
 */
export interface IPublicApiSimulatorHost {
  /**
   * 获取模拟渲染器宿主
   */
  getHost(): HTMLElement;

  /**
   * 获取模拟渲染器
   */
  getSimulator(): IPublicApiSimulator | null;

  /**
   * 刷新模拟渲染器
   */
  refresh(): void;

  /**
   * 清除模拟渲染器
   */
  clear(): void;
}

/**
 * 设置器API接口
 */
export interface IPublicApiSetters {
  /**
   * 获取设置器
   */
  getSetter(setterName: string): any;

  /**
   * 获取所有设置器
   */
  getSetters(): Map<string, any>;

  /**
   * 设置设置器
   */
  setSetter(setterName: string, setter: any): void;

  /**
   * 获取设置器类型
   */
  getSetterType(setterName: string): string;
}

/**
 * 编辑器获取选项
 */
export interface EditorGetOptions {
  /**
   * 编辑器ID
   */
  id?: string;

  /**
   * 是否自动初始化
   */
  autoInit?: boolean;
}

/**
 * 编辑器获取结果
 */
export interface EditorGetResult {
  /**
   * 编辑器实例
   */
  editor: IPublicApiEditor;

  /**
   * 编辑器模型
   */
  model: IPublicModelEditor;
}

/**
 * 编辑器注册选项
 */
export interface EditorRegisterOptions {
  /**
   * 编辑器ID
   */
  id: string;

  /**
   * 编辑器配置
   */
  config?: EditorConfig;

  /**
   * 是否自动初始化
   */
  autoInit?: boolean;
}

/**
 * 编辑器配置
 */
export interface EditorConfig {
  /**
   * 骨架配置
   */
  skeleton?: any;

  /**
   * 主题配置
   */
  theme?: any;

  /**
   * 插件配置
   */
  plugins?: PluginConfig[];

  /**
   * 钩子配置
   */
  hooks?: any[];

  /**
   * 快捷键配置
   */
  shortCuts?: any[];

  /**
   * 工具配置
   */
  utils?: any[];

  /**
   * 常量配置
   */
  constants?: Record<string, any>;

  /**
   * 生命周期配置
   */
  lifeCycles?: {
    init?: (editor: IPublicModelEditor) => any;
    destroy?: (editor: IPublicModelEditor) => any;
  };

  /**
   * 国际化配置
   */
  i18n?: any;
}

/**
 * 引擎选项
 */
export interface EngineOptions {
  /**
   * 编辑器ID
   */
  id?: string;

  /**
   * 编辑器配置
   */
  config?: EditorConfig;

  /**
   * 是否自动初始化
   */
  autoInit?: boolean;

  /**
   * 是否启用设计模式
   */
  designMode?: boolean;

  /**
   * 是否启用调试
   */
  debug?: boolean;
}

/**
 * 编辑器视图配置
 */
export interface EditorViewConfig {
  /**
   * 视图ID
   */
  id: string;

  /**
   * 视图名称
   */
  name: string;

  /**
   * 视图类型
   */
  type: string;

  /**
   * 视图配置
   */
  config?: any;
}

/**
 * 字段配置
 */
export interface FieldConfig {
  /**
   * 字段名称
   */
  name: string;

  /**
   * 字段标题
   */
  title?: TitleConfig;

  /**
   * 字段提示
   */
  tip?: TipConfig;

  /**
   * 字段描述
   */
  description?: string;

  /**
   * 默认值
   */
  defaultValue?: any;

  /**
   * 字段类型
   */
  type?: string | string[];

  /**
   * 是否必需
   */
  isRequired?: boolean;

  /**
   * 设置器
   */
  setter?: SetterConfig | SetterConfig[];

  /**
   * 额外属性
   */
  extraProps?: any;

  /**
   * 条件
   */
  condition?: JSExpression;
}

/**
 * 字段额外属性
 */
export interface FieldExtraProps {
  /**
   * 显示方式
   */
  display?: 'block' | 'inline' | 'accordion' | 'popover' | 'dialog';

  /**
   * 自动验证
   */
  autoValidate?: boolean;

  /**
   * 默认值
   */
  defaultValue?: any;

  /**
   * 获取值
   */
  getValue?: (target: any, currentValue: any) => any;

  /**
   * 设置值
   */
  setValue?: (target: any, value: any) => void;

  /**
   * 初始化
   */
  onInit?: (target: any) => void;

  /**
   * 钩子
   */
  onHook?: (target: any) => void;
}

/**
 * 热键回调配置
 */
export interface HotkeyCallbackConfig {
  /**
   * 快捷键
   */
  key: string;

  /**
   * 回调函数
   */
  handler: (...args: any[]) => any;

  /**
   * 是否阻止默认行为
   */
  preventDefault?: boolean;

  /**
   * 是否阻止事件传播
   */
  stopPropagation?: boolean;
}

/**
 * 热键回调
 */
export type HotkeyCallback = (...args: any[]) => any;

/**
 * 热键回调集合
 */
export interface HotkeyCallbacks {
  [key: string]: HotkeyCallback;
}

/**
 * 图标配置
 */
export interface IconConfig {
  /**
   * 图标类型
   */
  type: 'icon';

  /**
   * 图标
   */
  icon?: string;
}

/**
 * 图标类型
 */
export type IconType = 'icon' | 'svg' | 'image';

/**
 * 元数据
 */
export interface Metadata {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 文档URL
   */
  docUrl?: string;

  /**
   * 截图
   */
  screenshot?: string;

  /**
   * 开发模式
   */
  devMode?: string;

  /**
   * NPM信息
   */
  npm?: IPublicTypeNpmInfo;

  /**
   * 配置
   */
  configure?: any;

  /**
   * 代码片段
   */
  snippets?: any[];

  /**
   * 实验性功能
   */
  experimental?: any;

  /**
   * 图标
   */
  icon?: string;
}

/**
 * 组件动作
 */
export interface ComponentAction {
  /**
   * 动作名称
   */
  name: string;

  /**
   * 动作描述
   */
  description?: string;

  /**
   * 动作处理函数
   */
  handler?: JSFunction;
}

/**
 * 组件描述
 */
export interface ComponentDescription {
  /**
   * 是否是容器
   */
  isContainer?: boolean;

  /**
   * 是否是模态框
   */
  isModal?: boolean;

  /**
   * 是否是渲染器
   */
  isRenderer?: boolean;

  /**
   * 嵌套规则
   */
  nestingRule?: any;

  /**
   * 是否是空节点
   */
  isNullNode?: boolean;

  /**
   * 是否是布局
   */
  isLayout?: boolean;

  /**
   * 是否是最小单元
   */
  isMinimalUnit?: boolean;

  /**
   * 是否是循环
   */
  isLoop?: boolean;

  /**
   * 根选择器
   */
  rootSelector?: string;

  /**
   * 是否锁定
   */
  isLocked?: boolean;

  /**
   * 是否隐藏
   */
  isHidden?: boolean;
}

/**
 * 支持项
 */
export interface Supports {
  /**
   * 是否支持样式
   */
  style?: boolean;

  /**
   * 是否支持类名
   */
  className?: boolean;

  /**
   * 是否支持ID
   */
  id?: boolean;

  /**
   * 是否支持事件
   */
  events?: boolean;

  /**
   * 是否支持生命周期
   */
  lifecycle?: boolean;

  /**
   * 是否支持变量
   */
  variable?: boolean;
}

/**
 * 配置
 */
export interface Configure {
  /**
   * 组件
   */
  component?: ComponentDescription;

  /**
   * 支持项
   */
  supports?: Supports;

  /**
   * Props配置
   */
  props?: FieldConfig[];

  /**
   * 高级配置
   */
  advanced?: any;
}

/**
 * 嵌套规则
 */
export interface NestingRule {
  /**
   * 父节点白名单
   */
  parentWhitelist?: string[];

  /**
   * 子节点白名单
   */
  childWhitelist?: string[];

  /**
   * 后代节点白名单
   */
  descendantWhitelist?: string[];

  /**
   * 祖先节点白名单
   */
  ancestorWhitelist?: string[];

  /**
   * 父节点黑名单
   */
  parentBlacklist?: string[];

  /**
   * 子节点黑名单
   */
  childBlacklist?: string[];

  /**
   * 后代节点黑名单
   */
  descendantBlacklist?: string[];

  /**
   * 祖先节点黑名单
   */
  ancestorBlacklist?: string[];
}

/**
 * 代码片段
 */
export interface Snippet {
  /**
   * 标题
   */
  title?: string;

  /**
   * 截图
   */
  screenshot?: string;

  /**
   * Schema
   */
  schema?: NodeSchema;

  /**
   * 分类
   */
  category?: string;

  /**
   * 优先级
   */
  priority?: number;
}

/**
 * 组件排序
 */
export interface ComponentSort {
  /**
   * 分组
   */
  group?: string;

  /**
   * 优先级
   */
  priority?: number;
}

/**
 * 动态Props
 */
export interface DynamicProps {
  /**
   * Props
   */
  props?: Record<string, any>;

  /**
   * 组件
   */
  component?: any;
}

/**
 * 值类型
 */
export type ValueType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'undefined'
  | 'JSExpression'
  | 'JSFunction'
  | 'JSSlot'
  | 'i18n'
  | 'array'
  | 'object';

/**
 * 设置器类型
 */
export type SetterType =
  | 'StringSetter'
  | 'NumberSetter'
  | 'BooleanSetter'
  | 'JsonSetter'
  | 'ArraySetter'
  | 'ObjectSetter'
  | 'FunctionSetter'
  | 'SelectSetter'
  | 'RadioGroupSetter'
  | 'SwitchSetter'
  | 'ColorPickerSetter'
  | 'SlotSetter'
  | 'MixedSetter'
  | 'VariableSetter'
  | 'ExpressionSetter'
  | 'I18nSetter'
  | 'ClassNameSetter'
  | 'StyleSetter'
  | 'EventSetter'
  | 'CustomSetter';

/**
 * 注册的设置器
 */
export interface RegisteredSetter {
  /**
   * 设置器类型
   */
  type: SetterType;

  /**
   * 显示名称
   */
  displayName?: string;

  /**
   * 组件
   */
  component?: any;

  /**
   * 描述
   */
  description?: string;

  /**
   * 初始值
   */
  initValue?: any;

  /**
   * 是否必需
   */
  isRequired?: boolean;

  /**
   * 是否多选
   */
  isMultiple?: boolean;

  /**
   * 条件
   */
  condition?: JSExpression;
}

/**
 * 资源列表
 */
export interface ResourceList {
  [key: string]: ResourceItem;
}

/**
 * 资源项
 */
export interface ResourceItem {
  /**
   * 标题
   */
  title?: string;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 资源类型
   */
  resourceType?: string;

  /**
   * 选项
   */
  options?: Record<string, any>;

  /**
   * 描述
   */
  description?: string;

  /**
   * 分类
   */
  categories?: string[];
}

/**
 * 资源类型配置
 */
export interface ResourceTypeConfig {
  /**
   * 类型
   */
  type: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 默认资源
   */
  defaultResource?: string;

  /**
   * 分类
   */
  categories?: any[];
}

/**
 * 资源类型枚举
 */
export enum ResourceType {
  Editor = 'editor',
  Component = 'component',
  Setter = 'setter',
  Plugin = 'plugin',
}

/**
 * 配置转换器
 */
export interface ConfigTransducer {
  /**
   * 类型
   */
  type: string;

  /**
   * 处理函数
   */
  handler: (config: any) => any;
}

/**
 * 元数据转换器
 */
export interface MetadataTransducer {
  /**
   * 类型
   */
  type: string;

  /**
   * 处理函数
   */
  handler: (metadata: any) => any;
}

/**
 * Props转换器
 */
export interface PropsTransducer {
  /**
   * 类型
   */
  type: string;

  /**
   * 处理函数
   */
  handler: (props: any) => any;
}

/**
 * 转换后的组件元数据
 */
export interface TransformedComponentMetadata {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 文档URL
   */
  docUrl?: string;

  /**
   * 截图
   */
  screenshot?: string;

  /**
   * 开发模式
   */
  devMode?: string;

  /**
   * NPM信息
   */
  npm?: IPublicTypeNpmInfo;

  /**
   * 配置
   */
  configure?: Configure;

  /**
   * 代码片段
   */
  snippets?: Snippet[];

  /**
   * 实验性功能
   */
  experimental?: any;

  /**
   * 图标
   */
  icon?: string;
}

/**
 * 节点数据类型
 */
export enum NodeDataType {
  Node = 'node',
  String = 'string',
}

/**
 * 节点数据
 */
export type NodeData = NodeSchema | string;

/**
 * 组件实例
 */
export interface ComponentInstance {
  /**
   * 组件
   */
  component: any;

  /**
   * 节点ID
   */
  nodeId: string;

  /**
   * Props
   */
  props: Record<string, any>;
}

/**
 * 远程组件描述
 */
export interface RemoteComponentDescription {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * NPM信息
   */
  npm?: IPublicTypeNpmInfo;
}

/**
 * 包
 */
export interface Package {
  /**
   * NPM信息
   */
  npm?: IPublicTypeNpmInfo;

  /**
   * 包名
   */
  package?: string;

  /**
   * 版本
   */
  version?: string;

  /**
   * URL
   */
  url?: string;
}

/**
 * NPM信息
 */
export interface NpmInfo {
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
 * 引用
 */
export interface Reference {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * ID
   */
  id?: string;
}

/**
 * 插件声明
 */
export interface PluginDeclaration {
  /**
   * 插件名称
   */
  name: string;

  /**
   * 元数据
   */
  meta?: any;

  /**
   * 依赖
   */
  dependencies?: string[];
}

/**
 * 插件元数据
 */
export interface PluginMeta {
  /**
   * 偏好设置
   */
  preference?: Record<string, any>;

  /**
   * 引擎
   */
  engines?: {
    lowcodeEngine?: string;
  };
}

/**
 * 插件声明属性
 */
export interface PluginDeclarationProperty {
  /**
   * 类型
   */
  type: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 默认值
   */
  default?: any;
}

/**
 * 可释放对象
 */
export interface IDisposable {
  /**
   * 释放
   */
  dispose(): void;
}

/**
 * 滚动目标
 */
export interface ScrollTarget {
  /**
   * 节点
   */
  node?: NodeSchema;

  /**
   * 滚动左边距
   */
  scrollLeft?: number;

  /**
   * 滚动上边距
   */
  scrollTop?: number;
}

/**
 * 可滚动对象
 */
export interface Scrollable {
  /**
   * 滚动到
   */
  scrollTo(scrollTarget: ScrollTarget): void;
}

/**
 * 应用配置
 */
export interface AppConfig {
  /**
   * 应用名称
   */
  name?: string;

  /**
   * 应用描述
   */
  description?: string;

  /**
   * 应用版本
   */
  version?: string;

  /**
   * 应用作者
   */
  author?: string;

  /**
   * 应用仓库
   */
  repository?: string;

  /**
   * 应用配置
   */
  config?: Record<string, any>;
}

/**
 * 资源JSON
 */
export interface AssetsJSON {
  /**
   * 包
   */
  packages?: Package[];

  /**
   * 组件
   */
  components?: any[];

  /**
   * 样式
   */
  styles?: string[];

  /**
   * 脚本
   */
  scripts?: string[];
}

/**
 * 代码中间表示
 */
export interface CodeIntermediate {
  /**
   * 代码
   */
  code: string;

  /**
   * 源映射
   */
  sourceMap?: string;

  /**
   * 依赖
   */
  dependencies?: string[];
}

/**
 * 代码结果
 */
export interface CodeResult {
  /**
   * 代码
   */
  code: string;

  /**
   * 源映射
   */
  sourceMap?: string;

  /**
   * 依赖
   */
  dependencies?: string[];

  /**
   * 错误
   */
  errors?: string[];

  /**
   * 警告
   */
  warnings?: string[];
}

/**
 * 活动
 */
export interface Activity {
  /**
   * 活动ID
   */
  id: string;

  /**
   * 活动名称
   */
  name: string;

  /**
   * 活动描述
   */
  description?: string;

  /**
   * 活动类型
   */
  type: string;

  /**
   * 活动数据
   */
  data?: any;

  /**
   * 活动时间
   */
  timestamp: number;
}
