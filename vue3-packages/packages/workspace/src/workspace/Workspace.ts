import { ref, type Ref } from 'vue';
import type { Designer } from '@vue3-lowcode/designer';
import type { 
  WorkspaceConfig, 
  WorkspaceState, 
  WorkspaceEvents,
  ProjectConfig,
  MaterialCollectionConfig
} from '../types';
import { Project } from '../project/Project';
import { MaterialCollection } from '../material/MaterialCollection';

/**
 * Workspace 类 - 工作区管理
 */
export class Workspace {
  /**
   * 工作区配置
   */
  protected config: WorkspaceConfig;
  
  /**
   * 工作区事件
   */
  protected events: WorkspaceEvents;
  
  /**
   * 设计器实例
   */
  protected designer: Designer;
  
  /**
   * 工作区状态
   */
  protected state: Ref<WorkspaceState>;
  
  /**
   * 项目集合
   */
  protected projects: Ref<Map<string, Project>>;
  
  /**
   * 物料集合
   */
  protected materialCollections: Ref<Map<string, MaterialCollection>>;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * 自动保存定时器
   */
  protected autoSaveTimer: number | null = null;
  
  /**
   * 构造函数
   * @param config 工作区配置
   * @param events 工作区事件
   */
  constructor(config: WorkspaceConfig, events: WorkspaceEvents = {}) {
    this.config = config;
    this.events = events;
    this.designer = config.designer;
    
    // 初始化状态
    this.state = ref<WorkspaceState>({
      id: this.generateId(),
      currentProjectId: undefined,
      currentMaterialCollectionId: undefined,
      initialized: false,
      loaded: false,
    });
    
    // 初始化集合
    this.projects = ref(new Map<string, Project>());
    this.materialCollections = ref(new Map<string, MaterialCollection>());
    
    this.log('Workspace created:', this.state.value.id);
  }
  
  /**
   * 初始化工作区
   */
  async init(): Promise<void> {
    if (this.initialized) {
      this.warn('Workspace already initialized');
      return;
    }
    
    if (this.destroyed) {
      this.warn('Workspace already destroyed');
      return;
    }
    
    // 初始化所有项目
    for (const project of this.projects.value.values()) {
      await project.init();
    }
    
    // 初始化所有物料集合
    for (const collection of this.materialCollections.value.values()) {
      await collection.init();
    }
    
    // 设置自动保存
    if (this.config.autoSave) {
      this.setupAutoSave();
    }
    
    this.state.value.initialized = true;
    this.state.value.loaded = true;
    
    if (this.events.onInit) {
      this.events.onInit();
    }
    
    if (this.events.onLoad) {
      this.events.onLoad();
    }
    
    this.log('Workspace initialized:', this.state.value.id);
  }
  
  /**
   * 销毁工作区
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Workspace not initialized');
      return;
    }
    
    if (this.destroyed) {
      this.warn('Workspace already destroyed');
      return;
    }
    
    // 清除自动保存定时器
    if (this.autoSaveTimer !== null) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
    
    // 销毁所有项目
    for (const project of this.projects.value.values()) {
      project.destroy();
    }
    this.projects.value.clear();
    
    // 销毁所有物料集合
    for (const collection of this.materialCollections.value.values()) {
      collection.destroy();
    }
    this.materialCollections.value.clear();
    
    this.destroyed = true;
    
    if (this.events.onDestroy) {
      this.events.onDestroy();
    }
    
    this.log('Workspace destroyed:', this.state.value.id);
  }
  
  /**
   * 获取工作区配置
   */
  getConfig(): WorkspaceConfig {
    return { ...this.config };
  }
  
  /**
   * 设置工作区配置
   * @param config 工作区配置
   */
  setConfig(config: Partial<WorkspaceConfig>): void {
    this.config = { ...this.config, ...config };
    
    // 更新自动保存设置
    if (config.autoSave !== undefined) {
      if (config.autoSave) {
        this.setupAutoSave();
      } else if (this.autoSaveTimer !== null) {
        clearInterval(this.autoSaveTimer);
        this.autoSaveTimer = null;
      }
    }
    
    this.log('Workspace config updated:', config);
  }
  
