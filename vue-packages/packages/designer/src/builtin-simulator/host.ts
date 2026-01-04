import { obx, computed, makeObservable, action, reaction, runInAction, untracked } from '@alilc/lowcode-editor-core';
import {
  IPublicTypeNodeSchema,
  IPublicTypeComponentSchema,
  IPublicTypeNodeData,
  IPublicTypePropsMap,
  IPublicTypePropsList,
  IPublicTypeI18nData,
  IPublicTypeCompositeValue,
  IPublicTypeTransformedComponentMetadata,
  IPublicTypeFieldExtraProps,
  IPublicTypeCustomView,
  IPublicTypeTitleContent,
  IPublicTypeIconType,
  IPublicTypeNpmInfo,
  IPublicTypeEditorGetResult,
  IPublicTypeDisposable,
  IPublicTypeLocationChildrenDetail,
  IPublicTypeLocationDetail,
  IPublicTypeDraggable,
  IPublicTypeDroppable,
  IPublicTypeNodeInstance,
  IPublicTypeComponentAction,
  IPublicTypeComponentMetadata,
  IPublicTypePackage,
  IPublicTypeSnippet,
  IPublicTypeRemoteComponentDescription,
  IPublicTypeComponentDescription,
  IPublicTypeAdvanced,
  IPublicTypeConfig,
  IPublicTypeContextMenuAction,
  IPublicTypeContextMenuItem,
  IPublicTypeLiveTextEditingConfig,
  IPublicTypeSetterType,
  IPublicTypeFieldConfig,
  IPublicTypeNodeSchema,
  IPublicTypeProjectSchema,
  IPublicTypePageSchema,
  IPublicTypeComponentMap,
  IPublicTypeEngineOptions,
  IPublicTypePreference,
  IPublicTypeDesigner,
  IPublicTypeProject,
  IPublicTypeDocumentModel,
  IPublicTypeNode,
  IPublicTypeSelection,
  IPublicTypeHistory,
  IPublicTypeComponentMeta,
  IPublicTypeModalNodesManager,
  IPublicTypeProps,
  IPublicTypeProp,
  IPublicTypeModel,
  IPublicTypeDragObject,
  IPublicTypeNodeSchema,
  IPublicTypeDragNodeObject,
  IPublicTypeDetecting,
  IPublicTypeDropLocation,
  IPublicTypeScrollTarget,
  IPublicTypeComponentDescription,
  IPublicTypeSetters,
  IPublicTypeRegisteredSetter,
  IPublicTypeSetterConfig,
  IPublicTypeNodeInstance,
  IPublicTypeSimulatorHost,
  IPublicTypeSimulatorProps,
  IPublicTypeSimulatorRenderer,
  IPublicTypeDevice,
  IPublicTypeViewport,
  IPublicTypeScrollable,
  IPublicTypeScrollTarget,
} from '@alilc/lowcode-types';
import { createModuleEventBus, IEventBus, isPlainObject, isJSExpression, Logger } from '@alilc/lowcode-utils';
import { GlobalEvent } from '@alilc/lowcode-editor-core';
import { IRenderer } from './renderer';

const logger = new Logger({ level: 'warn', prefix: '[Simulator]' });

export interface BuiltinSimulatorHostProps extends IPublicTypeSimulatorProps {
  // 扩展属性
  device?: IPublicTypeDevice;
  deviceClassName?: string;
  designMode?: 'design' | 'live' | 'preview' | 'extend';
  suspended?: boolean;
}

export interface BuiltinSimulatorConfig {
  /**
   * 获取组件描述
   */
  getComponentDescription?: (componentName: string) => IPublicTypeComponentDescription | null;
  
  /**
   * 获取组件元数据
   */
  getComponentMeta?: (componentName: string) => IPublicTypeTransformedComponentMetadata | null;
  
  /**
   * 是否启用设计模式
   */
  designMode?: 'design' | 'live' | 'preview' | 'extend';
  
  /**
   * 设备类型
   */
  device?: IPublicTypeDevice;
  
  /**
   * 设备类名
   */
  deviceClassName?: string;
  
