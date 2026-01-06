import type { VNode } from 'vue';
import type { IEditor } from '@vue3-lowcode/types';

/**
 * Widget 配置基础接口
 */
export interface WidgetConfig {
  name: string;
  type?: string;
  props?: Record<string, any>;
  content?: any;
  contentProps?: Record<string, any>;
  align?: string;
  area?: string;
  pluginKey?: string;
  parsed?: boolean;
}

/**
 * Panel 配置接口
 */
export interface PanelConfig extends WidgetConfig {
  type?: 'Panel';
  title?: any;
  icon?: any;
  description?: string;
  hideTitleBar?: boolean;
  help?: HelpTipConfig;
  condition?: (panel: any) => boolean;
}

/**
 * Dock 配置接口
 */
export interface DockConfig extends WidgetConfig {
  type?: 'Dock';
  dockProps?: Record<string, any>;
}

/**
 * PanelDock 配置接口
 */
export interface PanelDockConfig extends DockConfig {
  type?: 'PanelDock';
  panelName?: string;
  panelProps?: Record<string, any>;
}

/**
 * DialogDock 配置接口
 */
export interface DialogDockConfig extends DockConfig {
  type?: 'DialogDock';
  dialogProps?: Record<string, any>;
}

/**
 * Divider 配置接口
 */
export interface DividerConfig extends WidgetConfig {
  type?: 'Divider';
}

/**
 * Stage 配置接口
 */
export interface StageConfig extends WidgetConfig {
  type?: 'Stage';
  stageProps?: Record<string, any>;
}

/**
 * 帮助提示配置接口
 */
export interface HelpTipConfig {
  content?: string;
  link?: string;
  placement?: string;
}

/**
 * Widget 基础接口
 */
export interface IWidget {
  readonly name: string;
  readonly content: VNode;
  readonly align?: string;
  readonly isWidget: true;
  readonly visible: boolean;
  readonly disabled?: boolean;
  readonly body: VNode;
  readonly skeleton: ISkeleton;
  readonly config: WidgetConfig;

  getName(): string;
  getContent(): VNode;
  show(): void;
  hide(): void;
  toggle(): void;
  enable?(): void;
  disable?(): void;
}

/**
 * Skeleton 接口
 */
export interface ISkeleton {
  editor: IEditor;
  readonly leftArea: IArea<DockConfig | PanelDockConfig | DialogDockConfig, any>;
  readonly topArea: IArea<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig, any>;
  readonly subTopArea: IArea<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig, any>;
  readonly toolbar: IArea<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig, any>;
  readonly leftFixedArea: IArea<PanelConfig, IPanel>;
  readonly leftFloatArea: IArea<PanelConfig, IPanel>;
  readonly rightArea: IArea<PanelConfig, IPanel>;
  readonly mainArea: IArea<WidgetConfig | PanelConfig, IWidget | IPanel>;
  readonly bottomArea: IArea<PanelConfig, IPanel>;
  readonly stages: IArea<StageConfig, IStage>;
  readonly widgets: IWidget[];

  getPanel(name: string): IPanel | undefined;
  getWidget(name: string): IWidget | undefined;
  createStage(config: any): string | undefined;
  getStage(name: string): IStage | null;
  createPanel(config: PanelConfig): IPanel;
  add(config: WidgetConfig, extraConfig?: Record<string, any>): IWidget | IPanel | IStage | IDock | IPanelDock | undefined;
}

/**
 * Area 接口
 */
export interface IArea<C, T> {
  isEmpty(): boolean;
  add(config: T | C): T;
  remove(config: T | string): number;
  setVisible(flag: boolean): void;
  hide(): void;
  show(): void;
}

/**
 * Panel 接口
 */
export interface IPanel extends IWidget {
  readonly isPanel: true;
  readonly title: any;
  readonly help?: HelpTipConfig;
  active(item?: IPanel | string | null): void;
  setActive(flag: boolean): void;
  toggle(): void;
  isChildOfFloatArea(): boolean;
  isChildOfFixedArea(): boolean;
}

/**
 * Stage 接口
 */
export interface IStage extends IWidget {
  readonly isStage: true;
  getName(): string;
}

/**
 * Dock 接口
 */
export interface IDock extends IWidget {
  readonly isDock: true;
}

/**
 * PanelDock 接口
 */
export interface IPanelDock extends IDock {
  readonly isPanelDock: true;
  readonly panelName?: string;
}

// 类型守卫
export function isWidget(obj: any): obj is IWidget {
  return obj && obj.isWidget === true;
}

export function isDockConfig(config: any): config is DockConfig {
  return config && (config.type === 'Dock' || config.type === 'PanelDock' || config.type === 'DialogDock');
}

export function isPanelDockConfig(config: any): config is PanelDockConfig {
  return config && config.type === 'PanelDock';
}

export function isPanelConfig(config: any): config is PanelConfig {
  return config && config.type === 'Panel';
}

export function isDividerConfig(config: any): config is DividerConfig {
  return config && config.type === 'Divider';
}

export function isPanel(obj: any): obj is IPanel {
  return obj && obj.isPanel === true;
}

export function isStage(obj: any): obj is IStage {
  return obj && obj.isStage === true;
}

export function isDock(obj: any): obj is IDock {
  return obj && obj.isDock === true;
}

export function isPanelDock(obj: any): obj is IPanelDock {
  return obj && obj.isPanelDock === true;
}
