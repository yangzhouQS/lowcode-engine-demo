import { ref, reactive, computed, type Ref } from 'vue';
import type { IDesigner } from '@vue3-lowcode/types';
import type { IDocumentModel } from '@vue3-lowcode/designer';
import type { IProjectSchema, IRootSchema, IComponentsMap } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';

/**
 * Workspace 接口定义
 */
export interface IWorkspace {
  /**
   * 获取设计器实例
   */
  get designer(): IDesigner;

  /**
   * 获取模拟器实例
   */
  get simulator(): any | null;

  /**
   * 获取当前文档
   */
  get currentDocument(): IDocumentModel | null | undefined;

  /**
   * 获取所有文档
   */
  get documents(): IDocumentModel[];

  /**
   * 获取国际化配置
   */
  get i18n(): {
    [local: string]: {
      [key: string]: any;
    };
  };

  /**
   * 挂载模拟器
   */
  mountSimulator(simulator: any): void;

  /**
   * 打开文档
   */
  open(doc?: string | IDocumentModel | IRootSchema): IDocumentModel | null;

  /**
   * 根据文件名获取文档
   */
  getDocumentByFileName(fileName: string): IDocumentModel | null;

  /**
   * 创建文档
   */
  createDocument(data?: IRootSchema): IDocumentModel;

  /**
   * 加载项目数据
   */
  load(schema?: IProjectSchema, autoOpen?: boolean | string): void;

  /**
   * 获取项目 schema
   */
  getSchema(stage?: string): IProjectSchema;

  /**
   * 获取文档
   */
  getDocument(id: string): IDocumentModel | null;

  /**
   * 监听当前文档变化
   */
  onCurrentDocumentChange(fn: (doc: IDocumentModel) => void): () => void;

  /**
   * 监听模拟器就绪
   */
  onSimulatorReady(fn: (args: any) => void): () => void;

  /**
   * 监听渲染器就绪
   */
  onRendererReady(fn: () => void): () => void;

  /**
   * 设置项目数据
   */
  set<T extends keyof IProjectSchema>(key: T, value: IProjectSchema[T]): void;
  set(key: string, value: unknown): void;

  /**
   * 获取项目数据
   */
  get<T extends keyof IProjectSchema>(key: T): IProjectSchema[T];
  get<T>(key: string): T;
  get(key: string): unknown;

  /**
   * 检查独占状态
   */
  checkExclusive(activeDoc: any): void;

  /**
   * 设置渲染器就绪
   */
  setRendererReady(renderer: any): void;
}

/**
 * Workspace 类实现
 */
export class Workspace implements IWorkspace {
  private eventBus = useEventBus();

  /**
   * 文档列表
   */
  private documentsRef: Ref<IDocumentModel[]> = ref([]);

  /**
   * 项目数据
   */
  private data: IProjectSchema = {
    version: '1.0.0',
    componentsMap: [],
    componentsTree: [],
    i18n: {},
  };

  /**
   * 模拟器实例
   */
  private _simulator?: any;

  /**
   * 渲染器是否就绪
   */
  private isRendererReady: boolean = false;

  /**
   * 配置
   */
  private _config: any = reactive({});

  /**
   * 国际化配置
   */
  private _i18n: any = reactive({});

  /**
   * 文档映射表
   */
  private documentsMap = new Map<string, any>();

  constructor(readonly designer: IDesigner, schema?: IProjectSchema, readonly viewName = 'global') {
    this.load(schema);
  }

  /**
   * 获取设计器实例
   */
  get designer(): IDesigner {
    return this._designer;
  }

  /**
   * 获取模拟器实例
   */
  get simulator(): any | null {
    return this._simulator || null;
  }

  /**
   * 获取当前文档
   */
  get currentDocument(): IDocumentModel | null | undefined {
    return computed(() => this.documentsRef.value.find((doc) => doc.active)).value;
  }

  /**
   * 获取所有文档
   */
  get documents(): IDocumentModel[] {
    return this.documentsRef.value;
  }

