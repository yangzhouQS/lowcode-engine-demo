import { ref, type Ref } from 'vue';
import type { MaterialCollectionConfig, MaterialCollectionEvents } from '../types';
import { Material } from './Material';

/**
 * MaterialCollection 类 - 物料集合管理
 */
export class MaterialCollection {
  /**
   * 物料集合配置
   */
  protected config: MaterialCollectionConfig;
  
  /**
   * 物料集合事件
   */
  protected events: MaterialCollectionEvents;
  
  /**
   * 物料集合状态
   */
  protected materials: Ref<Map<string, Material>>;
  
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
   * @param config 物料集合配置
   * @param events 物料集合事件
   */
  constructor(config: MaterialCollectionConfig, events: MaterialCollectionEvents = {}) {
    this.config = config;
    this.events = events;
    
    // 初始化物料集合
    this.materials = ref(new Map<string, Material>());
    
    // 添加初始物料
    for (const materialConfig of config.materials) {
      this.addMaterial(materialConfig);
    }
    
    this.log('MaterialCollection created:', config.id);
  }
  
  /**
   * 初始化物料集合
   */
  async init(): Promise<void> {
    if (this.initialized) {
      this.warn('MaterialCollection already initialized:', this.config.id);
      return;
    }
    
    if (this.destroyed) {
      this.warn('MaterialCollection already destroyed:', this.config.id);
      return;
    }
    
    // 初始化所有物料
    for (const material of this.materials.value.values()) {
      await material.init();
    }
    
    this.initialized = true;
    
    if (this.events.onInit) {
      this.events.onInit();
    }
    
    this.log('MaterialCollection initialized:', this.config.id);
  }
  
  /**
   * 销毁物料集合
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('MaterialCollection not initialized:', this.config.id);
      return;
    }
    
    if (this.destroyed) {
      this.warn('MaterialCollection already destroyed:', this.config.id);
      return;
    }
    
    // 销毁所有物料
    for (const material of this.materials.value.values()) {
      material.destroy();
    }
    this.materials.value.clear();
    
    this.destroyed = true;
    
    if (this.events.onDestroy) {
      this.events.onDestroy();
    }
    
    this.log('MaterialCollection destroyed:', this.config.id);
  }
  
  /**
   * 获取物料集合配置
   */
  getConfig(): MaterialCollectionConfig {
    return { ...this.config };
  }
  
  /**
   * 设置物料集合配置
   * @param config 物料集合配置
   */
  setConfig(config: Partial<MaterialCollectionConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('MaterialCollection config updated:', this.config.id, config);
  }
  
  /**
   * 获取物料集合 ID
   */
  getId(): string {
    return this.config.id;
  }
  
  /**
   * 获取物料集合名称
   */
  getName(): string {
    return this.config.name;
  }
  
  /**
   * 设置物料集合名称
   * @param name 物料集合名称
   */
  setName(name: string): void {
    const oldName = this.config.name;
    this.config.name = name;
    
    this.log('MaterialCollection name updated:', this.config.id, oldName, '->', name);
  }
  
  /**
   * 获取物料集合描述
   */
  getDescription(): string | undefined {
    return this.config.description;
  }
  
  /**
   * 设置物料集合描述
   * @param description 物料集合描述
   */
  setDescription(description: string): void {
    const oldDescription = this.config.description;
    this.config.description = description;
    
    this.log('MaterialCollection description updated:', this.config.id, oldDescription, '->', description);
  }
  
