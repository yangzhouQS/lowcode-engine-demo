/**
 * Vue3 LowCode Engine - Utils Package
 * 属性类型检查工具
 */

export type PropType = 
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'function'
  | 'any'
  | 'node'
  | 'element';

export interface PropDefinition {
  type: PropType | PropType[];
  required?: boolean;
  default?: any;
  validator?: (value: any) => boolean;
}

export interface PropCheckResult {
  isValid: boolean;
  errors: string[];
}

export function checkPropTypes(
  props: Record<string, any>,
  definitions: Record<string, PropDefinition>,
  componentName: string = 'Component'
): PropCheckResult {
  const errors: string[] = [];

  for (const propName in definitions) {
    const propDef = definitions[propName];
    const propValue = props[propName];

    // 检查必填属性
    if (propDef.required && propValue === undefined) {
      errors.push(
        `Missing required prop "${propName}" in ${componentName}.`
      );
      continue;
    }

    // 如果属性值未定义且非必填，跳过类型检查
    if (propValue === undefined) {
      continue;
    }

    // 检查类型
    const types = Array.isArray(propDef.type) ? propDef.type : [propDef.type];
    let typeValid = false;

    for (const type of types) {
      if (checkType(propValue, type)) {
        typeValid = true;
        break;
      }
    }

    if (!typeValid) {
      const typeNames = types.join(' | ');
      errors.push(
        `Invalid prop "${propName}" of type "${typeof propValue}" supplied to ${componentName}, expected ${typeNames}.`
      );
    }

    // 检查自定义验证器
    if (propDef.validator && !propDef.validator(propValue)) {
      errors.push(
        `Prop "${propName}" failed custom validation in ${componentName}.`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function checkType(value: any, type: PropType): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    case 'any':
      return true;
    case 'node':
      // 检查是否为 Vue VNode
      return value && typeof value === 'object' && value.__v_isVNode === true;
    case 'element':
      // 检查是否为 DOM 元素
      return value && typeof value === 'object' && value.nodeType === 1;
    default:
      return false;
  }
}

export function createPropDefinition(
  type: PropType | PropType[],
  options: Omit<PropDefinition, 'type'> = {}
): PropDefinition {
  return {
    type,
    ...options,
  };
}

// 预定义的常用属性定义
export const commonPropTypes = {
  string: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('string', options),
  number: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('number', options),
  boolean: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('boolean', options),
  object: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('object', options),
  array: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('array', options),
  function: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('function', options),
  any: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('any', options),
  node: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('node', options),
  element: (options?: Omit<PropDefinition, 'type'>) => createPropDefinition('element', options),
};
