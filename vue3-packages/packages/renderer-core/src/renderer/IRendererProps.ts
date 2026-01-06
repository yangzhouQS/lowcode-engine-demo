import type { IDocument } from '@vue3-lowcode/types';

/**
 * Renderer props interface
 * 渲染器属性接口
 */
export interface IRendererProps {
  /**
   * The document to render
   * 要渲染的文档
   */
  document?: IDocument;

  /**
   * The component library
   * 组件库
   */
  components?: Record<string, any>;

  /**
   * The design mode
   * 设计模式
   */
  designMode?: 'design' | 'live' | 'preview';

  /**
   * The device
   * 设备
   */
  device?: 'desktop' | 'mobile' | 'tablet';

  /**
   * The locale
   * 语言环境
   */
  locale?: string;

  /**
   * Whether to enable hot reload
   * 是否启用热重载
   */
  hotReload?: boolean;

  /**
   * Custom props
   * 自定义属性
   */
  [key: string]: any;
}
