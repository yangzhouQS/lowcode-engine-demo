/**
 * @vue3-lowcode/utils
 * 
 * Utility functions for Vue3 LowCode Engine
 * 
 * This package provides a collection of utility functions for common operations
 * including type guards, object manipulation, array manipulation, string manipulation,
 * function manipulation, and Vue3-specific utilities.
 */

// Type Guards
export * from './guards/isString'
export * from './guards/isNumber'
export * from './guards/isBoolean'
export * from './guards/isObject'
export * from './guards/isArray'
export * from './guards/isFunction'
export * from './guards/isNil'
export * from './guards/isPlainObject'

// Object Operations
export * from './object/get'
export * from './object/set'
export * from './object/has'
export * from './object/keys'
export * from './object/values'
export * from './object/entries'
export * from './object/merge'
export * from './object/clone'
export * from './object/deepMerge'

// Array Operations
export * from './array/first'
export * from './array/last'
export * from './array/flatten'
export * from './array/uniq'
export * from './array/chunk'
export * from './array/groupBy'
export * from './array/sortBy'
export * from './array/findIndex'
export * from './array/find'

// String Operations
export * from './string/camelCase'
export * from './string/kebabCase'
export * from './string/snakeCase'
export * from './string/pascalCase'
export * from './string/capitalize'
export * from './string/lowerCase'
export * from './string/upperCase'
export * from './string/trim'
export * from './string/startsWith'
export * from './string/endsWith'

// Function Operations
export * from './function/debounce'
export * from './function/throttle'
export * from './function/memoize'
export * from './function/once'
export * from './function/compose'
export * from './function/pipe'
export * from './function/curry'
export * from './function/partial'

// Vue3 Specific Utilities
export * from './vue/useRef'
export * from './vue/useReactive'
export * from './vue/useComputed'
export * from './vue/useWatch'
export * from './vue/useWatchEffect'
export * from './vue/useProvide'
export * from './vue/useInject'
export * from './vue/useEventBus'
