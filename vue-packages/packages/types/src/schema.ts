/**
 * Vue3 LowCode Engine - Schema Types
 * 低代码引擎Schema类型定义
 */

import { IPublicTypeNpmInfo } from './shell';

/**
 * 组件Schema基础类型
 */
export interface ComponentSchema {
  componentName: string;
  id?: string;
  props?: PropsMap | PropsList;
  children?: NodeSchema[] | string | NodeData;
  condition?: boolean | JSExpression;
  loop?: JSExpression | Array<any> | string;
  loopArgs?: [string, string];
  key?: string | number;
}

/**
 * 页面Schema
 */
export interface PageSchema extends ComponentSchema {
  fileName?: string;
  meta?: PageMeta;
}

/**
 * 页面元数据
 */
export interface PageMeta {
  title?: string;
  router?: string;
  group?: string;
  componentName?: string;
}

/**
 * 容器Schema
 */
export interface ContainerSchema extends ComponentSchema {
  componentName: 'Page' | 'Block' | 'Component';
  children?: NodeSchema[];
}

/**
 * 块Schema
 */
export interface BlockSchema extends ContainerSchema {
  componentName: 'Block';
}

/**
 * 插槽Schema
 */
export interface SlotSchema extends ComponentSchema {
  componentName: 'Slot';
  name?: string;
  params?: string[];
  title?: string;
}

/**
 * 节点Schema联合类型
 */
export type NodeSchema = ComponentSchema | PageSchema | ContainerSchema | BlockSchema | SlotSchema;

/**
 * 节点数据类型
 */
export type NodeData = NodeSchema | string;

/**
 * Props映射
 */
export type PropsMap = Record<string, PropValue>;

/**
 * Props列表
 */
export type PropsList = PropItem[];

/**
 * Prop项
 */
export interface PropItem {
  name: string;
  value: PropValue;
  spread?: boolean;
}

/**
 * Prop值类型
 */
export type PropValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSExpression
  | JSFunction
  | JSSlot
  | I18nData
  | ActionContentObject
  | CustomView
  | Array<PropValue>
  | Record<string, PropValue>;

/**
 * JS表达式
 */
export interface JSExpression {
  type: 'JSExpression';
  value: string;
  mock?: any;
  compiled?: string;
}

/**
 * JS函数
 */
export interface JSFunction {
  type: 'JSFunction';
  value: string;
  params?: string[];
  mock?: any;
}

/**
 * JS代码块
 */
export interface JSBlock {
  type: 'JSBlock';
  value: string;
}

/**
 * JSSlot
 */
export interface JSSlot {
  type: 'JSSlot';
  title?: string;
  id?: string;
  name?: string;
  params?: string[];
  value?: NodeSchema[] | NodeSchema;
  hidden?: boolean;
  expanded?: boolean;
  readonly?: boolean;
  condition?: boolean;
}

/**
 * 国际化数据
 */
export interface I18nData {
  type: 'i18n';
  key: string;
  params?: Record<string, any>;
}

/**
 * 动作内容对象
 */
export interface ActionContentObject {
  type: 'ActionContentObject';
  title?: string;
  description?: string;
  icon?: string;
  action?: string;
}

/**
 * 自定义视图
 */
export interface CustomView {
  type: 'CustomView';
  componentName: string;
  props?: Record<string, any>;
}

/**
 * 项目Schema
 */
export interface ProjectSchema {
  componentName?: string;
  version?: string;
  utils?: UtilsSchema;
  componentsMap?: ComponentMap[];
  componentsTree?: NodeSchema[];
  i18n?: I18nSchema;
  constants?: ConstantsSchema;
  dataSource?: DataSourceSchema;
  meta?: ProjectMeta;
}

/**
 * Utils Schema
 */
export interface UtilsSchema {
  [key: string]: IPublicTypeNpmInfo | JSFunction;
}

/**
 * 组件映射
 */
export interface ComponentMap {
  componentName: string;
  package?: string;
  version?: string;
  destructuring?: boolean;
  exportName?: string;
  subComponents?: ComponentMap[];
  devMode?: string;
  dependencies?: string[];
}

/**
 * 国际化Schema
 */
export interface I18nSchema {
  [locale: string]: I18nMessages;
}

/**
 * 国际化消息
 */
export interface I18nMessages {
  [key: string]: string;
}

/**
 * 常量Schema
 */
export interface ConstantsSchema {
  [key: string]: any;
}

/**
 * 数据源Schema
 */
export interface DataSourceSchema {
  list?: DataSourceItem[];
  dataHandler?: JSFunction;
}

/**
 * 数据源项
 */
export interface DataSourceItem {
  id: string;
  isInit?: boolean;
  type?: 'fetch' | 'jsonp' | 'mock';
  options?: DataSourceOptions;
  dataHandler?: JSFunction;
  willFetch?: JSFunction;
  data?: any;
  description?: string;
}

/**
 * 数据源选项
 */
export interface DataSourceOptions {
  uri?: string;
  method?: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: any;
  isSync?: boolean;
  timeout?: number;
}