  /**
   * 是否挂起
   */
  suspended?: boolean;
  
  /**
   * 渲染器
   */
  renderer?: IRenderer;
}

export interface ViewportInstance {
  scrollTo(options: { left?: number; top?: number; behavior?: ScrollBehavior }): void;
  scrollToElement(element: HTMLElement, options?: ScrollIntoViewOptions): void;
  getScrollPosition(): { left: number; top: number };
  getViewportSize(): { width: number; height: number };
}

export class BuiltinSimulatorHost implements IPublicTypeSimulatorHost {
  private emitter: IEventBus = createModuleEventBus('BuiltinSimulatorHost');

  private _disposed = false;

  @obx.ref private _suspended = false;

  @obx.ref private _designMode: 'design' | 'live' | 'preview' | 'extend' = 'design';

  @obx.ref private _device: IPublicTypeDevice = 'default';

  @obx.ref private _deviceClassName = '';

  @obx.ref private _viewport: ViewportInstance | null = null;

  @obx.ref private _renderer: IRenderer | null = null;

  @obx.ref private _project: IPublicTypeProject | null = null;

  @obx.ref private _document: IPublicTypeDocumentModel | null = null;

  @obx.ref private _designer: IPublicTypeDesigner | null = null;

  @obx.ref private _currentResource: any = null;

  private _components: IPublicTypeComponentMap = {};

  private _libraryMap: Record<string, any> = {};

  private _context: Record<string, any> = {};

  private _i18n: IPublicTypeI18nData = {};

  private _locale: string = 'zh-CN';

  private _global: any = {};

  private _utils: Record<string, any> = {};

  private _constants: Record<string, any> = {};

  private _requestHandlersMap: Record<string, any> = {};

  private _setters: IPublicTypeSetters = {};

  constructor(props: BuiltinSimulatorHostProps = {}) {
    makeObservable(this);
    
    this._suspended = props.suspended || false;
    this._designMode = props.designMode || 'design';
    this._device = props.device || 'default';
    this._deviceClassName = props.deviceClassName || '';
    this._renderer = props.renderer || null;
    this._project = props.project || null;
    this._document = props.document || null;
    this._designer = props.designer || null;
    
    this._components = props.components || {};
    this._libraryMap = props.libraryMap || {};
    this._context = props.context || {};
    this._i18n = props.i18n || {};
    this._locale = props.locale || 'zh-CN';
    this._global = props.global || {};
    this._utils = props.utils || {};
    this._constants = props.constants || {};
    this._requestHandlersMap = props.requestHandlersMap || {};
    this._setters = props.setters || {};

    this.setupReactions();
  }

  private setupReactions() {
    // 设置响应式监听
    this.disposers.push(
      reaction(
        () => this.designMode,
        (designMode) => {
          this.emitter.emit('designModeChange', designMode);
        }
      ),
      reaction(
        () => this.device,
        (device) => {
          this.emitter.emit('deviceChange', device);
        }
      ),
      reaction(
        () => this.suspended,
        (suspended) => {
          this.emitter.emit('suspendedChange', suspended);
        }
      )
    );
  }

  private disposers: Array<() => void> = [];

  @computed get suspended(): boolean {
    return this._suspended;
  }

  @computed get designMode(): 'design' | 'live' | 'preview' | 'extend' {
    return this._designMode;
  }

  @computed get device(): IPublicTypeDevice {
    return this._device;
  }

  @computed get deviceClassName(): string {
    return this._deviceClassName;
  }

  @computed get viewport(): ViewportInstance | null {
    return this._viewport;
  }

  @computed get renderer(): IRenderer | null {
    return this._renderer;
  }

  @computed get project(): IPublicTypeProject | null {
    return this._project;
  }

  @computed get document(): IPublicTypeDocumentModel | null {
    return this._document;
  }

  @computed get designer(): IPublicTypeDesigner | null {
    return this._designer;
  }

  @computed get currentResource(): any {
    return this._currentResource;
  }

  @computed get components(): IPublicTypeComponentMap {
    return this._components;
  }

