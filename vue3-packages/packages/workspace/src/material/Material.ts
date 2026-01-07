import { ref, type Ref } from 'vue';
import type { MaterialConfig, MaterialState, MaterialEvents } from '../types';

/**
 * Material 类 - 物料管理
 */
export class Material {
  /**
   * 物料配置
   */
  protected config: MaterialConfig;
  
  /**
   * 物料事件
   */
  protected events: MaterialEvents;
  
  /**
   * 物料状态
   */
  protected state: Ref<MaterialState>;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * 构造函数
   * @param config 物料配置
   * @param events 物料事件
   */
  constructor(config: MaterialConfig, events: MaterialEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化状态
    this.state = ref<MaterialState>({
      id: config.id,
      name: config.name,
      type: config.type,
      available: config.available !== undefined ? config.available : true,
      loaded: false,
    });
    
    this.log('Material created:', config.id);
  }
  
  /**
   * 初始化物料
   */
  async init(): Promise<void> {
    if (this.initialized) {
      this.warn('Material already initialized:', this.config.id);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Material already destroyed:', this.config.id);
      return;
    }
    
    this.initialized = true;
    
    if (this.events.onInit) {
      this.events.onInit();
    }
    
    this.log('Material initialized:', this.config.id);
  }
  
  /**
   * 销毁物料
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Material not initialized:', this.config.id);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Material already destroyed:', this.config.id);
      return;
    }
    
    this.destroyed = true;
    
    if (this.events.onDestroy) {
      this.events.onDestroy();
    }
    
    this.log('Material destroyed:', this.config.id);
  }
  
  /**
   * 获取物料配置
   */
  getConfig(): MaterialConfig {
    return { ...this.config };
  }
  
  /**
   * 获取物料状态
   */
  getState(): MaterialState {
    return { ...this.state.value };
  }
  
  /**
   * 设置物料配置
   * @param config 物料配置
   */
  setConfig(config: Partial<MaterialConfig>): void {
    const oldConfig = { ...this.config };
    this.config = { ...this.config, ...config };
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material config updated:', this.config.id, oldConfig, '->', config);
  }
  
  /**
   * 获取物料 ID
   */
  getId(): string {
    return this.config.id;
  }
  
  /**
   * 获取物料名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 设置物料名称
   * @param name 物料名称
   */
  setName(name: string): void {
    const oldName = this.config.name;
    this.config.name = name;
    this.state.value.name = name;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material name updated:', this.config.id, oldName, '->', name);
  }
  
  /**
   * 获取物料描述
   */
  getDescription(): string | undefined {
    return this.config.description;
  }
  
  /**
   * 设置物料描述
   * @param description 物料描述
   */
  setDescription(description: string): void {
    const oldDescription = this.config.description;
    this.config.description = description;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material description updated:', this.config.id, oldDescription, '->', description);
  }
  
  /**
   * 获取物料类型
   */
  getType(): string {
    return this.config.type;
  }
  
  /**
   * 获取物料分类
   */
  getCategory(): string | undefined {
    return this.config.category;
  }
  
  /**
   * 设置物料分类
   * @param category 物料分类
   */
  setCategory(category: string): void {
    const oldCategory = this.config.category;
    this.config.category = category;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material category updated:', this.config.id, oldCategory, '->', category);
  }
  
  /**
   * 获取物料图标
   */
  getIcon(): string | undefined {
    return this.config.icon;
  }
  
  /**
   * 设置物料图标
   * @param icon 物料图标
   */
  setIcon(icon: string): void {
    const oldIcon = this.config.icon;
    this.config.icon = icon;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material icon updated:', this.config.id, oldIcon, '->', icon);
  }
  
  /**
   * 获取物料缩略图
   */
  getThumbnail(): string | undefined {
    return this.config.thumbnail;
  }
  
  /**
   * 设置物料缩略图
   * @param thumbnail 物料缩略图
   */
  setThumbnail(thumbnail: string): void {
    const oldThumbnail = this.config.thumbnail;
    this.config.thumbnail = thumbnail;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material thumbnail updated:', this.config.id);
  }
  
  /**
   * 获取物料 Schema
   */
  getSchema(): any | undefined {
    return this.config.schema;
  }
  
