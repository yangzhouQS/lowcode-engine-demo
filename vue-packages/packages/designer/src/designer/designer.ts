import { computed, ref, watch } from 'vue';
import {
  IPublicTypeDesigner,
  IPublicTypeProject,
  IPublicTypeDocumentModel,
  IPublicTypeComponentMeta,
  IPublicTypeNode,
  IPublicTypeSelection,
  IPublicTypeHistory,
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
  IPublicTypeEngineOptions,
  IPublicTypePreference,
  IPublicTypePluginContext,
  IPublicTypeComponentMap,
  IPublicTypeLibrary,
  IPublicTypeAssets,
  IPublicTypeSnippet,
  IPublicTypeRemoteComponentDescription,
  IPublicTypeComponentMetadata,
  IPublicTypeTransformedComponentMetadata,
  IPublicTypeNpmInfo,
  IPublicTypePackage,
  IPublicTypeI18nData,
  IPublicTypeCustomView,
  IPublicTypeTitleContent,
  IPublicTypeIconType,
  IPublicTypeFieldExtraProps,
  IPublicTypeFieldConfig,
  IPublicTypeSetterType,
  IPublicTypeEditorGetResult,
  IPublicTypeDisposable,
  IPublicTypeLocationChildrenDetail,
  IPublicTypeLocationDetail,
  IPublicTypeDraggable,
  IPublicTypeDroppable,
  IPublicTypeContextMenuAction,
  IPublicTypeContextMenuItem,
  IPublicTypeLiveTextEditingConfig,
} from '@vue3-engine/types';
import { createModuleEventBus, IEventBus, isPlainObject, isJSExpression, Logger } from '@vue3-engine/utils';

const logger = new Logger({ level: 'warn', prefix: '[Designer]' });

export interface DesignerConfig extends IPublicTypeEngineOptions {
  /**
   * 项目实例
   */
  project?: IPublicTypeProject;
  
  /**
   * 组件映射
   */
  components?: IPublicTypeComponentMap;
  
  /**
   * 库映射
   */
  libraryMap?: Record<string, any>;
  
  /**
   * 上下文
   */
  context?: Record<string, any>;
  
  /**
   * 国际化
   */
  i18n?: IPublicTypeI18nData;
  
  /**
   * 语言
   */
  locale?: string;
  
  /**
   * 全局对象
   */
  global?: any;
  
  /**
   * 工具函数
   */
  utils?: Record<string, any>;
  
  /**
   * 常量
   */
  constants?: Record<string, any>;
  
  /**
   * 请求处理器映射
   */
  requestHandlersMap?: Record<string, any>;
  
  /**
   * Setter 映射
   */
  setters?: IPublicTypeSetters;
  
  /**
   * 设计模式
   */
  designMode?: 'design' | 'live' | 'preview' | 'extend';
  
  /**
   * 设备类型
   */
  device?: 'default' | 'mobile' | 'tablet' | 'desktop';
  
  /**
   * 是否启用设计模式
   */
  enableStrictPluginMode?: boolean;
  
  /**
   * 是否启用拖拽
   */
  enableDrag?: boolean;
  
  /**
   * 是否启用拖拽到画布
   */
  enableCanvasToDrag?: boolean;
  
  /**
   * 是否启用实时编辑
   */
  enableLiveEditing?: boolean;
  
  /**
   * 是否启用自动保存
   */
  enableAutoSave?: boolean;
}

export class Designer implements IPublicTypeDesigner {
  private emitter: IEventBus = createModuleEventBus('Designer');

  private _disposed = false;

  private _project = ref<IPublicTypeProject | null>(null);

  private _components = ref<IPublicTypeComponentMap>({});

  private _libraryMap = ref<Record<string, any>>({});

  private _context = ref<Record<string, any>>({});

  private _i18n = ref<IPublicTypeI18nData>({});

  private _locale = ref<string>('zh-CN');

  private _global = ref<any>({});