  @computed get libraryMap(): Record<string, any> {
    return this._libraryMap;
  }

  @computed get context(): Record<string, any> {
    return this._context;
  }

  @computed get i18n(): IPublicTypeI18nData {
    return this._i18n;
  }

  @computed get locale(): string {
    return this._locale;
  }

  @computed get global(): any {
    return this._global;
  }

  @computed get utils(): Record<string, any> {
    return this._utils;
  }

  @computed get constants(): Record<string, any> {
    return this._constants;
  }

  @computed get requestHandlersMap(): Record<string, any> {
    return this._requestHandlersMap;
  }

  @computed get setters(): IPublicTypeSetters {
    return this._setters;
  }

  @action setSuspended(suspended: boolean): void {
    this._suspended = suspended;
  }

  @action setDesignMode(designMode: 'design' | 'live' | 'preview' | 'extend'): void {
    this._designMode = designMode;
  }

  @action setDevice(device: IPublicTypeDevice): void {
    this._device = device;
  }

  @action setDeviceClassName(deviceClassName: string): void {
    this._deviceClassName = deviceClassName;
  }

  @action setViewport(viewport: ViewportInstance | null): void {
    this._viewport = viewport;
  }

  @action setRenderer(renderer: IRenderer | null): void {
    this._renderer = renderer;
  }

  @action setProject(project: IPublicTypeProject | null): void {
    this._project = project;
  }

  @action setDocument(document: IPublicTypeDocumentModel | null): void {
    this._document = document;
  }

  @action setDesigner(designer: IPublicTypeDesigner | null): void {
    this._designer = designer;
  }

  @action setCurrentResource(resource: any): void {
    this._currentResource = resource;
  }

  @action setComponents(components: IPublicTypeComponentMap): void {
    this._components = components;
  }

  @action setLibraryMap(libraryMap: Record<string, any>): void {
    this._libraryMap = libraryMap;
  }

  @action setContext(context: Record<string, any>): void {
    this._context = context;
  }

  @action setI18n(i18n: IPublicTypeI18nData): void {
    this._i18n = i18n;
  }

  @action setLocale(locale: string): void {
    this._locale = locale;
  }

  @action setGlobal(global: any): void {
    this._global = global;
  }

  @action setUtils(utils: Record<string, any>): void {
    this._utils = utils;
  }

  @action setConstants(constants: Record<string, any>): void {
    this._constants = constants;
  }

  @action setRequestHandlersMap(requestHandlersMap: Record<string, any>): void {
    this._requestHandlersMap = requestHandlersMap;
  }

  @action setSetters(setters: IPublicTypeSetters): void {
    this._setters = setters;
  }

  /**
   * 获取组件描述
   */
  getComponentDescription(componentName: string): IPublicTypeComponentDescription | null {
    const component = this._components[componentName];
    if (!component) {
      return null;
    }
    return {
      componentName,
      ...component,
    };
  }

  /**
   * 获取组件元数据
   */
  getComponentMeta(componentName: string): IPublicTypeTransformedComponentMetadata | null {
    if (this._designer) {
      return this._designer.getComponentMeta(componentName);
    }
    return null;
  }

  /**
   * 获取组件
   */
  getComponent(componentName: string): any {
    return this._components[componentName];
  }

  /**
   * 获取库
   */
  getLibrary(libraryName: string): any {
    return this._libraryMap[libraryName];
  }

  /**
   * 获取国际化文本
   */
  getI18n(key: string): string {
    if (this._i18n[key]) {
      return this._i18n[key];
    }
    return key;
  }

  /**
   * 获取工具函数
   */
  getUtils(name: string): any {
    return this._utils[name];
  }

  /**
   * 获取常量
   */
  getConstant(name: string): any {
    return this._constants[name];
  }

  /**
   * 获取请求处理器
   */
  getRequestHandler(name: string): any {
    return this._requestHandlersMap[name];
  }

  /**
   * 获取 Setter
   */
  getSetter(type: string): IPublicTypeRegisteredSetter | null {
    return this._setters[type] || null;
  }

