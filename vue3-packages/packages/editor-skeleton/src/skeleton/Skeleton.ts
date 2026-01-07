import { ref, computed, type Ref } from 'vue';
import type { Designer } from '@vue3-lowcode/designer';
import type { 
  SkeletonConfig, 
  SkeletonEvents,
  AreaConfig,
  WidgetConfig,
  PanelConfig,
  SettingsPaneConfig
} from '../types';
import { Area } from '../area/Area';
import { Widget } from '../widget/Widget';
import { Panel } from '../panel/Panel';
import { SettingsPane } from '../settings/SettingsPane';

/**
 * Skeleton 类 - 编辑器骨架管理
 */
export class Skeleton {
  /**
   * 骨架配置
   */
  protected config: SkeletonConfig;
  
  /**
   * 骨架事件
   */
  protected events: SkeletonEvents;
  
  /**
   * 设计器实例
   */
  protected designer: Designer;
  
  /**
   * 区域集合
   */
  protected areas: Ref<Map<string, Area>>;
  
  /**
   * Widget 集合
   */
  protected widgets: Ref<Map<string, Widget>>;
  
  /**
   * 面板集合
   */
  protected panels: Ref<Map<string, Panel>>;
  
  /**
   * 设置面板集合
   */
  protected settingsPanes: Ref<Map<string, SettingsPane>>;
  
  /**
   * 是否已初始化
   */
  protected initialized: boolean = false;
  
  /**
   * 是否已销毁
   */
  protected destroyed: boolean = false;
  
  /**
   * 骨架容器元素
   */
  protected container: HTMLElement | null = null;
  
  /**
   * 构造函数
   * @param config 骨架配置
   * @param events 骨架事件
   */
  constructor(config: SkeletonConfig, events: SkeletonEvents = {}) {
    this.config = config;
    this.events = events;
    this.designer = config.designer;
    
    // 初始化集合
    this.areas = ref(new Map<string, Area>());
    this.widgets = ref(new Map<string, Widget>());
    this.panels = ref(new Map<string, Panel>());
    this.settingsPanes = ref(new Map<string, SettingsPane>());
    
    this.log('Skeleton created');
  }
  
  /**
   * 初始化骨架
   */
  async init(): Promise<void> {
    if (this.initialized) {
      this.warn('Skeleton already initialized');
      return;
    }
    
    if (this.destroyed) {
      this.warn('Skeleton already destroyed');
      return;
    }
    
    // 获取容器元素
    this.container = typeof this.config.container === 'string'
      ? document.querySelector(this.config.container) as HTMLElement
      : this.config.container;
    
    if (!this.container) {
      this.error('Container not found:', this.config.container);
      throw new Error('Container not found');
    }
    
    // 初始化所有区域
    for (const area of this.areas.value.values()) {
      const areaContainer = this.container.querySelector(`.lc-area-${area.getName()}`) as HTMLElement;
      if (areaContainer) {
        area.init(areaContainer);
      }
    }
    
    // 初始化所有 Widget
    for (const widget of this.widgets.value.values()) {
      const widgetContainer = this.container.querySelector(`.lc-widget-${widget.getName()}`) as HTMLElement;
      if (widgetContainer) {
        widget.init(widgetContainer);
      }
    }
    
    // 初始化所有面板
    for (const panel of this.panels.value.values()) {
      const panelContainer = this.container.querySelector(`.lc-panel-${panel.getName()}`) as HTMLElement;
      if (panelContainer) {
        panel.init(panelContainer);
      }
    }
    
    // 初始化所有设置面板
    for (const settingsPane of this.settingsPanes.value.values()) {
      const settingsPaneContainer = this.container.querySelector(`.lc-settings-pane-${settingsPane.getName()}`) as HTMLElement;
      if (settingsPaneContainer) {
        settingsPane.init(settingsPaneContainer);
      }
    }
    
    this.initialized = true;
    
    if (this.events.onInit) {
      this.events.onInit();
    }
    
    this.log('Skeleton initialized');
  }
  