  /**
   * 获取工作区状态
   */
  getState(): WorkspaceState {
    return { ...this.state.value };
  }
  
  /**
   * 获取工作区 ID
   */
  getId(): string {
    return this.state.value.id;
  }
  
  /**
   * 获取设计器实例
   */
  getDesigner(): Designer {
    return this.designer;
  }
  
  /**
   * 添加项目
   * @param config 项目配置
   * @returns 项目实例
   */
  addProject(config: ProjectConfig): Project {
    if (this.projects.value.has(config.id)) {
      this.warn('Project already exists:', config.id);
      return this.projects.value.get(config.id)!;
    }
    
    const project = new Project(config, {
      onInit: () => {
        // 项目初始化事件处理
      },
      onDestroy: () => {
        // 项目销毁事件处理
      },
      onUpdate: (project) => {
        if (this.events.onProjectUpdate) {
          this.events.onProjectUpdate(project);
        }
      },
      onSave: (project) => {
        if (this.events.onProjectUpdate) {
          this.events.onProjectUpdate(project);
        }
      },
      onLoad: (project) => {
        // 项目加载事件处理
      },
      onModify: (project) => {
        if (this.events.onProjectUpdate) {
          this.events.onProjectUpdate(project);
        }
      },
    });
    
    this.projects.value.set(config.id, project);
    
    if (this.initialized) {
      project.init();
    }
    
    if (this.events.onProjectAdd) {
      this.events.onProjectAdd(config);
    }
    
    this.log('Project added:', config.id);
    return project;
  }
  
  /**
   * 移除项目
   * @param projectId 项目 ID
   */
  removeProject(projectId: string): void {
    const project = this.projects.value.get(projectId);
    if (!project) {
      this.warn('Project not found:', projectId);
      return;
    }
    
    // 如果是当前项目，先切换到其他项目
    if (this.state.value.currentProjectId === projectId) {
      this.state.value.currentProjectId = undefined;
    }
    
    project.destroy();
    this.projects.value.delete(projectId);
    
    if (this.events.onProjectRemove) {
      this.events.onProjectRemove(projectId);
    }
    
    this.log('Project removed:', projectId);
  }
  
  /**
   * 获取项目
   * @param projectId 项目 ID
   * @returns 项目实例
   */
  getProject(projectId: string): Project | undefined {
    return this.projects.value.get(projectId);
  }
  
  /**
   * 获取所有项目
   * @returns 项目集合
   */
  getProjects(): Map<string, Project> {
    return new Map(this.projects.value);
  }
  
  /**
   * 切换项目
   * @param projectId 项目 ID
   */
  switchProject(projectId: string): void {
    const project = this.projects.value.get(projectId);
    if (!project) {
      this.warn('Project not found:', projectId);
      return;
    }
    
    const oldProjectId = this.state.value.currentProjectId;
    this.state.value.currentProjectId = projectId;
    
    if (this.events.onProjectSwitch) {
      this.events.onProjectSwitch(projectId);
    }
    
    this.log('Project switched:', oldProjectId, '->', projectId);
  }
  
  /**
   * 获取当前项目
   * @returns 当前项目实例
   */
  getCurrentProject(): Project | undefined {
    if (!this.state.value.currentProjectId) {
      return undefined;
    }
    return this.projects.value.get(this.state.value.currentProjectId);
  }
  
  /**
   * 添加物料集合
   * @param config 物料集合配置
   * @returns 物料集合实例
   */
  addMaterialCollection(config: MaterialCollectionConfig): MaterialCollection {
    if (this.materialCollections.value.has(config.id)) {
      this.warn('MaterialCollection already exists:', config.id);
      return this.materialCollections.value.get(config.id)!;
    }
    
    const collection = new MaterialCollection(config, {
      onInit: () => {
        // 物料集合初始化事件处理
      },
      onDestroy: () => {
        // 物料集合销毁事件处理
      },
      onMaterialAdd: (material) => {
        if (this.events.onMaterialAdd) {
          this.events.onMaterialAdd(material);
        }
      },
      onMaterialRemove: (materialId) => {
        if (this.events.onMaterialRemove) {
          this.events.onMaterialRemove(materialId);
        }
      },
      onMaterialUpdate: (material) => {
        if (this.events.onMaterialUpdate) {
          this.events.onMaterialUpdate(material);
        }
      },
    });
    
    this.materialCollections.value.set(config.id, collection);
    
    if (this.initialized) {
      collection.init();
    }
    
    if (this.events.onMaterialCollectionAdd) {
      this.events.onMaterialCollectionAdd(config);
    }
    
    this.log('MaterialCollection added:', config.id);
    return collection;
  }
  
