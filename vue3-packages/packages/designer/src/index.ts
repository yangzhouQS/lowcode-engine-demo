/**
 * @vue3-lowcode/designer
 * 
 * Vue3 低代码框架设计器包
 * 提供文档模型、节点管理、拖拽系统、选区管理、历史记录等功能
 */

// 导出 Designer
export { Designer } from './designer/Designer';

// 导出 DocumentModel
export { DocumentModel } from './document/DocumentModel';

// 导出 Document
export { Document } from './document/Document';

// 导出 Node
export { Node } from './node/Node';

// 导出 Props
export { Props } from './props/Props';

// 导出 Dragon
export { Dragon } from './dragon/Dragon';

// 导出 Selection
export { Selection } from './selection/Selection';

// 导出 History
export { History } from './history/History';

// 导出 BuiltinSimulatorHost
export { BuiltinSimulatorHost } from './simulator/BuiltinSimulatorHost';

// 导出类型
export type { IDesigner } from '@vue3-lowcode/types';
export type { IDocumentModel } from '@vue3-lowcode/types';
export type { IDocument } from '@vue3-lowcode/types';
export type { INode } from '@vue3-lowcode/types';
export type { IProps } from '@vue3-lowcode/types';