  /**
   * 销毁骨架
   */
  destroy(): void {
    if (!this.initialized) {
      this.warn('Skeleton not initialized');
      return;
    }
    
    if (this.destroyed) {
      this.warn('Skeleton already destroyed');
      return;
    }
    
    // 销毁所有区域
    for (const area of this.areas.value.values()) {
      area.destroy();
    }
    this.areas.value.clear();
    
    // 销毁所有 Widget
    for (const widget of this.widgets.value.values()) {
      widget.destroy();
    }
    this.widgets.value.clear();
    
    // 销毁所有面板
    for (const panel of this.panels.value.values()) {
      panel.destroy();
    }
    this.panels.value.clear();
    
    // 销毁所有设置面板
    for (const settingsPane of this.settingsPanes.value.values()) {
      settingsPane.destroy();
    }
    this.settingsPanes.value.clear();
    
    this.container = null;
    this.destroyed = true;
    
    if (this.events.onDestroy) {
      this.events.onDestroy();
    }
    
    this.log('Skeleton destroyed');
  }
  
  /**
   * 获取骨架配置
   */
  getConfig(): SkeletonConfig {
    return { ...this.config };
  }
  
  /**
   * 设置骨架配置
   * @param config 骨架配置
   */
  setConfig(config: Partial<SkeletonConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('Skeleton config updated:', config);
  }
  
  /**
   * 获取设计器实例
   */
  getDesigner(): Designer {
    return this.designer;
  }
  
  /**
   * 获取容器元素
   */
  getContainer(): HTMLElement | null {
    return this.container;
  }
  
  /**
   * 添加区域
   * @param config 区域配置
   * @returns 区域实例
   */
  addArea(config: AreaConfig): Area {
    if (this.areas.value.has(config.name)) {
      this.warn('Area already exists:', config.name);
      return this.areas.value.get(config.name)!;
    }
    
    const area = new Area(config, {
      onCollapse: (name, collapsed) => {
        if (this.events.onAreaAdd) {
          this.events.onAreaAdd(config);
        }
      },
      onResize: (name, size) => {
        // 区域调整大小事件处理
      },
      onDrag: (name, position) => {
        // 区域拖拽事件处理
      },
      onClose: (name) => {
        // 区域关闭事件处理
      },
    });
    
    this.areas.value.set(config.name, area);
    
    if (this.initialized && this.container) {
      const areaContainer = this.container.querySelector(`.lc-area-${config.name}`) as HTMLElement;
      if (areaContainer) {
        area.init(areaContainer);
      }
    }
    
    if (this.events.onAreaAdd) {
      this.events.onAreaAdd(config);
    }
    
    this.log('Area added:', config.name);
    return area;
  }
  
  /**
   * 移除区域
   * @param name 区域名称
   */
  removeArea(name: string): void {
    const area = this.areas.value.get(name);
    if (!area) {
      this.warn('Area not found:', name);
      return;
    }
    
    area.destroy();
    this.areas.value.delete(name);
    
    if (this.events.onAreaRemove) {
      this.events.onAreaRemove(name);
    }
    
    this.log('Area removed:', name);
  }
  
  /**
   * 获取区域
   * @param name 区域名称
   * @returns 区域实例
   */
  getArea(name: string): Area | undefined {
    return this.areas.value.get(name);
  }
  
  /**
   * 获取所有区域
   * @returns 区域集合
   */
  getAreas(): Map<string, Area> {
    return new Map(this.areas.value);
  }
  
