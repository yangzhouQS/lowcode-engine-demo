import { obx, computed, makeObservable, action, reaction, runInAction } from '@alilc/lowcode-editor-core';
import {
  IPublicTypeProject,
  IPublicTypeDocumentModel,
  IPublicTypeNodeSchema,
  IPublicTypeProjectSchema,
  IPublicTypePageSchema,
  IPublicTypeEditorGetResult,
  IPublicTypeDisposable,
  IPublicTypeEngineOptions,
  IPublicTypeDesigner,
  IPublicTypeComponentMap,
  IPublicTypeLibrary,
  IPublicTypeAssets,
  IPublicTypeSnippet,
  IPublicTypeRemoteComponentDescription,
  IPublicTypeComponentMetadata,
  IPublicTypeTransformedComponentMetadata,
} from '@alilc/lowcode-types';
import { createModuleEventBus, IEventBus, Logger } from '@alilc/lowcode-utils';

const logger = new Logger({ level: 'warn', prefix: '[Project]' });

export interface ProjectConfig {
  /**
   * 设计器实例
   */
  designer?: IPublicTypeDesigner;
  
  /**
   * 项目配置
   */
  config?: IPublicTypeEngineOptions;
  
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
  i18n?: Record<string, string>;
  
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
  setters?: Record<string, any>;
}

export class Project implements IPublicTypeProject {
  private emitter: IEventBus = createModuleEventBus('Project');

  private _disposed = false;

  @obx.ref private _designer: IPublicTypeDesigner | null = null;

  @obx.ref private _documents: Map<string, IPublicTypeDocumentModel> = new Map();

  @obx.ref private _currentDocument: IPublicTypeDocumentModel | null = null;

  @obx.ref private _config: IPublicTypeEngineOptions = {};

  @obx.ref private _components: IPublicTypeComponentMap = {};

  @obx.ref private _libraryMap: Record<string, any> = {};

  @obx.ref private _context: Record<string, any> = {};

  @obx.ref private _i18n: Record<string, string> = {};

  @obx.ref private _locale: string = 'zh-CN';

  @obx.ref private _global: any = {};

  @obx.ref private _utils: Record<string, any> = {};

  @obx.ref private _constants: Record<string, any> = {};

  @obx.ref private _requestHandlersMap: Record<string, any> = {};

  @obx.ref private _setters: Record<string, any> = {};

  constructor(props: ProjectConfig = {}) {
    makeObservable(this);
    
    this._designer = props.designer || null;
    this._config = props.config || {};
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
    this.disposers.push(
      reaction(
        () => this.currentDocument,
        (document) => {
          this.emitter.emit('currentDocumentChange', document);
        }
      )
    );
  }

  private disposers: Array<() => void> = [];

  @computed get designer(): IPublicTypeDesigner | null {
    return this._designer;
  }

  @computed get documents(): IPublicTypeDocumentModel[] {
    return Array.from(this._documents.values());
  }

  @computed get currentDocument(): IPublicTypeDocumentModel | null {
    return this._currentDocument;
  }