  /**
   * 获取国际化配置
   */
  get i18n(): {
    [local: string]: {
      [key: string]: any;
    };
  } {
    return this._i18n;
  }

  /**
   * 获取配置
   */
  get config(): any {
    return this._config;
  }

  set config(value: any) {
    Object.assign(this._config, value);
  }

  /**
   * 获取组件映射表
   */
  private getComponentsMap(): IComponentsMap {
    return this.documentsRef.value.reduce<IComponentsMap>(
      (componentsMap: IComponentsMap, curDoc: IDocumentModel): IComponentsMap => {
        const curComponentsMap = curDoc.getComponentsMap();
        if (Array.isArray(curComponentsMap)) {
          curComponentsMap.forEach((item) => {
            const found = componentsMap.find((eItem) => {
              if (
                eItem.package &&
                item.package &&
                eItem.componentName === item.componentName
              ) {
                return true;
              } else if (eItem.componentName === item.componentName) {
                return true;
              }
              return false;
            });
            if (found) return;
            componentsMap.push(item);
          });
        }
        return componentsMap;
      },
      [] as IComponentsMap
    );
  }

  /**
   * 获取项目 schema
   */
  getSchema(stage: string = 'save'): IProjectSchema {
    return {
      ...this.data,
      componentsMap: this.getComponentsMap(),
      componentsTree: this.documentsRef.value
        .filter((doc) => !doc.isBlank())
        .map((doc) => doc.export(stage) || ({} as IRootSchema)),
      i18n: this.i18n,
    };
  }

  /**
   * 设置项目 schema
   */
  setSchema(schema?: IProjectSchema) {
    const doc = this.documentsRef.value.find((doc) => doc.active);
    doc && schema?.componentsTree[0] && doc.import(schema?.componentsTree[0]);
    this.simulator?.rerender();
  }

  /**
   * 加载项目数据
   */
  load(schema?: IProjectSchema, autoOpen?: boolean | string) {
    this.unload();
    // 加载新文档
    this.data = {
      version: '1.0.0',
      componentsMap: [],
      componentsTree: [],
      i18n: {},
      ...schema,
    };
    this.config = schema?.config || this.config;
    this.i18n = schema?.i18n || this.i18n;

    if (autoOpen) {
      if (autoOpen === true) {
        // 自动打开第一个文档或打开空白页
        const documentInstances = this.data.componentsTree.map((data) => this.createDocument(data));
        // 暂时先读 config tabBar 里的值，后面看整个 layout 结构是否能作为引擎规范
        if (this.config?.layout?.props?.tabBar?.items?.length > 0) {
          // slice(1) 这个贼不雅，默认任务 fileName 是类'/fileName'的形式
          documentInstances
            .find((i) => i.fileName === this.config.layout.props.tabBar.items[0].path?.slice(1))
            ?.open();
        } else {
          documentInstances[0]?.open();
        }
      } else {
        // auto open should be string of fileName
        this.open(autoOpen);
      }
    }
  }

  /**
   * 卸载当前项目数据
   */
  unload() {
    if (this.documentsRef.value.length < 1) {
      return;
    }
    for (let i = this.documentsRef.value.length - 1; i >= 0; i--) {
      this.documentsRef.value[i].remove();
    }
  }

  /**
   * 移除文档
   */
  removeDocument(doc: IDocumentModel) {
    const index = this.documentsRef.value.indexOf(doc);
    if (index < 0) {
      return;
    }
    this.documentsRef.value.splice(index, 1);
    this.documentsMap.delete(doc.id);
  }

  /**
   * 设置项目数据
   */
  set<T extends keyof IProjectSchema>(key: T, value: IProjectSchema[T]): void;
  set(key: string, value: unknown): void;
  set(key: string, value: unknown): void {
    if (key === 'config') {
      this.config = value;
    }
    if (key === 'i18n') {
      this.i18n = value;
    }
    Object.assign(this.data, { [key]: value });
  }

