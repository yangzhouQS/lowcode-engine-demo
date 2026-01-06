import { reactive } from 'vue';
import type { IEditor } from '@vue3-lowcode/types';
import type {
  ISkeleton,
  IWidget,
  IPanel,
  IStage,
  IDock,
  IPanelDock,
  WidgetConfig,
  PanelConfig,
  DockConfig,
  PanelDockConfig,
  DialogDockConfig,
  DividerConfig,
  StageConfig,
} from './types';
import { Area } from './Area';
import { WidgetContainer } from './widget/WidgetContainer';
import { Widget } from './widget/Widget';
import { Panel } from './widget/Panel';
import { Dock } from './widget/Dock';
import { PanelDock } from './widget/PanelDock';
import { Stage } from './widget/Stage';
import {
  isWidget,
  isDockConfig,
  isPanelDockConfig,
  isPanelConfig,
  isDividerConfig,
  isPanel,
} from './types';

/**
 * Skeleton 类
 * 编辑器骨架管理类
 */
export class Skeleton implements ISkeleton {
  private panels = reactive(new Map<string, IPanel>());

  private containers = reactive(new Map<string, WidgetContainer<any>>());

  readonly leftArea: Area<DockConfig | PanelDockConfig | DialogDockConfig, any>;

  readonly topArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig, any>;

  readonly subTopArea: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig, any>;

  readonly toolbar: Area<DockConfig | DividerConfig | PanelDockConfig | DialogDockConfig, any>;

  readonly leftFixedArea: Area<PanelConfig, IPanel>;

  readonly leftFloatArea: Area<PanelConfig, IPanel>;

  readonly rightArea: Area<PanelConfig, IPanel>;

  readonly mainArea: Area<WidgetConfig | PanelConfig, IWidget | IPanel>;

  readonly bottomArea: Area<PanelConfig, IPanel>;

  readonly stages: Area<StageConfig, IStage>;

  readonly widgets: IWidget[] = reactive([]);

  constructor(readonly editor: IEditor, readonly viewName: string = 'global') {
    this.leftArea = new Area(
      this,
      'leftArea',
      (config) => {
        if (isWidget(config)) {
          return config;
        }
        return this.createWidget(config);
      },
      false,
    );
    this.topArea = new Area(
      this,
      'topArea',
      (config) => {
        if (isWidget(config)) {
          return config;
        }
        return this.createWidget(config);
      },
      false,
    );
    this.subTopArea = new Area(
      this,
      'subTopArea',
      (config) => {
        if (isWidget(config)) {
          return config;
        }
        return this.createWidget(config);
      },
      false,
    );
    this.toolbar = new Area(
      this,
      'toolbar',
      (config) => {
        if (isWidget(config)) {
          return config;
        }
        return this.createWidget(config);
      },
      false,
    );
    this.leftFixedArea = new Area(
      this,
      'leftFixedArea',
      (config) => {
        if (isPanel(config)) {
          return config;
        }
        return this.createPanel(config);
      },
      true,
    );
    this.leftFloatArea = new Area(
      this,
      'leftFloatArea',
      (config) => {
        if (isPanel(config)) {
          return config;
        }
        return this.createPanel(config);
      },
      true,
    );
    this.rightArea = new Area(
      this,
      'rightArea',
      (config) => {
        if (isPanel(config)) {
          return config;
        }
        return this.createPanel(config);
      },
      false,
      true,
    );
    this.mainArea = new Area(
      this,
      'mainArea',
      (config) => {
        if (isWidget(config)) {
          return config as IWidget;
        }
        return this.createWidget(config) as IWidget;
      },
      true,
      true,
    );
    this.bottomArea = new Area(
      this,
      'bottomArea',
      (config) => {
        if (isPanel(config)) {
          return config;
        }
        return this.createPanel(config);
      },
      true,
    );
    this.stages = new Area(this, 'stages', (config) => {
      if (isWidget(config)) {
        return config;
      }
      return new Stage(this, config);
    });
  }

  getPanel(name: string): IPanel | undefined {
    return this.panels.get(name);
  }