/**
 * 项目元数据
 */
export interface ProjectMeta {
  name?: string;
  description?: string;
  version?: string;
  author?: string;
  repository?: string;
}

/**
 * 动态Setter
 */
export interface DynamicSetter {
  type: 'DynamicSetter';
  componentName: string;
  props?: Record<string, any>;
}

/**
 * Setter配置
 */
export interface SetterConfig {
  componentName: string;
  props?: Record<string, any>;
  initialValue?: any;
  getValue?: (target: any, currentValue: any) => any;
  setValue?: (target: any, value: any) => void;
  onInit?: (target: any) => void;
}

/**
 * 标题配置
 */
export interface TitleConfig {
  type: 'i18n' | 'JSExpression' | 'string';
  label?: string;
  key?: string;
  value?: string;
}

/**
 * 提示配置
 */
export interface TipConfig {
  type: 'i18n' | 'JSExpression' | 'string';
  content?: string;
  key?: string;
  value?: string;
}

/**
 * 图标配置
 */
export interface IconConfig {
  type: 'icon';
  icon?: string;
}

/**
 * DOM文本
 */
export interface DOMText {
  type: 'DOMText';
  content: string;
}

/**
 * 低代码组件类型
 */
export interface LowCodeComponentType {
  componentName: string;
  devMode?: string;
}

/**
 * ProCode组件类型
 */
export interface ProCodeComponentType {
  componentName: string;
  package?: string;
  version?: string;
  destructuring?: boolean;
  exportName?: string;
}

/**
 * 组件类型联合
 */
export type ComponentType = LowCodeComponentType | ProCodeComponentType;

/**
 * 转换阶段
 */
export type TransformStage = 
  | 'render' 
  | 'serilize' 
  | 'clone' 
  | 'designer' 
  | 'design' 
  | 'drag' 
  | 'stop-propagation';

/**
 * 位置信息
 */
export interface LocationChildrenDetail {
  index: number;
  node: NodeSchema;
}

/**
 * 位置数据
 */
export type LocationData = 
  | LocationChildrenDetail
  | {
      focus: {
        node: NodeSchema;
        detail: LocationChildrenDetail;
      };
    };

/**
 * 拖拽对象类型
 */
export enum DragObjectType {
  Node = 'node',
  NodeData = 'nodeData',
  Any = 'any',
}

/**
 * 拖拽节点对象
 */
export interface DragNodeObject {
  type: DragObjectType.Node;
  nodes: NodeSchema[];
}

/**
 * 拖拽节点数据对象
 */
export interface DragNodeDataObject {
  type: DragObjectType.NodeData;
  data: NodeData;
}

/**
 * 拖拽任意对象
 */
export interface DragAnyObject {
  type: DragObjectType.Any;
  data: any;
}

/**
 * 拖拽对象联合类型
 */
export type DragObject = DragNodeObject | DragNodeDataObject | DragAnyObject;

/**
 * 资源类型
 */
export interface ResourceTypeConfig {
  type: string;
  title?: string;
  description?: string;
  icon?: string;
  defaultResource?: string;
  categories?: ResourceCategory[];
}

/**
 * 资源分类
 */
export interface ResourceCategory {
  name: string;
  resourceList?: ResourceList;
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
  title?: string;
  icon?: string;
  resourceType?: string;
  options?: Record<string, any>;
  description?: string;
  categories?: string[];
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
  type: string;
  handler: (config: any) => any;
}

/**
 * 元数据转换器
 */
export interface MetadataTransducer {
  type: string;
  handler: (metadata: any) => any;
}

/**
 * Props转换器
 */
export interface PropsTransducer {
  type: string;
  handler: (props: any) => any;
}

/**
 * 转换后的组件元数据
 */
export interface TransformedComponentMetadata {
  componentName: string;
  title?: string;
  description?: string;
  docUrl?: string;
  screenshot?: string;
  devMode?: string;
  npm?: IPublicTypeNpmInfo;
  configure?: Configure;
  snippets?: Snippet[];
  experimental?: any;
  icon?: string;
}

/**
 * 配置
 */
export interface Configure {
  component?: ComponentDescription;
  supports?: Supports;
  props?: PropsConfig[];
  advanced?: AdvancedConfig;
}

/**
 * 组件描述
 */
export interface ComponentDescription {
  isContainer?: boolean;
  isModal?: boolean;
  isRenderer?: boolean;
  nestingRule?: NestingRule;
  isNullNode?: boolean;
  isLayout?: boolean;
  isMinimalUnit?: boolean;
  isLoop?: boolean;
  rootSelector?: string;
  isLocked?: boolean;
  isHidden?: boolean;
}

/**
 * 嵌套规则
 */
export interface NestingRule {
  parentWhitelist?: string[];
  childWhitelist?: string[];
  descendantWhitelist?: string[];
  ancestorWhitelist?: string[];
  parentBlacklist?: string[];
  childBlacklist?: string[];
  descendantBlacklist?: string[];
  ancestorBlacklist?: string[];
}