  /**
   * 添加 Widget
   * @param config Widget 配置
   * @returns Widget 实例
   */
  addWidget(config: WidgetConfig): Widget {
    if (this.widgets.value.has(config.name)) {
      this.warn('Widget already exists:', config.name);
      return this.widgets.value.get(config.name)!;
    }
    
    const widget = new Widget(config, {
      onCollapse: (name, collapsed) => {
        // Widget 折叠事件处理
      },
      onResize: (name, size) => {
        // Widget 调整大小事件处理
      },
      onDrag: (name, position) => {
        // Widget 拖拽事件处理
      },
      onClose: (name) => {
        // Widget 关闭事件处理
      },
      onClick: (name) => {
        // Widget 点击事件处理
      },
      onDoubleClick: (name) => {
        // Widget 双击事件处理
      },
    });
    
    this.widgets.value.set(config.name, widget);
    
    if (this.initialized && this.container) {
      const widgetContainer = this.container.querySelector(`.lc-widget-${config.name}`) as HTMLElement;
      if (widgetContainer) {
        widget.init(widgetContainer);
      }
    }
    
    if (this.events.onWidgetAdd) {
      this.events.onWidgetAdd(config);
    }
    
    this.log('Widget added:', config.name);
    return widget;
  }
  
  /**
   * 移除 Widget
   * @param name Widget 名称
   */
  removeWidget(name: string): void {
    const widget = this.widgets.value.get(name);
    if (!widget) {
      this.warn('Widget not found:', name);
      return;
    }
    
    widget.destroy();
    this.widgets.value.delete(name);
    
    if (this.events.onWidgetRemove) {
      this.events.onWidgetRemove(name);
    }
    
    this.log('Widget removed:', name);
  }
  
  /**
   * 获取 Widget
   * @param name Widget 名称
   * @returns Widget 实例
   */
  getWidget(name: string): Widget | undefined {
    return this.widgets.value.get(name);
  }
  
  /**
   * 获取所有 Widget
   * @returns Widget 集合
   */
  getWidgets(): Map<string, Widget> {
    return new Map(this.widgets.value);
  }
  
  /**
   * 添加面板
   * @param config 面板配置
   * @returns 面板实例
   */
  addPanel(config: PanelConfig): Panel {
    if (this.panels.value.has(config.name)) {
      this.warn('Panel already exists:', config.name);
      return this.panels.value.get(config.name)!;
    }
    
    const panel = new Panel(config, {
      onCollapse: (name, collapsed) => {
        // 面板折叠事件处理
      },
      onResize: (name, size) => {
        // 面板调整大小事件处理
      },
      onDrag: (name, position) => {
        // 面板拖拽事件处理
      },
      onClose: (name) => {
        // 面板关闭事件处理
      },
      onClick: (name) => {
        // 面板点击事件处理
      },
      onDoubleClick: (name) => {
        // 面板双击事件处理
      },
    });
    
    this.panels.value.set(config.name, panel);
    
    if (this.initialized && this.container) {
      const panelContainer = this.container.querySelector(`.lc-panel-${config.name}`) as HTMLElement;
      if (panelContainer) {
        panel.init(panelContainer);
      }
    }
    
    if (this.events.onPanelAdd) {
      this.events.onPanelAdd(config);
    }
    
    this.log('Panel added:', config.name);
    return panel;
  }
  
  /**
   * 移除面板
   * @param name 面板名称
   */
  removePanel(name: string): void {
    const panel = this.panels.value.get(name);
    if (!panel) {
      this.warn('Panel not found:', name);
      return;
    }
    
    panel.destroy();
    this.panels.value.delete(name);
    
    if (this.events.onPanelRemove) {
      this.events.onPanelRemove(name);
    }
    
    this.log('Panel removed:', name);
  }
  
  /**
   * 获取面板
   * @param name 面板名称
   * @returns 面板实例
   */
  getPanel(name: string): Panel | undefined {
    return this.panels.value.get(name);
  }
  
  /**
   * 获取所有面板
   * @returns 面板集合
   */
  getPanels(): Map<string, Panel> {
    return new Map(this.panels.value);
  }
  