  private _utils = ref<Record<string, any>>({});

  private _constants = ref<Record<string, any>>({});

  private _requestHandlersMap = ref<Record<string, any>>({});

  private _setters = ref<IPublicTypeSetters>({});

  private _designMode = ref<'design' | 'live' | 'preview' | 'extend'>('design');

  private _device = ref<'default' | 'mobile' | 'tablet' | 'desktop'>('default');

  private _enableStrictPluginMode = ref(false);

  private _enableDrag = ref(true);

  private _enableCanvasToDrag = ref(true);

  private _enableLiveEditing = ref(false);

  private _enableAutoSave = ref(false);

  private _simulator = ref<IPublicTypeSimulatorHost | null>(null);

  private _componentMetas: Map<string, IPublicTypeTransformedComponentMetadata> = new Map();

  private disposers: Array<() => void> = [];

  constructor(props: DesignerConfig = {}) {
    this._project.value = props.project || null;
    this._components.value = props.components || {};
    this._libraryMap.value = props.libraryMap || {};
    this._context.value = props.context || {};
    this._i18n.value = props.i18n || {};
    this._locale.value = props.locale || 'zh-CN';
    this._global.value = props.global || {};
    this._utils.value = props.utils || {};
    this._constants.value = props.constants || {};
    this._requestHandlersMap.value = props.requestHandlersMap || {};
    this._setters.value = props.setters || {};
    this._designMode.value = props.designMode || 'design';
    this._device.value = props.device || 'default';
    this._enableStrictPluginMode.value = props.enableStrictPluginMode ?? false;
    this._enableDrag.value = props.enableDrag ?? true;
    this._enableCanvasToDrag.value = props.enableCanvasToDrag ?? true;
    this._enableLiveEditing.value = props.enableLiveEditing ?? false;
    this._enableAutoSave.value = props.enableAutoSave ?? false;

    this.setupReactions();
  }

  private setupReactions() {
    const stopWatch1 = watch(
      () => this.designMode,
      (designMode) => {
        this.emitter.emit('designModeChange', designMode);
      }
    );
    const stopWatch2 = watch(
      () => this.device,
      (device) => {
        this.emitter.emit('deviceChange', device);
      }
    );
    this.disposers.push(stopWatch1, stopWatch2);
  }

  readonly project = computed(() => this._project.value);

  readonly components = computed(() => this._components.value);

  readonly libraryMap = computed(() => this._libraryMap.value);

  readonly context = computed(() => this._context.value);

  readonly i18n = computed(() => this._i18n.value);

  readonly locale = computed(() => this._locale.value);

  readonly global = computed(() => this._global.value);

  readonly utils = computed(() => this._utils.value);

  readonly constants = computed(() => this._constants.value);

  readonly requestHandlersMap = computed(() => this._requestHandlersMap.value);

  readonly setters = computed(() => this._setters.value);

  readonly designMode = computed(() => this._designMode.value);

  readonly device = computed(() => this._device.value);

  readonly enableStrictPluginMode = computed(() => this._enableStrictPluginMode.value);

  readonly enableDrag = computed(() => this._enableDrag.value);

  readonly enableCanvasToDrag = computed(() => this._enableCanvasToDrag.value);

  readonly enableLiveEditing = computed(() => this._enableLiveEditing.value);

  readonly enableAutoSave = computed(() => this._enableAutoSave.value);

  readonly simulator = computed(() => this._simulator.value);

  setProject(project: IPublicTypeProject | null): void {
    this._project.value = project;
  }

  setComponents(components: IPublicTypeComponentMap): void {
    this._components.value = components;
  }

  setLibraryMap(libraryMap: Record<string, any>): void {
    this._libraryMap.value = libraryMap;
  }

  setContext(context: Record<string, any>): void {
    this._context.value = context;
  }

  setI18n(i18n: IPublicTypeI18nData): void {
    this._i18n.value = i18n;
  }

