import {
  IPublicTypeComponentSchema,
  IPublicTypeNodeSchema,
  IPublicTypeNodeData,
  IPublicTypePropsMap,
  IPublicTypePropsList,
  IPublicTypeI18nData,
  IPublicTypeCompositeValue,
  IPublicTypeTransformedComponentMetadata,
  IPublicTypeFieldExtraProps,
  IPublicTypeCustomView,
  IPublicTypeTitleContent,
  IPublicTypeIconType,
  IPublicTypeNpmInfo,
  IPublicTypeEditorGetResult,
  IPublicTypeDisposable,
  IPublicTypeLocationChildrenDetail,
  IPublicTypeLocationDetail,
  IPublicTypeDraggable,
  IPublicTypeDroppable,
  IPublicTypeNodeInstance,
  IPublicTypeComponentAction,
  IPublicTypeComponentMetadata,
  IPublicTypePackage,
  IPublicTypeSnippet,
  IPublicTypeRemoteComponentDescription,
  IPublicTypeComponentDescription,
  IPublicTypeAdvanced,
  IPublicTypeConfig,
  IPublicTypeContextMenuAction,
  IPublicTypeContextMenuItem,
  IPublicTypeLiveTextEditingConfig,
  IPublicTypeSetterType,
  IPublicTypeFieldConfig,
  IPublicTypeNodeSchema,
} from '@alilc/lowcode-types';
import { ReactElement } from 'react';

export interface IRenderer {
  /**
   * 获取当前渲染器所在的 simulator 实例
   */
  get simulator(): BuiltinSimulatorHost;

  /**
   * 获取当前渲染器所在的 document 实例
   */
  get document(): any;

  /**
   * 获取当前渲染器所在的 designer 实例
   */
  get designer(): any;

  /**
   * 获取当前渲染器所在的 project 实例
   */
  get project(): any;

  /**
   * 创建组件实例
   * @param component 组件
   * @param props 属性
   */
  createComponent(component: any, props: any): any;

  /**
   * 渲染组件
   * @param component 组件
   * @param props 属性
   * @param children 子元素
   */
  render(component: any, props: any, children?: any): ReactElement;

  /**
   * 获取组件元数据
   * @param componentName 组件名称
   */
  getComponentMeta(componentName: string): IPublicTypeTransformedComponentMetadata | null;

  /**
   * 获取组件实例
   * @param nodeId 节点 ID
   */
  getComponentInstance(nodeId: string): IPublicTypeNodeInstance | null;

  /**
   * 获取 DOM 节点
   * @param nodeId 节点 ID
   */
  getDOMNode(nodeId: string): HTMLElement | null;

  /**
   * 获取节点实例
   * @param nodeId 节点 ID
   */
  getNodeInstance(nodeId: string): any;

  /**
   * 销毁渲染器
   */
  dispose(): void;
}
