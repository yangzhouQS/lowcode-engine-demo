/**
 * Vue3 LowCode Engine - Utils Package
 * 应用助手相关工具
 */

import { Component, App } from 'vue';

export interface AppHelperOptions {
  app?: App;
  components?: Record<string, Component>;
  directives?: Record<string, any>;
  plugins?: any[];
  config?: Record<string, any>;
}

export class AppHelper {
  private app: App | null = null;
  private components: Record<string, Component> = {};
  private directives: Record<string, any> = {};
  private plugins: any[] = [];
  private config: Record<string, any> = {};

  constructor(options: AppHelperOptions = {}) {
    this.app = options.app || null;
    this.components = options.components || {};
    this.directives = options.directives || {};
    this.plugins = options.plugins || [];
    this.config = options.config || {};
  }

  setApp(app: App): void {
    this.app = app;
  }

  getApp(): App | null {
    return this.app;
  }

  registerComponent(name: string, component: Component): void {
    this.components[name] = component;
    if (this.app) {
      this.app.component(name, component);
    }
  }

  getComponent(name: string): Component | undefined {
    return this.components[name];
  }

  registerDirective(name: string, directive: any): void {
    this.directives[name] = directive;
    if (this.app) {
      this.app.directive(name, directive);
    }
  }

  getDirective(name: string): any {
    return this.directives[name];
  }

  use(plugin: any, ...options: any[]): void {
    this.plugins.push(plugin);
    if (this.app) {
      this.app.use(plugin, ...options);
    }
  }

  config(key: string, value: any): void {
    this.config[key] = value;
  }

  getConfig(key: string): any {
    return this.config[key];
  }

  mount(container: string | Element): void {
    if (this.app) {
      this.app.mount(container);
    }
  }

  unmount(): void {
    if (this.app) {
      this.app.unmount();
    }
  }
}

export function createAppHelper(options?: AppHelperOptions): AppHelper {
  return new AppHelper(options);
}
