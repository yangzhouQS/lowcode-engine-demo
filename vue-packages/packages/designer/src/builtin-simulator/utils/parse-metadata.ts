import { IPublicTypeTransformedComponentMetadata } from '@alilc/lowcode-types';

export interface LowcodeTypes {
  [key: string]: any;
}

export interface ParsedMetadata {
  componentName: string;
  title: string;
  docUrl: string;
  screenshot: string;
  devMode: string;
  npm: {
    package: string;
    version: string;
    exportName: string;
    main: string;
    destructuring: boolean;
    subName: string;
    componentName: string;
  };
  configure: {
    props: Array<{
      name: string;
      propType: string;
      description: string;
      defaultValue: any;
      advanced: boolean;
    }>;
    component: {
      isContainer: boolean;
      isModal: boolean;
      descriptor: string;
    };
    supports: {
      style: boolean;
      className: boolean;
    };
    experimental: {
      editorSupport: string;
    };
  };
}

/**
 * 解析组件元数据
 */
export function parseMetadata(metadata: IPublicTypeTransformedComponentMetadata): ParsedMetadata {
  return {
    componentName: metadata.componentName,
    title: metadata.title || metadata.componentName,
    docUrl: metadata.docUrl || '',
    screenshot: metadata.screenshot || '',
    devMode: metadata.devMode || '',
    npm: {
      package: metadata.npm?.package || '',
      version: metadata.npm?.version || '',
      exportName: metadata.npm?.exportName || '',
      main: metadata.npm?.main || '',
      destructuring: metadata.npm?.destructuring || false,
      subName: metadata.npm?.subName || '',
      componentName: metadata.npm?.componentName || '',
    },
    configure: {
      props: metadata.configure?.props || [],
      component: {
        isContainer: metadata.configure?.component?.isContainer || false,
        isModal: metadata.configure?.component?.isModal || false,
        descriptor: metadata.configure?.component?.descriptor || '',
      },
      supports: {
        style: metadata.configure?.supports?.style || false,
        className: metadata.configure?.supports?.className || false,
      },
      experimental: {
        editorSupport: metadata.configure?.experimental?.editorSupport || '',
      },
    },
  };
}

/**
 * 批量解析组件元数据
 */
export function parseMetadataList(
  metadataList: IPublicTypeTransformedComponentMetadata[]
): ParsedMetadata[] {
  return metadataList.map(parseMetadata);
}

/**
 * 获取 LowcodeTypes
 */
export function getLowcodeTypes(): LowcodeTypes {
  return {
    // 这里可以添加各种类型定义
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    object: 'object',
    array: 'array',
    function: 'function',
  };
}

export { LowcodeTypes };