  /**
   * 设置物料 Schema
   * @param schema 物料 Schema
   */
  setSchema(schema: any): void {
    const oldSchema = this.config.schema;
    this.config.schema = schema;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material schema updated:', this.config.id);
  }
  
  /**
   * 获取物料组件
   */
  getComponent(): any | undefined {
    return this.config.component;
  }
  
  /**
   * 设置物料组件
   * @param component 物料组件
   */
  setComponent(component: any): void {
    const oldComponent = this.config.component;
    this.config.component = component;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material component updated:', this.config.id);
  }
  
  /**
   * 获取物料属性
   */
  getProps(): Record<string, any> | undefined {
    return this.config.props;
  }
  
  /**
   * 设置物料属性
   * @param props 物料属性
   */
  setProps(props: Record<string, any>): void {
    const oldProps = this.config.props;
    this.config.props = props;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material props updated:', this.config.id, oldProps, '->', props);
  }
  
  /**
   * 检查物料是否可用
   */
  isAvailable(): boolean {
    return this.state.value.available;
  }
  
  /**
   * 设置物料可用性
   * @param available 是否可用
   */
  setAvailable(available: boolean): void {
    const oldAvailable = this.state.value.available;
    this.state.value.available = available;
    this.config.available = available;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material available updated:', this.config.id, oldAvailable, '->', available);
  }
  
  /**
   * 获取物料标签
   */
  getTags(): string[] | undefined {
    return this.config.tags;
  }
  
  /**
   * 设置物料标签
   * @param tags 物料标签
   */
  setTags(tags: string[]): void {
    const oldTags = this.config.tags;
    this.config.tags = tags;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material tags updated:', this.config.id, oldTags, '->', tags);
  }
  
  /**
   * 获取物料依赖
   */
  getDependencies(): string[] | undefined {
    return this.config.dependencies;
  }
  
  /**
   * 设置物料依赖
   * @param dependencies 物料依赖
   */
  setDependencies(dependencies: string[]): void {
    const oldDependencies = this.config.dependencies;
    this.config.dependencies = dependencies;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material dependencies updated:', this.config.id, oldDependencies, '->', dependencies);
  }
  
  /**
   * 获取自定义数据
   */
  getMetadata(): Record<string, any> | undefined {
    return this.config.metadata;
  }
  
  /**
   * 设置自定义数据
   * @param metadata 自定义数据
   */
  setMetadata(metadata: Record<string, any>): void {
    const oldMetadata = this.config.metadata;
    this.config.metadata = metadata;
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Material metadata updated:', this.config.id, oldMetadata, '->', metadata);
  }
  
  /**
   * 使用物料
   */
  use(): void {
    if (this.events.onUse) {
      this.events.onUse(this.config);
    }
    
    this.log('Material used:', this.config.id);
  }
  
  /**
   * 检查物料是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查物料是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 检查物料是否已加载
   */
  isLoaded(): boolean {
    return this.state.value.loaded;
  }
  
  /**
   * 加载物料
   */
  async load(): Promise<void> {
    this.state.value.loaded = true;
    
    if (this.events.onLoad) {
      this.events.onLoad(this.config);
    }
    
    this.log('Material loaded:', this.config.id);
  }
  
  /**
   * 重置物料状态
   */
  reset(): void {
    this.state.value = {
      id: this.config.id,
      name: this.config.name,
      type: this.config.type,
      available: this.config.available !== undefined ? this.config.available : true,
      loaded: false,
    };
    
    this.log('Material reset:', this.config.id);
  }
  
  /**
   * 克隆物料
   * @returns 克隆的物料配置
   */
  clone(): MaterialConfig {
    return {
      ...this.config,
      schema: this.config.schema ? JSON.parse(JSON.stringify(this.config.schema)) : undefined,
      props: this.config.props ? JSON.parse(JSON.stringify(this.config.props)) : undefined,
      metadata: this.config.metadata ? JSON.parse(JSON.stringify(this.config.metadata)) : undefined,
    };
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[Material:${this.config.id}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[Material:${this.config.id}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[Material:${this.config.id}]`, ...args);
  }
}