  /**
   * 添加物料
   * @param config 物料配置
   * @returns 物料实例
   */
  addMaterial(config: any): Material {
    if (this.materials.value.has(config.id)) {
      this.warn('Material already exists:', config.id);
      return this.materials.value.get(config.id)!;
    }
    
    const material = new Material(config, {
      onInit: () => {
        // 物料初始化事件处理
      },
      onDestroy: () => {
        // 物料销毁事件处理
      },
      onUpdate: (material) => {
        if (this.events.onMaterialUpdate) {
          this.events.onMaterialUpdate(material.getConfig());
        }
      },
      onLoad: (material) => {
        // 物料加载事件处理
      },
      onUse: (material) => {
        // 物料使用事件处理
      },
    });
    
    this.materials.value.set(config.id, material);
    
    if (this.initialized) {
      material.init();
    }
    
    if (this.events.onMaterialAdd) {
      this.events.onMaterialAdd(config);
    }
    
    this.log('Material added:', config.id);
    return material;
  }
  
  /**
   * 移除物料
   * @param materialId 物料 ID
   */
  removeMaterial(materialId: string): void {
    const material = this.materials.value.get(materialId);
    if (!material) {
      this.warn('Material not found:', materialId);
      return;
    }
    
    material.destroy();
    this.materials.value.delete(materialId);
    
    if (this.events.onMaterialRemove) {
      this.events.onMaterialRemove(materialId);
    }
    
    this.log('Material removed:', materialId);
  }
  
  /**
   * 获取物料
   * @param materialId 物料 ID
   * @returns 物料实例
   */
  getMaterial(materialId: string): Material | undefined {
    return this.materials.value.get(materialId);
  }
  
  /**
   * 获取所有物料
   * @returns 物料集合
   */
  getMaterials(): Map<string, Material> {
    return new Map(this.materials.value);
  }
  
  /**
   * 根据类型获取物料
   * @param type 物料类型
   * @returns 物料列表
   */
  getMaterialsByType(type: string): Material[] {
    const materials: Material[] = [];
    for (const material of this.materials.value.values()) {
      if (material.getType() === type) {
        materials.push(material);
      }
    }
    return materials;
  }
  
  /**
   * 根据分类获取物料
   * @param category 物料分类
   * @returns 物料列表
   */
  getMaterialsByCategory(category: string): Material[] {
    const materials: Material[] = [];
    for (const material of this.materials.value.values()) {
      if (material.getCategory() === category) {
        materials.push(material);
      }
    }
    return materials;
  }
  
  /**
   * 根据标签获取物料
   * @param tags 物料标签
   * @returns 物料列表
   */
  getMaterialsByTags(tags: string[]): Material[] {
    const materials: Material[] = [];
    for (const material of this.materials.value.values()) {
      const materialTags = material.getTags();
      if (materialTags && tags.every(tag => materialTags.includes(tag))) {
        materials.push(material);
      }
    }
    return materials;
  }
  
  /**
   * 搜索物料
   * @param keyword 搜索关键词
   * @returns 物料列表
   */
  searchMaterials(keyword: string): Material[] {
    const materials: Material[] = [];
    const lowerKeyword = keyword.toLowerCase();
    
    for (const material of this.materials.value.values()) {
      const name = material.getName().toLowerCase();
      const description = material.getDescription()?.toLowerCase() || '';
      
      if (name.includes(lowerKeyword) || description.includes(lowerKeyword)) {
        materials.push(material);
      }
    }
    
    return materials;
  }
  
  /**
   * 获取可用的物料
   * @returns 物料列表
   */
  getAvailableMaterials(): Material[] {
    const materials: Material[] = [];
    for (const material of this.materials.value.values()) {
      if (material.isAvailable()) {
        materials.push(material);
      }
    }
    return materials;
  }
  
  /**
   * 检查物料集合是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查物料集合是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 获取物料数量
   */
  getMaterialCount(): number {
    return this.materials.value.size;
  }
  
  /**
   * 清空物料集合
   */
  clearMaterials(): void {
    // 销毁所有物料
    for (const material of this.materials.value.values()) {
      material.destroy();
    }
    this.materials.value.clear();
    
    this.log('MaterialCollection cleared:', this.config.id);
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log(`[MaterialCollection:${this.config.id}]`, ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn(`[MaterialCollection:${this.config.id}]`, ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error(`[MaterialCollection:${this.config.id}]`, ...args);
  }
}
