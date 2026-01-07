import { ref, type Ref } from 'vue';
import type { ProjectConfig, ProjectState, ProjectEvents } from '../types';

/**
 * Project 类 - 项目管理
 */
export class Project {
  /**
   * 项目配置
   */
  protected config: ProjectConfig;
  
  /**
   * 项目事件
   */
  protected events: ProjectEvents;
  
  /**
   * 项目状态
   */
  protected state: Ref<ProjectState>;
  
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
   * @param config 项目配置
   * @param events 项目事件
   */
  constructor(config: ProjectConfig, events: ProjectEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化状态
    this.state = ref<ProjectState>({
      id: config.id,
      name: config.name,
      version: config.version,
      modified: false,
      saved: false,
      lastSavedAt: undefined,
      loaded: false,
    });
    
    this.log('Project created:', config.id);
  }
  
  /**
   * 初始化项目
   */
  async init(): Promise<void> {
    if (this.initialized) {
      this.warn('Project already initialized:', this.config.id);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Project already destroyed:', this.config.id);
      return;
    }
    
    this.initialized = true;
    
    if (this.events.onInit) {
      this.events.onInit();
    }
    
    this.log('Project initialized:', this.config.id);
  }
  
  /**
   * 销毁项目
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Project not initialized:', this.config.id);
      return;
    }
    
    if (this.destroyed) {
      this.warn('Project already destroyed:', this.config.id);
      return;
    }
    
    this.destroyed = true;
    
    if (this.events.onDestroy) {
      this.events.onDestroy();
    }
    
    this.log('Project destroyed:', this.config.id);
  }
  
  /**
   * 获取项目配置
   */
  getConfig(): ProjectConfig {
    return { ...this.config };
  }
  
  /**
   * 获取项目状态
   */
  getState(): ProjectState {
    return { ...this.state.value };
  }
  
  /**
   * 设置项目配置
   * @param config 项目配置
   */
  setConfig(config: Partial<ProjectConfig>): void {
    const oldConfig = { ...this.config };
    this.config = { ...this.config, ...config };
    
    this.markModified();
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Project config updated:', this.config.id, oldConfig, '->', config);
  }
  
  /**
   * 获取项目 ID
   */
  getId(): string {
    return this.config.id;
  }
  
  /**
   * 获取项目名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 设置项目名称
   * @param name 项目名称
   */
  setName(name: string): void {
    const oldName = this.config.name;
    this.config.name = name;
    this.state.value.name = name;
    
    this.markModified();
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Project name updated:', this.config.id, oldName, '->', name);
  }
  
  /**
   * 获取项目描述
   */
  getDescription(): string | undefined {
    return this.config.description;
  }
  
  /**
   * 设置项目描述
   * @param description 项目描述
   */
  setDescription(description: string): void {
    const oldDescription = this.config.description;
    this.config.description = description;
    
    this.markModified();
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Project description updated:', this.config.id, oldDescription, '->', description);
  }
  
  /**
   * 获取项目版本
   */
  getVersion(): string | undefined {
    return this.config.version;
  }
  
  /**
   * 设置项目版本
   * @param version 项目版本
   */
  setVersion(version: string): void {
    const oldVersion = this.config.version;
    this.config.version = version;
    this.state.value.version = version;
    
    this.markModified();
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Project version updated:', this.config.id, oldVersion, '->', version);
  }
  
  /**
   * 获取项目 Schema
   */
  getSchema(): any | undefined {
    return this.config.schema;
  }
  
  /**
   * 设置项目 Schema
   * @param schema 项目 Schema
   */
  setSchema(schema: any): void {
    const oldSchema = this.config.schema;
    this.config.schema = schema;
    
    this.markModified();
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Project schema updated:', this.config.id);
  }
  
  /**
   * 获取项目创建时间
   */
  getCreatedAt(): Date | undefined {
    return this.config.createdAt;
  }
  
  /**
   * 获取项目更新时间
   */
  getUpdatedAt(): Date | undefined {
    return this.config.updatedAt;
  }
  
  /**
   * 更新项目更新时间
   */
  updateUpdatedAt(): void {
    this.config.updatedAt = new Date();
    this.markModified();
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
    
    this.markModified();
    
    if (this.events.onUpdate) {
      this.events.onUpdate(this.config);
    }
    
    this.log('Project metadata updated:', this.config.id, oldMetadata, '->', metadata);
  }
  
  /**
   * 检查项目是否已修改
   */
  isModified(): boolean {
    return this.state.value.modified;
  }
  
  /**
   * 标记项目为已修改
   */
  markModified(): void {
    if (!this.state.value.modified) {
      this.state.value.modified = true;
      this.state.value.saved = false;
      
      if (this.events.onModify) {
        this.events.onModify(this.config);
      }
    }
  }
  
  /**
   * 标记项目为已保存
   */
  markSaved(): void {
    this.state.value.modified = false;
    this.state.value.saved = true;
    this.state.value.lastSavedAt = new Date();
    this.config.updatedAt = new Date();
  }
  
  /**
   * 检查项目是否已保存
   */
  isSaved(): boolean {
    return this.state.value.saved;
  }
  
  /**
   * 获取最后保存时间
   */
  getLastSavedAt(): Date | undefined {
    return this.state.value.lastSavedAt;
  }
  
  /**
   * 保存项目
   */
  async save(): Promise<void> {
    // 标记为已保存
    this.markSaved();
    
    if (this.events.onSave) {
      this.events.onSave(this.config);
    }
    
    this.log('Project saved:', this.config.id);
  }
  
  /**
   * 加载项目
   */
  async load(): Promise<void> {
    this.state.value.loaded = true;
    
    if (this.events.onLoad) {
      this.events.onLoad(this.config);
    }
    
    this.log('Project loaded:', this.config.id);
  }
  
  /**
   * 检查项目是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查项目是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 检查项目是否已加载
   */
  isLoaded(): boolean {
    return this.state.value.loaded;
  }
  
  /**
   * 重置项目状态
   */
  reset(): void {
    this.state.value = {
      id: this.config.id,
      name: this.config.name,
      version: this.config.version,
      modified: false,
      saved: false,
      lastSavedAt: undefined,
      loaded: false,
    };
    
    this.log('Project reset:', this.config.id);
  }
  
  /**
   * 克隆项目
   * @returns 克隆的项目配置
   */
  clone(): ProjectConfig {
    return {
      ...this.config,
      schema: this.config.schema ? JSON.parse(JSON.stringify(this.config.schema)) : undefined,
      metadata: this.config.metadata ? JSON.parse(JSON.stringify(this.config.metadata)) : undefined,
    };
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[Project:${this.config.id}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[Project:${this.config.id}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[Project:${this.config.id}]`, ...args);
  }
}
