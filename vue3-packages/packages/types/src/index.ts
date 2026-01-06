/**
 * @vue3-lowcode/types
 * 
 * TypeScript type definitions for Vue3 LowCode Engine
 * 
 * @packageDocumentation
 */

// Shell API Types
export * from './shell/IShell'
export * from './shell/IShellModel'
export * from './shell/IShellConfig'

// Model Types
export * from './model/IEditor'
export * from './model/IDesigner'
export * from './model/IDocumentModel'
export * from './model/IDocument'

// Node Types
export * from './node/INode'
export * from './node/IProps'
export * from './node/IProp'
export * from './node/ISlot'

// Renderer Types
export * from './renderer/IRuntime'
export * from './renderer/IRenderer'
export * from './renderer/IRendererProps'
export * from './renderer/IBaseRendererInstance'

// Plugin Types
export * from './plugin/IPlugin'
export * from './plugin/IPluginContext'
export * from './plugin/IPluginManager'
export * from './plugin/IPluginConfig'

// Material Types
export * from './material/IComponentMeta'
export * from './material/IPropMeta'
export * from './material/IEventMeta'
export * from './material/ISlotMeta'
export * from './material/ISchema'

// Vue3 Specific Types
export * from './vue/IVueComponent'
export * from './vue/IVueProps'
export * from './vue/IVueContext'
export * from './vue/IVueEvent'
