/**
 * @vue3-lowcode/designer
 * 
 * 设计器包,提供设计器核心功能
 * 
 * @public
 */

// Designer
export { Designer } from './designer/Designer';
export type { DesignerConfig } from './designer/Designer';

// DocumentModel
export { DocumentModel } from './document/DocumentModel';

// Document
export { Document } from './document/Document';

// Node
export { Node } from './node/Node';

// Props
export { Props } from './props/Props';

// Dragon
export { Dragon } from './dragon/Dragon';

// Selection
export { Selection } from './selection/Selection';

// History
export { History } from './history/History';
export type { HistoryRecord } from './history/History';

// BuiltinSimulatorHost
export { BuiltinSimulatorHost } from './simulator/BuiltinSimulatorHost';
export type { SimulatorConfig } from './simulator/BuiltinSimulatorHost';

// Re-export types from @vue3-lowcode/types
export type {
  IDocumentModel,
  IDocument,
  INode,
  IProps,
  IProp,
  ISlot,
} from '@vue3-lowcode/types';