  /**
   * 添加设置面板
   * @param config 设置面板配置
   * @returns 设置面板实例
   */
  addSettingsPane(config: SettingsPaneConfig): SettingsPane {
    if (this.settingsPanes.value.has(config.name)) {
      this.warn('SettingsPane already exists:', config.name);
      return this.settingsPanes.value.get(config.name)!;
    }
    
    const settingsPane = new SettingsPane(config, {
      onCollapse: (name, collapsed) => {
        // 设置面板折叠事件处理
      },
      onResize: (name, size) => {
        // 设置面板调整大小事件处理
      },
      onDrag: (name, position) => {
        // 设置面板拖拽事件处理
      },
      onClose: (name) => {
        // 设置面板关闭事件处理
      },
      onClick: (name) => {
        // 设置面板点击事件处理
      },
      onDoubleClick: (name) => {
        // 设置面板双击事件处理
      },
    });
    
    this.settingsPanes.value.set(config.name, settingsPane);
    
    if (this.initialized && this.container) {
      const settingsPaneContainer = this.container.querySelector(`.lc-settings-pane-${config.name}`) as HTMLElement;
      if (settingsPaneContainer) {
        settingsPane.init(settingsPaneContainer);
      }
    }
    
    if (this.events.onSettingsPaneAdd) {
      this.events.onSettingsPaneAdd(config);
    }
    
    this.log('SettingsPane added:', config.name);
    return settingsPane;
  }
  
  /**
   * 移除设置面板
   * @param name 设置面板名称
   */
  removeSettingsPane(name: string): void {
    const settingsPane = this.settingsPanes.value.get(name);
    if (!settingsPane) {
      this.warn('SettingsPane not found:', name);
      return;
    }
    
    settingsPane.destroy();
    this.settingsPanes.value.delete(name);
    
    if (this.events.onSettingsPaneRemove) {
      this.events.onSettingsPaneRemove(name);
    }
    
    this.log('SettingsPane removed:', name);
  }
  
  /**
   * 获取设置面板
   * @param name 设置面板名称
   * @returns 设置面板实例
   */
  getSettingsPane(name: string): SettingsPane | undefined {
    return this.settingsPanes.value.get(name);
  }
  
  /**
   * 获取所有设置面板
   * @returns 设置面板集合
   */
  getSettingsPanes(): Map<string, SettingsPane> {
    return new Map(this.settingsPanes.value);
  }
  
  /**
   * 检查骨架是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查骨架是否已销毁
   */
  isDestroyed(): boolean {
    return this.destroyed;
  }
  
  /**
   * 获取骨架样式
   */
  getStyles(): Record<string, any> {
    const styles: Record<string, any> = {
      ...this.config.style,
    };
    
    if (this.config.width !== undefined) {
      styles.width = typeof this.config.width === 'number' 
        ? `${this.config.width}px` 
        : this.config.width;
    }
    
    if (this.config.height !== undefined) {
      styles.height = typeof this.config.height === 'number' 
        ? `${this.config.height}px` 
        : this.config.height;
    }
    
    return styles;
  }
  
  /**
   * 获取骨架类名
   */
  getClassName(): string {
    const classNames: string[] = [
      'lc-skeleton',
    ];
    
    if (this.config.className) {
      classNames.push(this.config.className);
    }
    
    if (this.config.theme) {
      classNames.push(`lc-skeleton-${this.config.theme}`);
    }
    
    if (this.config.animated) {
      classNames.push('lc-skeleton-animated');
    }
    
    return classNames.join(' ');
  }
  
  /**
   * 重置骨架
   */
  reset(): void {
    // 重置所有区域
    for (const area of this.areas.value.values()) {
      area.reset();
    }
    
    // 重置所有 Widget
    for (const widget of this.widgets.value.values()) {
      widget.reset();
    }
    
    // 重置所有面板
    for (const panel of this.panels.value.values()) {
      panel.reset();
    }
    
    // 重置所有设置面板
    for (const settingsPane of this.settingsPanes.value.values()) {
      settingsPane.reset();
    }
    
    this.log('Skeleton reset');
  }
  
  /**
   * 记录日志
   */
  protected log(...args: any[]): void {
    console.log('[Skeleton]', ...args);
  }
  
  /**
   * 记录警告
   */
  protected warn(...args: any[]): void {
    console.warn('[Skeleton]', ...args);
  }
  
  /**
   * 记录错误
   */
  protected error(...args: any[]): void {
    console.error('[Skeleton]', ...args);
  }
}
