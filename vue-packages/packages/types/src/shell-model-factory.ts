/**
 * Vue3 LowCode Engine - Shell Model Factory Types
 * 低代码引擎Shell模型工厂类型定义
 */

import { IPublicModelNode } from './model';

/**
 * Shell模型工厂接口
 */
export interface ShellModelFactory {
  /**
   * 创建节点模型
   */
  createNode(schema: any, document: any): IPublicModelNode;

  /**
   * 创建Props模型
   */
  createProps(node: IPublicModelNode): any;

  /**
   * 创建Prop模型
   */
  createProp(node: IPublicModelNode, path: string): any;

  /**
   * 创建文档模型
   */
  createDocument(project: any, schema: any): any;

  /**
   * 创建选择模型
   */
  createSelection(document: any): any;

  /**
   * 创建历史记录模型
   */
  createHistory(document: any): any;

  /**
   * 创建组件元数据模型
   */
  createComponentMeta(componentName: string): any;
}
