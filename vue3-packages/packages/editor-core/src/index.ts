/**
 * @vue3-lowcode/editor-core
 * Vue3 低代码引擎编辑器核心包
 */

// Editor
export { Editor, EditorState, type EditorOptions } from './editor/Editor';

// EventBus
export { EventBus, type EventHandler, type EventBusOptions } from './event-bus/EventBus';

// Command
export { Command, type CommandHandler, type CommandOptions } from './command';

// Config
export { Config, type ConfigOptions } from './config/Config';

// Hotkey
export { Hotkey, type HotkeyHandler, type HotkeyOptions } from './hotkey/Hotkey';

// DIContainer
export { DIContainer, type Factory, type Instance, type DIOptions, type DIContainerOptions, type DIHandler } from './di';

// Intl
export { Intl, type IntlMessages, type IntlOptions, type IntlLocale } from './intl/index';

// SetterRegistry
export { SetterRegistry, type SetterConfig, type SetterRegistryOptions, type SetterInfo } from './setters/index';
