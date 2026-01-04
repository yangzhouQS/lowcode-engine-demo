import { IPublicTypeComponentMetadata, IPublicTypeTransformedComponentMetadata, IPublicTypeNpmInfo, IPublicTypeComponentDescription, IPublicTypeSnippet, IPublicTypeRemoteComponentDescription, IPublicTypeAdvanced } from '@alilc/lowcode-types';

/**
 * 组件元数据
 */
export interface ComponentMeta extends IPublicTypeComponentMetadata {
  /**
   * 组件名称
   */
  componentName: string;

  /**
   * 组件标题
   */
  title: string;

  /**
   * 组件描述
   */
  description?: string;

  /**
   * 文档链接
   */
  docUrl?: string;

  /**
   * 截图链接
   */
  screenshot?: string;

  /**
   * 开发模式
   */
  devMode?: string;

  /**
   * NPM 信息
   */
  npm?: IPublicTypeNpmInfo;

  /**
   * 组件配置
   */
  configure?: {
    props?: any[];
    component?: any;
    supports?: any;
    advanced?: IPublicTypeAdvanced;
  };

  /**
   * 是否容器组件
   */
  isContainer?: boolean;

  /**
   * 是否模态组件
   */
  isModal?: boolean;

  /**
   * 是否根节点
   */
  isRoot?: boolean;
}

/**
 * 创建组件元数据
 */
export function createComponentMeta(meta: Partial<ComponentMeta>): ComponentMeta {
  return {
    componentName: meta.componentName || '',
    title: meta.title || meta.componentName || '',
    description: meta.description,
    docUrl: meta.docUrl,
    screenshot: meta.screenshot,
    devMode: meta.devMode,
    npm: meta.npm,
    configure: meta.configure,
    isContainer: meta.isContainer ?? false,
    isModal: meta.isModal ?? false,
    isRoot: meta.isRoot ?? false,
  };
}

/**
 * 转换组件元数据
 */
export function transformComponentMeta(meta: IPublicTypeComponentMetadata): IPublicTypeTransformedComponentMetadata {
  return {
    ...meta,
    configure: {
      ...meta.configure,
      component: {
        ...meta.configure?.component,
        isContainer: meta.configure?.component?.isContainer ?? false,
        isModal: meta.configure?.component?.isModal ?? false,
        isRoot: meta.configure?.component?.isRoot ?? false,
      },
    },
  };
}

/**
 * 获取组件描述
 */
export function getComponentDescription(componentName: string): IPublicTypeComponentDescription | null {
  // TODO: 实现获取组件描述逻辑
  return null;
}

/**
 * 获取组件代码片段
 */
export function getComponentSnippet(componentName: string): IPublicTypeSnippet | null {
  // TODO: 实现获取组件代码片段逻辑
  return null;
}

/**
 * 获取远程组件描述
 */
export function getRemoteComponentDescription(url: string): Promise<IPublicTypeRemoteComponentDescription | null> {
  // TODO: 实现获取远程组件描述逻辑
  return Promise.resolve(null);
}

/**
 * 验证组件元数据
 */
export function validateComponentMeta(meta: ComponentMeta): boolean {
  if (!meta.componentName) {
    return false;
  }
  return true;
}

/**
 * 合并组件元数据
 */
export function mergeComponentMeta(...metas: Partial<ComponentMeta>[]): ComponentMeta {
  const result: ComponentMeta = {
    componentName: '',
    title: '',
  };

  metas.forEach(meta => {
    Object.assign(result, meta);
  });

  return result;
}

export default {
  createComponentMeta,
  transformComponentMeta,
  getComponentDescription,
  getComponentSnippet,
  getRemoteComponentDescription,
  validateComponentMeta,
  mergeComponentMeta,
};