  /**
   * 移除物料集合
   * @param collectionId 物料集合 ID
   */
  removeMaterialCollection(collectionId: string): void {
    const collection = this.materialCollections.value.get(collectionId);
    if (!collection) {
      this.warn('MaterialCollection not found:', collectionId);
      return;
    }
    
    // 如果是当前物料集合，先切换到其他集合
    if (this.state.value.currentMaterialCollectionId === collectionId) {
      this.state.value.currentMaterialCollectionId = undefined;
    }
    
    collection.destroy();
    this.materialCollections.value.delete(collectionId);
    
    if (this.events.onMaterialCollectionRemove) {
      this.events.onMaterialCollectionRemove(collectionId);
    }
    
    this.log('MaterialCollection removed:', collectionId);
  }
  
  /**
   * 获取物料集合
   * @param collectionId 物料集合 ID
   * @returns 物料集合实例
   */
  getMaterialCollection(collectionId: string): MaterialCollection | undefined {
    return this.materialCollections.value.get(collectionId);
  }
  
  /**
   * 获取所有物料集合
   * @returns 物料集合集合
   */
  getMaterialCollections(): Map<string, MaterialCollection> {
    return new Map(this.materialCollections.value);
  }
  
  /**
   * 切换物料集合
   * @param collectionId 物料集合 ID
   */
  switchMaterialCollection(collectionId: string): void {
    const collection = this.materialCollections.value.get(collectionId);
    if (!collection) {
      this.warn('MaterialCollection not found:', collectionId);
      return;
    }
    
    const oldCollectionId = this.state.value.currentMaterialCollectionId;
    this.state.value.currentMaterialCollectionId = collectionId;
    
    this.log('MaterialCollection switched:', oldCollectionId, '->', collectionId);
  }
  
  /**
   * 获取当前物料集合
   * @returns 当前物料集合实例
   */
  getCurrentMaterialCollection(): MaterialCollection | undefined {
    if (!this.state.value.currentMaterialCollectionId) {
      return undefined;
    }
    return this.materialCollections.value.get(this.state.value.currentMaterialCollectionId);
  }
  
  /**
   * 保存工作区
   */
  async save(): Promise<void> {
    // 保存所有项目
    for (const project of this.projects.value.values()) {
      await project.save();
    }
    
    if (this.events.onSave) {
      this.events.onSave();
    }
    
    this.log('Workspace saved:', this.state.value.id);
  }
  
  /**
   * 加载工作区
   */
  async load(): Promise<void> {
    // 加载所有项目
    for (const project of this.projects.value.values()) {
      await project.load();
    }
    
    this.state.value.loaded = true;
    
    if (this.events.onLoad) {
      this.events.onLoad();
    }
    
    this.log('Workspace loaded:', this.state.value.id);
  }
  
  /**
   * 检查工作区是否已初始化
   */
  isInitialized(): boolean {
    return this.state.value.initialized;
  }
  
  /**
   * 检查工作区是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 设置自动保存
   */
  protected setupAutoSave(): void {
    if (this.autoSaveTimer !== null) {
      clearInterval(this.autoSaveTimer);
    }
    
    const interval = this.config.autoSaveInterval || 30000; // 默认 30 秒
    this.autoSaveTimer = window.setInterval(() => {
      this.save();
    }, interval);
    
    this.log('AutoSave setup:', interval, 'ms');
  }
  
  /**
   * 生成唯一 ID
   */
  protected generateId(): string {
    return `workspace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[Workspace:${this.state.value.id}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[Workspace:${this.state.value.id}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[Workspace:${this.state.value.id}]`, ...args);
  }
}