  /**
   * 获取项目数据
   */
  get<T extends keyof IProjectSchema>(key: T): IProjectSchema[T];
  get<T>(key: string): T;
  get(key: string): unknown;
  get(key: string): any {
    if (key === 'config') {
      return this.config;
    }
    if (key === 'i18n') {
      return this.i18n;
    }
    return Reflect.get(this.data, key);
  }

  /**
   * 获取文档
   */
  getDocument(id: string): IDocumentModel | null {
    // 此处不能使用 this.documentsMap.get(id)，因为在乐高 rollback 场景，document.id 会被改成其他值
    return this.documentsRef.value.find((doc) => doc.id === id) || null;
  }

  /**
   * 根据文件名获取文档
   */
  getDocumentByFileName(fileName: string): IDocumentModel | null {
    return this.documentsRef.value.find((doc) => doc.fileName === fileName) || null;
  }

  /**
   * 创建文档
   */
  createDocument(data?: IRootSchema): IDocumentModel {
    const doc = new (this.designer as any).DocumentModel(this, data || this?.data?.componentsTree?.[0]);
    this.documentsRef.value.push(doc);
    this.documentsMap.set(doc.id, doc);
    return doc;
  }

  /**
   * 打开文档
   */
  open(doc?: string | IDocumentModel | IRootSchema): IDocumentModel | null {
    if (!doc) {
      const got = this.documentsRef.value.find((item) => item.isBlank());
      if (got) {
        return got.open();
      }
      doc = this.createDocument();
      return doc.open();
    }
    if (typeof doc === 'string' || typeof doc === 'number') {
      const got = this.documentsRef.value.find(
        (item) => item.fileName === String(doc) || String(item.id) === String(doc)
      );
      if (got) {
        return got.open();
      }

      const data = this.data.componentsTree.find((data) => data.fileName === String(doc));
      if (data) {
        doc = this.createDocument(data);
        return doc.open();
      }

      return null;
    } else if ((doc as any).isDocumentModel) {
      return doc.open();
    }

    doc = this.createDocument(doc);
    return doc.open();
  }

  /**
   * 检查独占状态
   */
  checkExclusive(activeDoc: any) {
    this.documentsRef.value.forEach((doc) => {
      if (doc !== activeDoc) {
        doc.suspense();
      }
    });
    this.eventBus.emit('current-document.change', activeDoc);
  }

  /**
   * 关闭其他文档
   */
  closeOthers(opened: any) {
    this.documentsRef.value.forEach((doc) => {
      if (doc !== opened) {
        doc.close();
      }
    });
  }

  /**
   * 挂载模拟器
   */
  mountSimulator(simulator: any) {
    this._simulator = simulator;
    this.eventBus.emit('lowcode_engine_simulator_ready', simulator);
  }

  /**
   * 设置渲染器就绪
   */
  setRendererReady(renderer: any) {
    this.isRendererReady = true;
    this.eventBus.emit('lowcode_engine_renderer_ready', renderer);
  }

  /**
   * 监听模拟器就绪
   */
  onSimulatorReady(fn: (args: any) => void): () => void {
    if (this._simulator) {
      fn(this._simulator);
      return () => {};
    }
    this.eventBus.on('lowcode_engine_simulator_ready', fn);
    return () => {
      this.eventBus.off('lowcode_engine_simulator_ready', fn);
    };
  }

  /**
   * 监听渲染器就绪
   */
  onRendererReady(fn: () => void): () => void {
    if (this.isRendererReady) {
      fn();
    }
    this.eventBus.on('lowcode_engine_renderer_ready', fn);
    return () => {
      this.eventBus.off('lowcode_engine_renderer_ready', fn);
    };
  }

  /**
   * 监听当前文档变化
   */
  onCurrentDocumentChange(fn: (doc: IDocumentModel) => void): () => void {
    this.eventBus.on('current-document.change', fn);
    return () => {
      this.eventBus.off('current-document.change', fn);
    };
  }
}
