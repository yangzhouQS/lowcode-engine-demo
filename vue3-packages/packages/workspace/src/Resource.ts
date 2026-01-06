import { ref, reactive, computed, type Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';

/**
 * Resource 接口定义
 */
export interface IResource {
  /**
   * 获取资源 ID
   */
  get id(): string;

  /**
   * 获取资源名称
   */
  get name(): string;

  /**
   * 获取资源类型
   */
  get type(): string;

  /**
   * 获取资源数据
   */
  get data(): any;

  /**
   * 设置资源数据
   */
  set data(value: any);

  /**
   * 获取资源元数据
   */
  get meta(): any;

  /**
   * 设置资源元数据
   */
  set meta(value: any);

  /**
   * 加载资源
   */
  load(): Promise<void>;

  /**
   * 保存资源
   */
  save(): Promise<void>;

  /**
   * 销毁资源
   */
  destroy(): void;

  /**
   * 监听资源变化
   */
  onChange(fn: (data: any) => void): () => void;
}

/**
 * Resource 类实现
 */
export class Resource implements IResource {
  private eventBus = useEventBus();

  /**
   * 资源 ID
   */
  private _id: string;

  /**
   * 资源名称
   */
  private _name: Ref<string>;

  /**
   * 资源类型
   */
  private _type: Ref<string>;

  /**
   * 资源数据
   */
  private _data: Ref<any>;

  /**
   * 资源元数据
   */
  private _meta: Ref<any>;

  /**
   * 是否已加载
   */
  private _loaded: Ref<boolean> = ref(false);

  /**
   * 是否正在加载
   */
  private _loading: Ref<boolean> = ref(false);

  constructor(id: string, name: string, type: string, data?: any, meta?: any) {
    this._id = id;
    this._name = ref(name);
    this._type = ref(type);
    this._data = ref(data);
    this._meta = ref(meta || {});
  }

  /**
   * 获取资源 ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * 获取资源名称
   */
  get name(): string {
    return this._name.value;
  }

  /**
   * 设置资源名称
   */
  set name(value: string) {
    this._name.value = value;
    this.eventBus.emit('change', { name: value });
  }

  /**
   * 获取资源类型
   */
  get type(): string {
    return this._type.value;
  }

  /**
   * 设置资源类型
   */
  set type(value: string) {
    this._type.value = value;
    this.eventBus.emit('change', { type: value });
  }

  /**
   * 获取资源数据
   */
  get data(): any {
    return this._data.value;
  }

  /**
   * 设置资源数据
   */
  set data(value: any) {
    this._data.value = value;
    this.eventBus.emit('change', { data: value });
  }

  /**
   * 获取资源元数据
   */
  get meta(): any {
    return this._meta.value;
  }

  /**
   * 设置资源元数据
   */
  set meta(value: any) {
    this._meta.value = value;
    this.eventBus.emit('change', { meta: value });
  }

  /**
   * 是否已加载
   */
  get loaded(): boolean {
    return this._loaded.value;
  }

  /**
   * 是否正在加载
   */
  get loading(): boolean {
    return this._loading.value;
  }

  /**
   * 加载资源
   */
  async load(): Promise<void> {
    if (this._loading.value) {
      return;
    }

    this._loading.value = true;

    try {
      // 这里可以添加具体的加载逻辑
      // 例如从服务器获取数据
      // this._data.value = await fetchResourceData(this._id);
      
      this._loaded.value = true;
      this.eventBus.emit('loaded', this._data.value);
    } catch (error) {
      this.eventBus.emit('error', error);
      throw error;
    } finally {
      this._loading.value = false;
    }
  }

  /**
   * 保存资源
   */
  async save(): Promise<void> {
    if (this._loading.value) {
      return;
    }

    this._loading.value = true;

    try {
      // 这里可以添加具体的保存逻辑
      // 例如将数据保存到服务器
      // await saveResourceData(this._id, this._data.value);
      
      this.eventBus.emit('saved', this._data.value);
    } catch (error) {
      this.eventBus.emit('error', error);
      throw error;
    } finally {
      this._loading.value = false;
    }
  }

  /**
   * 销毁资源
   */
  destroy(): void {
    this.eventBus.emit('destroy');
    this.eventBus.clear();
    this._loaded.value = false;
    this._loading.value = false;
  }

  /**
   * 监听资源变化
   */
  onChange(fn: (data: any) => void): () => void {
    this.eventBus.on('change', fn);
    return () => {
      this.eventBus.off('change', fn);
    };
  }

  /**
   * 监听资源加载完成
   */
  onLoaded(fn: (data: any) => void): () => void {
    if (this._loaded.value) {
      fn(this._data.value);
      return () => {};
    }
    this.eventBus.on('loaded', fn);
    return () => {
      this.eventBus.off('loaded', fn);
    };
  }

  /**
   * 监听资源保存完成
   */
  onSaved(fn: (data: any) => void): () => void {
    this.eventBus.on('saved', fn);
    return () => {
      this.eventBus.off('saved', fn);
    };
  }

  /**
   * 监听资源错误
   */
  onError(fn: (error: any) => void): () => void {
    this.eventBus.on('error', fn);
    return () => {
      this.eventBus.off('error', fn);
    };
  }

  /**
   * 监听资源销毁
   */
  onDestroy(fn: () => void): () => void {
    this.eventBus.on('destroy', fn);
    return () => {
      this.eventBus.off('destroy', fn);
    };
  }
}