  setLocale(locale: string): void {
    this._locale.value = locale;
  }

  setGlobal(global: any): void {
    this._global.value = global;
  }

  setUtils(utils: Record<string, any>): void {
    this._utils.value = utils;
  }

  setConstants(constants: Record<string, any>): void {
    this._constants.value = constants;
  }

  setRequestHandlersMap(requestHandlersMap: Record<string, any>): void {
    this._requestHandlersMap.value = requestHandlersMap;
  }

  setSetters(setters: IPublicTypeSetters): void {
    this._setters.value = setters;
  }

  setDesignMode(designMode: 'design' | 'live' | 'preview' | 'extend'): void {
    this._designMode.value = designMode;
  }

  setDevice(device: 'default' | 'mobile' | 'tablet' | 'desktop'): void {
    this._device.value = device;
  }

  setEnableStrictPluginMode(enable: boolean): void {
    this._enableStrictPluginMode.value = enable;
  }

  setEnableDrag(enable: boolean): void {
    this._enableDrag.value = enable;
  }

  setEnableCanvasToDrag(enable: boolean): void {
    this._enableCanvasToDrag.value = enable;
  }

  setEnableLiveEditing(enable: boolean): void {
    this._enableLiveEditing.value = enable;
  }

  setEnableAutoSave(enable: boolean): void {
    this._enableAutoSave.value = enable;
  }

  setSimulator(simulator: IPublicTypeSimulatorHost | null): void {
    this._simulator.value = simulator;
  }

  /**
   * 获取组件元数据
   */
  getComponentMeta(componentName: string): IPublicTypeTransformedComponentMetadata | null {
    return this._componentMetas.get(componentName) || null;
  }

  /**
   * 设置组件元数据
   */
  setComponentMeta(componentName: string, meta: IPublicTypeTransformedComponentMetadata): void {
    this._componentMetas.set(componentName, meta);
    this.emitter.emit('componentMetaChange', { componentName, meta });
  }

  /**
   * 批量设置组件元数据
   */
  setComponentMetas(metas: Record<string, IPublicTypeTransformedComponentMetadata>): void {
    Object.entries(metas).forEach(([componentName, meta]) => {
      this._componentMetas.set(componentName, meta);
    });
    this.emitter.emit('componentMetasChange', metas);
  }

  /**
   * 获取组件
   */
  getComponent(componentName: string): any {
    return this._components.value[componentName];
  }

  /**
   * 获取库
   */
  getLibrary(libraryName: string): any {
    return this._libraryMap.value[libraryName];
  }

  /**
   * 获取国际化文本
   */
  getI18n(key: string): string {
    if (this._i18n.value[key]) {
      return this._i18n.value[key];
    }
    return key;
  }

  /**
   * 获取工具函数
   */
  getUtils(name: string): any {
    return this._utils.value[name];
  }

  /**
   * 获取常量
   */
  getConstant(name: string): any {
    return this._constants.value[name];
  }

  /**
   * 获取请求处理器
   */
  getRequestHandler(name: string): any {
    return this._requestHandlersMap.value[name];
  }

  /**
   * 获取 Setter
   */
  getSetter(type: string): IPublicTypeRegisteredSetter | null {
    return this._setters.value[type] || null;
  }

  /**
   * 注册 Setter
   */
  registerSetter(type: string, setter: IPublicTypeSetterConfig): void {
    this._setters.value[type] = setter;
    this.emitter.emit('setterRegister', { type, setter });
  }

  /**
   * 添加组件
   */
  addComponents(components: IPublicTypeComponentMap): void {
    this._components.value = {
      ...this._components.value,
      ...components,
    };
    this.emitter.emit('componentsChange', this._components.value);
  }

  /**
   * 移除组件
   */
  removeComponents(componentNames: string[]): void {
    const newComponents = { ...this._components.value };
    componentNames.forEach(name => {
      delete newComponents[name];
    });
    this._components.value = newComponents;
    this.emitter.emit('componentsChange', this._components.value);
  }