  @computed get config(): IPublicTypeEngineOptions {
    return this._config;
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

  @computed get i18n(): Record<string, string> {
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

  @computed get setters(): Record<string, any> {
    return this._setters;
  }

  @action setDesigner(designer: IPublicTypeDesigner | null): void {
    this._designer = designer;
  }

  @action setConfig(config: IPublicTypeEngineOptions): void {
    this._config = config;
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

  @action setI18n(i18n: Record<string, string>): void {
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

  @action setSetters(setters: Record<string, any>): void {
    this._setters = setters;
  }

  /**
   * 获取文档
   */
  getDocument(documentId: string): IPublicTypeDocumentModel | null {
    return this._documents.get(documentId) || null;
  }

  /**
   * 添加文档
   */
  @action addDocument(document: IPublicTypeDocumentModel): void {
    this._documents.set(document.id, document);
    this.emitter.emit('documentAdd', document);
  }

  /**
   * 移除文档
   */
  @action removeDocument(documentId: string): void {
    const document = this._documents.get(documentId);
    if (document) {
      this._documents.delete(documentId);
      this.emitter.emit('documentRemove', document);
    }
  }

  /**
   * 设置当前文档
   */
  @action setCurrentDocument(documentId: string): void {
    const document = this._documents.get(documentId);
    if (document) {
      this._currentDocument = document;
    }
  }

  /**
   * 打开文档
   */
  @action openDocument(schema: IPublicTypePageSchema): IPublicTypeDocumentModel {
    // TODO: 实现打开文档逻辑
    logger.warn('openDocument not implemented yet');
    return null as any;
  }

  /**
   * 关闭文档
   */
  @action closeDocument(documentId: string): void {
    this.removeDocument(documentId);
  }

  /**
   * 获取导出结果
   */
  getSchema(): IPublicTypeProjectSchema {
    return {
      componentsMap: this._components,
      i18n: this._i18n,
      utils: this._utils,
      constants: this._constants,
      // TODO: 添加其他字段
    };
  }

  /**
   * 设置项目配置
   */
  @action setProjectSchema(schema: IPublicTypeProjectSchema): void {
    this._components = schema.componentsMap || {};
    this._i18n = schema.i18n || {};
    this._utils = schema.utils || {};
    this._constants = schema.constants || {};
    this.emitter.emit('projectSchemaChange', schema);
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
  getSetter(type: string): any {
    return this._setters[type] || null;
  }

  /**
   * 添加组件
   */
  @action addComponents(components: IPublicTypeComponentMap): void {
    this._components = {
      ...this._components,
      ...components,
    };
    this.emitter.emit('componentsChange', this._components);
  }

  /**
   * 移除组件
   */
  @action removeComponents(componentNames: string[]): void {
    const newComponents = { ...this._components };
    componentNames.forEach(name => {
      delete newComponents[name];
    });
    this._components = newComponents;
    this.emitter.emit('componentsChange', this._components);
  }

  /**
   * 添加库
   */
  @action addLibrary(name: string, library: any): void {
    this._libraryMap[name] = library;
    this.emitter.emit('libraryChange', this._libraryMap);
  }

  /**
   * 移除库
   */
  @action removeLibrary(name: string): void {
    delete this._libraryMap[name];
    this.emitter.emit('libraryChange', this._libraryMap);
  }

  /**
   * 添加工具函数
   */
  @action addUtils(utils: Record<string, any>): void {
    this._utils = {
      ...this._utils,
      ...utils,
    };
    this.emitter.emit('utilsChange', this._utils);
  }

  /**
   * 移除工具函数
   */
  @action removeUtils(names: string[]): void {
    const newUtils = { ...this._utils };
    names.forEach(name => {
      delete newUtils[name];
    });
    this._utils = newUtils;
    this.emitter.emit('utilsChange', this._utils);
  }

  /**
   * 添加常量
   */
  @action addConstants(constants: Record<string, any>): void {
    this._constants = {
      ...this._constants,
      ...constants,
    };
    this.emitter.emit('constantsChange', this._constants);
  }

  /**
   * 移除常量
   */
  @action removeConstants(names: string[]): void {
    const newConstants = { ...this._constants };
    names.forEach(name => {
      delete newConstants[name];
    });
    this._constants = newConstants;
    this.emitter.emit('constantsChange', this._constants);
  }

  /**
   * 添加请求处理器
   */
  @action addRequestHandlers(handlers: Record<string, any>): void {
    this._requestHandlersMap = {
      ...this._requestHandlersMap,
      ...handlers,
    };
    this.emitter.emit('requestHandlersChange', this._requestHandlersMap);
  }

  /**
   * 移除请求处理器
   */
  @action removeRequestHandlers(names: string[]): void {
    const newHandlers = { ...this._requestHandlersMap };
    names.forEach(name => {
      delete newHandlers[name];
    });
    this._requestHandlersMap = newHandlers;
    this.emitter.emit('requestHandlersChange', this._requestHandlersMap);
  }

  /**
   * 添加国际化文本
   */
  @action addI18n(i18n: Record<string, string>): void {
    this._i18n = {
      ...this._i18n,
      ...i18n,
    };
    this.emitter.emit('i18nChange', this._i18n);
  }

  /**
   * 移除国际化文本
   */
  @action removeI18n(keys: string[]): void {
    const newI18n = { ...this._i18n };
    keys.forEach(key => {
      delete newI18n[key];
    });
    this._i18n = newI18n;
    this.emitter.emit('i18nChange', this._i18n);
  }

  /**
   * 添加上下文
   */
  @action addContext(context: Record<string, any>): void {
    this._context = {
      ...this._context,
      ...context,
    };
    this.emitter.emit('contextChange', this._context);
  }

  /**
   * 移除上下文
   */
  @action removeContext(keys: string[]): void {
    const newContext = { ...this._context };
    keys.forEach(key => {
      delete newContext[key];
    });
    this._context = newContext;
    this.emitter.emit('contextChange', this._context);
  }

  /**
   * 添加全局对象
   */
  @action addGlobal(global: any): void {
    this._global = {
      ...this._global,
      ...global,
    };
    this.emitter.emit('globalChange', this._global);
  }

  /**
   * 移除全局对象
   */
  @action removeGlobal(keys: string[]): void {
    const newGlobal = { ...this._global };
    keys.forEach(key => {
      delete newGlobal[key];
    });
    this._global = newGlobal;
    this.emitter.emit('globalChange', this._global);
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
    this._documents.forEach(document => {
      if (document.dispose) {
        document.dispose();
      }
    });
    this._documents.clear();
  }

  /**
   * 是否已销毁
   */
  get isDisposed(): boolean {
    return this._disposed;
  }
}

export default Project;