  /**
   * 注册 Setter
   */
  registerSetter(type: string, setter: IPublicTypeSetterConfig): void {
    this._setters[type] = setter;
  }

  /**
   * 添加组件
   */
  addComponents(components: IPublicTypeComponentMap): void {
    this._components = {
      ...this._components,
      ...components,
    };
  }

  /**
   * 移除组件
   */
  removeComponents(componentNames: string[]): void {
    const newComponents = { ...this._components };
    componentNames.forEach(name => {
      delete newComponents[name];
    });
    this._components = newComponents;
  }

  /**
   * 添加库
   */
  addLibrary(name: string, library: any): void {
    this._libraryMap[name] = library;
  }

  /**
   * 移除库
   */
  removeLibrary(name: string): void {
    delete this._libraryMap[name];
  }

  /**
   * 添加工具函数
   */
  addUtils(utils: Record<string, any>): void {
    this._utils = {
      ...this._utils,
      ...utils,
    };
  }

  /**
   * 移除工具函数
   */
  removeUtils(names: string[]): void {
    const newUtils = { ...this._utils };
    names.forEach(name => {
      delete newUtils[name];
    });
    this._utils = newUtils;
  }

  /**
   * 添加常量
   */
  addConstants(constants: Record<string, any>): void {
    this._constants = {
      ...this._constants,
      ...constants,
    };
  }

  /**
   * 移除常量
   */
  removeConstants(names: string[]): void {
    const newConstants = { ...this._constants };
    names.forEach(name => {
      delete newConstants[name];
    });
    this._constants = newConstants;
  }

  /**
   * 添加请求处理器
   */
  addRequestHandlers(handlers: Record<string, any>): void {
    this._requestHandlersMap = {
      ...this._requestHandlersMap,
      ...handlers,
    };
  }

  /**
   * 移除请求处理器
   */
  removeRequestHandlers(names: string[]): void {
    const newHandlers = { ...this._requestHandlersMap };
    names.forEach(name => {
      delete newHandlers[name];
    });
    this._requestHandlersMap = newHandlers;
  }

  /**
   * 添加国际化文本
   */
  addI18n(i18n: IPublicTypeI18nData): void {
    this._i18n = {
      ...this._i18n,
      ...i18n,
    };
  }

  /**
   * 移除国际化文本
   */
  removeI18n(keys: string[]): void {
    const newI18n = { ...this._i18n };
    keys.forEach(key => {
      delete newI18n[key];
    });
    this._i18n = newI18n;
  }

  /**
   * 添加上下文
   */
  addContext(context: Record<string, any>): void {
    this._context = {
      ...this._context,
      ...context,
    };
  }

  /**
   * 移除上下文
   */
  removeContext(keys: string[]): void {
    const newContext = { ...this._context };
    keys.forEach(key => {
      delete newContext[key];
    });
    this._context = newContext;
  }

  /**
   * 添加全局对象
   */
  addGlobal(global: any): void {
    this._global = {
      ...this._global,
      ...global,
    };
  }

  /**
   * 移除全局对象
   */
  removeGlobal(keys: string[]): void {
    const newGlobal = { ...this._global };
    keys.forEach(key => {
      delete newGlobal[key];
    });
    this._global = newGlobal;
  }

  /**
   * 订阅事件
   */
  on(event: string, handler: (...args: any[]) => void): IPublicTypeDisposable {
    this.emitter.on(event, handler);
    return () => {
      this.emitter.off(event, handler);
    };
  }

  /**
   * 取消订阅事件
   */
  off(event: string, handler: (...args: any[]) => void): void {
    this.emitter.off(event, handler);
  }

  /**
   * 销毁
   */
  dispose(): void {
    if (this._disposed) {
      return;
    }
    this._disposed = true;
    this.disposers.forEach(disposer => disposer());
    this.disposers = [];
    this.emitter.removeAllListeners();
  }

  /**
   * 是否已销毁
   */
  get isDisposed(): boolean {
    return this._disposed;
  }
}

export default BuiltinSimulatorHost;