  /**
   * 添加库
   */
  addLibrary(name: string, library: any): void {
    this._libraryMap.value[name] = library;
    this.emitter.emit('libraryChange', this._libraryMap.value);
  }

  /**
   * 移除库
   */
  removeLibrary(name: string): void {
    delete this._libraryMap.value[name];
    this.emitter.emit('libraryChange', this._libraryMap.value);
  }

  /**
   * 添加工具函数
   */
  addUtils(utils: Record<string, any>): void {
    this._utils.value = {
      ...this._utils.value,
      ...utils,
    };
    this.emitter.emit('utilsChange', this._utils.value);
  }

  /**
   * 移除工具函数
   */
  removeUtils(names: string[]): void {
    const newUtils = { ...this._utils.value };
    names.forEach(name => {
      delete newUtils[name];
    });
    this._utils.value = newUtils;
    this.emitter.emit('utilsChange', this._utils.value);
  }

  /**
   * 添加常量
   */
  addConstants(constants: Record<string, any>): void {
    this._constants.value = {
      ...this._constants.value,
      ...constants,
    };
    this.emitter.emit('constantsChange', this._constants.value);
  }

  /**
   * 移除常量
   */
  removeConstants(names: string[]): void {
    const newConstants = { ...this._constants.value };
    names.forEach(name => {
      delete newConstants[name];
    });
    this._constants.value = newConstants;
    this.emitter.emit('constantsChange', this._constants.value);
  }

  /**
   * 添加请求处理器
   */
  addRequestHandlers(handlers: Record<string, any>): void {
    this._requestHandlersMap.value = {
      ...this._requestHandlersMap.value,
      ...handlers,
    };
    this.emitter.emit('requestHandlersChange', this._requestHandlersMap.value);
  }

  /**
   * 移除请求处理器
   */
  removeRequestHandlers(names: string[]): void {
    const newHandlers = { ...this._requestHandlersMap.value };
    names.forEach(name => {
      delete newHandlers[name];
    });
    this._requestHandlersMap.value = newHandlers;
    this.emitter.emit('requestHandlersChange', this._requestHandlersMap.value);
  }

  /**
   * 添加国际化文本
   */
  addI18n(i18n: IPublicTypeI18nData): void {
    this._i18n.value = {
      ...this._i18n.value,
      ...i18n,
    };
    this.emitter.emit('i18nChange', this._i18n.value);
  }

  /**
   * 移除国际化文本
   */
  removeI18n(keys: string[]): void {
    const newI18n = { ...this._i18n.value };
    keys.forEach(key => {
      delete newI18n[key];
    });
    this._i18n.value = newI18n;
    this.emitter.emit('i18nChange', this._i18n.value);
  }

  /**
   * 添加上下文
   */
  addContext(context: Record<string, any>): void {
    this._context.value = {
      ...this._context.value,
      ...context,
    };
    this.emitter.emit('contextChange', this._context.value);
  }

  /**
   * 移除上下文
   */
  removeContext(keys: string[]): void {
    const newContext = { ...this._context.value };
    keys.forEach(key => {
      delete newContext[key];
    });
    this._context.value = newContext;
    this.emitter.emit('contextChange', this._context.value);
  }

  /**
   * 添加全局对象
   */
  addGlobal(global: any): void {
    this._global.value = {
      ...this._global.value,
      ...global,
    };
    this.emitter.emit('globalChange', this._global.value);
  }

  /**
   * 移除全局对象
   */
  removeGlobal(keys: string[]): void {
    const newGlobal = { ...this._global.value };
    keys.forEach(key => {
      delete newGlobal[key];
    });
    this._global.value = newGlobal;
    this.emitter.emit('globalChange', this._global.value);
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
    this._componentMetas.clear();
  }

  /**
   * 是否已销毁
   */
  get isDisposed(): boolean {
    return this._disposed;
  }
}

export default Designer;
