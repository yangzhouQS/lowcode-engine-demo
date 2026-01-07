import type { Designer } from '@vue3-lowcode/designer';

/**
 * 工作区配置接口
 */
export interface WorkspaceConfig {
  /**
   * 设计器实例
   */
  designer: Designer;
  
  /**
   * 工作区名称
   */
  name?: string;
  
  /**
   * 工作区描述
   */
  description?: string;
  
  /**
   * 是否启用自动保存
   */
  autoSave?: boolean;
  
  /**
   * 自动保存间隔（毫秒）
   */
  autoSaveInterval?: number;
  
  /**
   * 自定义数据
   */
  metadata?: Record<string, any>;
}

/**
 * 项目配置接口
 */
export interface ProjectConfig {
  /**
   * 项目 ID
   */
  id: string;
  
  /**
   * 项目名称
   */
  name: string;
  
  /**
   * 项目描述
   */
  description?: string;
  
  /**
   * 项目版本
   */
  version?: string;
  
  /**
   * 项目 Schema
   */
  schema?: any;
  
  /**
   * 项目创建时间
   */
  createdAt?: Date;
  
  /**
   * 项目更新时间
   */
  updatedAt?: Date;
  
  /**
   * 自定义数据
   */
  metadata?: Record<string, any>;
}

/**
 * 物料配置接口
 */
export interface MaterialConfig {
  /**
   * 物料 ID
   */
  id: string;
  
  /**
   * 物料名称
   */
  name: string;
  
  /**
   * 物料描述
   */
  description?: string;
  
  /**
   * 物料类型
   */
  type: 'component' | 'block' | 'template' | 'page';
  
  /**
   * 物料分类
   */
  category?: string;
  
  /**
   * 物料图标
   */
  icon?: string;
  
  /**
   * 物料缩略图
   */
  thumbnail?: string;
  
  /**
   * 物料 Schema
   */
  schema?: any;
  
  /**
   * 物料组件
   */
  component?: any;
  
  /**
   * 物料属性
   */
  props?: Record<string, any>;
  
  /**
   * 物料是否可用
   */
  available?: boolean;
  
  /**
   * 物料标签
   */
  tags?: string[];
  
  /**
   * 物料依赖
   */
  dependencies?: string[];
  
  /**
   * 自定义数据
   */
  metadata?: Record<string, any>;
}

/**
 * 物料集合配置接口
 */
export interface MaterialCollectionConfig {
  /**
   * 集合 ID
   */
  id: string;
  
  /**
   * 集合名称
   */
  name: string;
  
  /**
   * 集合描述
   */
  description?: string;
  
  /**
   * 集合物料列表
   */
  materials: MaterialConfig[];
  
  /**
   * 自定义数据
   */
  metadata?: Record<string, any>;
}

/**
 * 工作区状态接口
 */
export interface WorkspaceState {
  /**
   * 工作区 ID
   */
  id: string;
  
  /**
   * 当前项目 ID
   */
  currentProjectId?: string;
  
  /**
   * 当前物料集合 ID
   */
  currentMaterialCollectionId?: string;
  
  /**
   * 是否已初始化
   */
  initialized: boolean;
  
  /**
   * 是否已加载
   */
  loaded: boolean;
}

/**
 * 项目状态接口
 */
export interface ProjectState {
  /**
   * 项目 ID
   */
  id: string;
  
  /**
   * 项目名称
   */
  name: string;
  
  /**
   * 项目版本
   */
  version?: string;
  
  /**
   * 是否已修改
   */
  modified: boolean;
  
  /**
   * 是否已保存
   */
  saved: boolean;
  
  /**
   * 最后保存时间
   */
  lastSavedAt?: Date;
  
  /**
   * 是否已加载
   */
  loaded: boolean;
}

/**
 * 物料状态接口
 */
export interface MaterialState {
  /**
   * 物料 ID
   */
  id: string;
  
  /**
   * 物料名称
   */
  name: string;
  
  /**
   * 物料类型
   */
  type: string;
  
  /**
   * 是否可用
   */
  available: boolean;
  
  /**
   * 是否已加载
   */
  loaded: boolean;
}

/**
 * 工作区事件接口
 */
export interface WorkspaceEvents {
  /**
   * 初始化事件
   */
  onInit?: () => void;
  
  /**
   * 销毁事件
   */
  onDestroy?: () => void;
  
  /**
   * 项目添加事件
   */
  onProjectAdd?: (project: ProjectConfig) => void;
  
  /**
   * 项目移除事件
   */
  onProjectRemove?: (projectId: string) => void;
  
  /**
   * 项目更新事件
   */
  onProjectUpdate?: (project: ProjectConfig) => void;
  
  /**
   * 项目切换事件
   */
  onProjectSwitch?: (projectId: string) => void;
  
  /**
   * 物料添加事件
   */
  onMaterialAdd?: (material: MaterialConfig) => void;
  
  /**
   * 物料移除事件
   */
  onMaterialRemove?: (materialId: string) => void;
  
  /**
   * 物料更新事件
   */
  onMaterialUpdate?: (material: MaterialConfig) => void;
  
  /**
   * 物料集合添加事件
   */
  onMaterialCollectionAdd?: (collection: MaterialCollectionConfig) => void;
  
  /**
   * 物料集合移除事件
   */
  onMaterialCollectionRemove?: (collectionId: string) => void;
  
  /**
   * 物料集合更新事件
   */
  onMaterialCollectionUpdate?: (collection: MaterialCollectionConfig) => void;
  
  /**
   * 保存事件
   */
  onSave?: () => void;
  
  /**
   * 加载事件
   */
  onLoad?: () => void;
}

/**
 * 项目事件接口
 */
export interface ProjectEvents {
  /**
   * 初始化事件
   */
  onInit?: () => void;
  
  /**
   * 销毁事件
   */
  onDestroy?: () => void;
  
  /**
   * 更新事件
   */
  onUpdate?: (project: ProjectConfig) => void;
  
  /**
   * 保存事件
   */
  onSave?: (project: ProjectConfig) => void;
  
  /**
   * 加载事件
   */
  onLoad?: (project: ProjectConfig) => void;
  
  /**
   * 修改事件
   */
  onModify?: (project: ProjectConfig) => void;
}

/**
 * 物料事件接口
 */
export interface MaterialEvents {
  /**
   * 初始化事件
   */
  onInit?: () => void;
  
  /**
   * 销毁事件
   */
  onDestroy?: () => void;
  
  /**
   * 更新事件
   */
  onUpdate?: (material: MaterialConfig) => void;
  
  /**
   * 加载事件
   */
  onLoad?: (material: MaterialConfig) => void;
  
  /**
   * 使用事件
   */
  onUse?: (material: MaterialConfig) => void;
}

/**
 * 物料集合事件接口
 */
export interface MaterialCollectionEvents {
  /**
   * 初始化事件
   */
  onInit?: () => void;
  
  /**
   * 销毁事件
   */
  onDestroy?: () => void;
  
  /**
   * 物料添加事件
   */
  onMaterialAdd?: (material: MaterialConfig) => void;
  
  /**
   * 物料移除事件
   */
  onMaterialRemove?: (materialId: string) => void;
  
  /**
   * 物料更新事件
   */
  onMaterialUpdate?: (material: MaterialConfig) => void;
}