/**
 * 支持项
 */
export interface Supports {
  style?: boolean;
  className?: boolean;
  id?: boolean;
  events?: boolean;
  lifecycle?: boolean;
  variable?: boolean;
}

/**
 * Props配置
 */
export interface PropsConfig {
  name: string;
  title?: TitleConfig;
  tip?: TipConfig;
  description?: string;
  defaultValue?: any;
  type?: PropType | PropType[];
  isRequired?: boolean;
  setter?: SetterConfig | SetterConfig[];
  extraProps?: FieldExtraProps;
  condition?: JSExpression;
}

/**
 * Prop类型
 */
export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'function'
  | 'any'
  | 'mixed';

/**
 * 字段额外属性
 */
export interface FieldExtraProps {
  display?: 'block' | 'inline' | 'accordion' | 'popover' | 'dialog';
  autoValidate?: boolean;
  defaultValue?: any;
  getValue?: (target: any, currentValue: any) => any;
  setValue?: (target: any, value: any) => void;
  onInit?: (target: any) => void;
  onHook?: (target: any) => void;
}

/**
 * 高级配置
 */
export interface AdvancedConfig {
  callbacks?: ComponentAction[];
  isContainer?: boolean;
  isLocked?: boolean;
  isHidden?: boolean;
}

/**
 * 组件动作
 */
export interface ComponentAction {
  name: string;
  description?: string;
  handler?: JSFunction;
}

/**
 * 代码片段
 */
export interface Snippet {
  title?: string;
  screenshot?: string;
  schema?: NodeSchema;
  category?: string;
  priority?: number;
}

/**
 * 组件元数据
 */
export interface ComponentMetadata extends TransformedComponentMetadata {
  componentName: string;
}

/**
 * 组件排序
 */
export interface ComponentSort {
  group?: string;
  priority?: number;
}

/**
 * 动态Props
 */
export interface DynamicProps {
  props?: Record<string, any>;
  component?: ComponentType;
}

/**
 * 复合值
 */
export type CompositeValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSExpression
  | JSFunction
  | JSSlot
  | I18nData
  | Array<CompositeValue>
  | Record<string, CompositeValue>;

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
 * Setter类型
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
 * 注册的Setter
 */
export interface RegisteredSetter {
  type: SetterType;
  displayName?: string;
  component?: any;
  description?: string;
  initValue?: any;
  isRequired?: boolean;
  isMultiple?: boolean;
  condition?: JSExpression;
}

/**
 * Props列表类型
 */
export interface PropsListType {
  props?: PropsList;
}

/**
 * Props映射类型
 */
export interface PropsMapType {
  props?: PropsMap;
}

/**
 * 节点实例
 */
export interface NodeInstance {
  nodeId: string;
  componentId: string;
  instance?: any;
}

/**
 * 组件实例
 */
export interface ComponentInstance {
  component: any;
  nodeId: string;
  props: Record<string, any>;
}

/**
 * 远程组件描述
 */
export interface RemoteComponentDescription {
  componentName: string;
  npm?: IPublicTypeNpmInfo;
}

/**
 * 包信息
 */
export interface Package {
  npm?: IPublicTypeNpmInfo;
  package?: string;
  version?: string;
  url?: string;
}

/**
 * NPM信息
 */
export interface NpmInfo {
  package: string;
  version: string;
  exportName?: string;
  subName?: string;
  main?: string;
  destructuring?: boolean;
  resourceName?: string;
  resource?: string;
}

/**
 * 引用
 */
export interface Reference {
  componentName: string;
  id?: string;
}

/**
 * 插件声明
 */
export interface PluginDeclaration {
  name: string;
  meta?: PluginMeta;
  dependencies?: string[];
}

/**
 * 插件元数据
 */
export interface PluginMeta {
  preference?: Record<string, any>;
  engines?: {
    lowcodeEngine?: string;
  };
}

/**
 * 插件声明属性
 */
export interface PluginDeclarationProperty {
  type: string;
  description?: string;
  default?: any;
}

/**
 * 插件配置
 */
export interface PluginConfig {
  pluginKey: string;
  type: string;
  props?: Record<string, any>;
  config?: IPublicTypeNpmInfo;
  pluginProps?: Record<string, any>;
}

/**
 * 插件元数据
 */
export interface PluginMeta {
  preference?: Record<string, any>;
  engines?: {
    lowcodeEngine?: string;
  };
}

/**
 * 插件创建器
 */
export type PluginCreater = (options: PluginRegisterOptions) => any;

/**
 * 插件注册选项
 */
export interface PluginRegisterOptions {
  [key: string]: any;
}

/**
 * 可释放对象
 */
export interface IDisposable {
  dispose(): void;
}

/**
 * 滚动目标
 */
export interface ScrollTarget {
  node?: NodeSchema;
  scrollLeft?: number;
  scrollTop?: number;
}

/**
 * 可滚动对象
 */
export interface Scrollable {
  scrollTo(scrollTarget: ScrollTarget): void;
}
