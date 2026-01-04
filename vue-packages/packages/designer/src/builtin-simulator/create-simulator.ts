import { BuiltinSimulatorHost, BuiltinSimulatorHostProps } from './host';
import { HostView } from './host-view';
import { IRenderer } from './renderer';
import { IPublicTypeProject, IPublicTypeDocumentModel, IPublicTypeDesigner } from '@alilc/lowcode-types';
import { IPublicTypeComponentMap } from '@alilc/lowcode-types';

export interface CreateSimulatorOptions extends BuiltinSimulatorHostProps {
  /**
   * 渲染器
   */
  renderer?: IRenderer;
  
  /**
   * 项目实例
   */
  project?: IPublicTypeProject;
  
  /**
   * 文档实例
   */
  document?: IPublicTypeDocumentModel;
  
  /**
   * 设计器实例
   */
  designer?: IPublicTypeDesigner;
  
  /**
   * 组件映射
   */
  components?: IPublicTypeComponentMap;
  
  /**
   * 库映射
   */
  libraryMap?: Record<string, any>;
  
  /**
   * 上下文
   */
  context?: Record<string, any>;
  
  /**
   * 国际化
   */
  i18n?: Record<string, string>;
  
  /**
   * 语言
   */
  locale?: string;
  
  /**
   * 全局对象
   */
  global?: any;
  
  /**
   * 工具函数
   */
  utils?: Record<string, any>;
  
  /**
   * 常量
   */
  constants?: Record<string, any>;
  
  /**
   * 请求处理器映射
   */
  requestHandlersMap?: Record<string, any>;
  
  /**
   * Setter 映射
   */
  setters?: Record<string, any>;
}

export interface SimulatorInstance {
  /**
   * 模拟器 Host
   */
  host: BuiltinSimulatorHost;
  
  /**
   * 模拟器视图组件
   */
  view: typeof HostView;
  
  /**
   * 销毁模拟器
   */
  dispose: () => void;
}

/**
 * 创建模拟器
 */
export function createSimulator(options: CreateSimulatorOptions = {}): SimulatorInstance {
  // 创建模拟器 Host
  const host = new BuiltinSimulatorHost({
    ...options,
    renderer: options.renderer,
    project: options.project,
    document: options.document,
    designer: options.designer,
    components: options.components,
    libraryMap: options.libraryMap,
    context: options.context,
    i18n: options.i18n,
    locale: options.locale,
    global: options.global,
    utils: options.utils,
    constants: options.constants,
    requestHandlersMap: options.requestHandlersMap,
    setters: options.setters,
  });

  // 返回模拟器实例
  return {
    host,
    view: HostView,
    dispose: () => {
      host.dispose();
    },
  };
}

/**
 * 创建模拟器 Host
 */
export function createSimulatorHost(options: CreateSimulatorOptions = {}): BuiltinSimulatorHost {
  return new BuiltinSimulatorHost(options);
}

export default createSimulator;