  getWidget(name: string): IWidget | undefined {
    return this.widgets.find((widget) => widget.name === name);
  }

  createStage(config: any): string | undefined {
    const stage = this.add({
      name: `stage-${Date.now()}`,
      area: 'stages',
      ...config,
    });
    return stage?.getName?.();
  }

  getStage(name: string): IStage | null {
    return this.stages.container.get(name) as IStage | null;
  }

  createPanel(config: PanelConfig): IPanel {
    const panel = new Panel(this, config);
    this.panels.set(panel.name, panel);
    return panel;
  }

  createWidget(config: WidgetConfig | IWidget): IWidget {
    if (isWidget(config)) {
      return config;
    }

    config = this.parseConfig(config);
    let widget: IWidget;
    if (isDockConfig(config)) {
      if (isPanelDockConfig(config)) {
        widget = new PanelDock(this, config);
      } else {
        widget = new Dock(this, config);
      }
    } else if (isDividerConfig(config)) {
      widget = new Widget(this, {
        ...config,
        type: 'Widget',
        content: 'div',
        props: {
          ...config.props,
          style: { height: '1px', background: '#e5e5e5', margin: '8px 0' },
        },
      });
    } else if (isPanelConfig(config)) {
      widget = this.createPanel(config);
    } else {
      widget = new Widget(this, config as WidgetConfig);
    }
    this.widgets.push(widget);
    return widget;
  }

  add(
    config: WidgetConfig,
    extraConfig?: Record<string, any>,
  ): IWidget | IPanel | IStage | IDock | IPanelDock | undefined {
    const parsedConfig = {
      ...this.parseConfig(config),
      ...extraConfig,
    };

    let { area } = parsedConfig;
    if (!area) {
      if (parsedConfig.type === 'Panel') {
        area = 'leftFloatArea';
      } else if (parsedConfig.type === 'Widget') {
        area = 'mainArea';
      } else {
        area = 'leftArea';
      }
    }
    switch (area) {
      case 'leftArea':
      case 'left':
        return this.leftArea.add(parsedConfig as PanelDockConfig);
      case 'rightArea':
      case 'right':
        return this.rightArea.add(parsedConfig as PanelConfig);
      case 'topArea':
      case 'top':
        return this.topArea.add(parsedConfig as PanelDockConfig);
      case 'subTopArea':
        return this.subTopArea.add(parsedConfig as PanelDockConfig);
      case 'toolbar':
        return this.toolbar.add(parsedConfig as PanelDockConfig);
      case 'mainArea':
      case 'main':
      case 'center':
      case 'centerArea':
        return this.mainArea.add(parsedConfig as PanelConfig);
      case 'bottomArea':
      case 'bottom':
        return this.bottomArea.add(parsedConfig as PanelConfig);
      case 'leftFixedArea':
        return this.leftFixedArea.add(parsedConfig as PanelConfig);
      case 'leftFloatArea':
        return this.leftFloatArea.add(parsedConfig as PanelConfig);
      case 'stages':
        return this.stages.add(parsedConfig as StageConfig);
      default:
        return undefined;
    }
  }

  createContainer(
    name: string,
    handle: (item: any) => any,
    exclusive?: boolean,
    checkVisible?: () => boolean,
    defaultSetCurrent?: boolean,
  ): WidgetContainer {
    const container = new WidgetContainer(
      name,
      handle,
      exclusive,
      checkVisible || (() => true),
      defaultSetCurrent || false,
    );
    this.containers.set(name, container);
    return container;
  }

  private parseConfig(config: WidgetConfig): WidgetConfig {
    if (config.parsed) {
      return config;
    }
    const { content, ...restConfig } = config;
    if (content && typeof content === 'object' && typeof content !== 'function') {
      Object.keys(content).forEach((key) => {
        if (/props$/i.test(key) && restConfig[key]) {
          restConfig[key] = {
            ...restConfig[key],
            ...content[key],
          };
        } else {
          restConfig[key] = content[key];
        }
      });
    }
    restConfig.pluginKey = restConfig.name;
    restConfig.parsed = true;
    return restConfig;
  }
}
