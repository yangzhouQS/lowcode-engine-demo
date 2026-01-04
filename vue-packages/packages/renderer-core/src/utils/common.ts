import { isJSExpression, isJSFunction, isI18nData, isJSSlot, isSchema, isEmpty } from '@vue3-engine/utils';

export function forEach(obj: any, fn: (val: any, key: string) => void) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach((key) => {
    fn(obj[key], key);
  });
}

export function getValue(obj: any, path: string, defaultValue?: any) {
  if (!obj || !path) {
    return defaultValue;
  }
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
}

export function parseData(data: any, context: any, options?: { thisRequired?: boolean; logScope?: string }): any {
  if (isJSExpression(data)) {
    return parseExpression(data, context, options);
  }
  if (isJSFunction(data)) {
    return parseFunction(data, context, options);
  }
  if (isI18nData(data)) {
    return parseI18n(data, context);
  }
  if (isJSSlot(data)) {
    return data;
  }
  return data;
}

export function parseExpression(expr: any, context: any, options?: { thisRequired?: boolean; logScope?: string }): any {
  if (!isJSExpression(expr)) {
    return expr;
  }
  const { value } = expr;
  const thisRequired = options?.thisRequired ?? true;
  
  try {
    if (thisRequired) {
      const fn = new Function('this', `return ${value}`);
      return fn.call(context, context);
    } else {
      const fn = new Function(value);
      return fn.call(context);
    }
  } catch (e) {
    console.error(`[Renderer] Failed to parse expression in ${options?.logScope || 'unknown'}:`, expr, e);
    return undefined;
  }
}

export function parseFunction(fn: any, context: any, options?: { thisRequired?: boolean; logScope?: string }): Function {
  if (!isJSFunction(fn)) {
    return fn;
  }
  const { value } = fn;
  const thisRequired = options?.thisRequired ?? true;
  
  try {
    if (thisRequired) {
      const func = new Function('this', `return ${value}`);
      return func.bind(context, context);
    } else {
      const func = new Function(value);
      return func.bind(context);
    }
  } catch (e) {
    console.error(`[Renderer] Failed to parse function in ${options?.logScope || 'unknown'}:`, fn, e);
    return () => {};
  }
}

export function parseI18n(data: any, context: any): any {
  if (!isI18nData(data)) {
    return data;
  }
  const { use, key, params } = data;
  const locale = use || 'zh-CN';
  const i18n = context?.i18n || ((key: string, values: any) => key);
  return i18n(key, params);
}

export function isSchema(schema: any): boolean {
  return schema && typeof schema === 'object' && schema.componentName;
}

export function isFileSchema(schema: any): boolean {
  return isSchema(schema) && (schema.componentName === 'Page' || schema.componentName === 'Block' || schema.componentName === 'Component');
}

export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  if (typeof value === 'string') return value === '';
  return false;
}

export function transformArrayToMap(arr: any[], key: string): Record<string, any> {
  if (!Array.isArray(arr)) {
    return {};
  }
  const result: Record<string, any> = {};
  arr.forEach((item) => {
    if (item && item[key]) {
      result[item[key]] = item;
    }
  });
  return result;
}

export function transformStringToFunction(fn: any): Function {
  if (typeof fn === 'function') {
    return fn;
  }
  if (fn && typeof fn.value === 'string') {
    try {
      return new Function(`return ${fn.value}`)();
    } catch (e) {
      console.error('[Renderer] Failed to transform string to function:', fn, e);
      return () => {};
    }
  }
  return fn;
}

export function getI18n(key: string, values: any, locale: string, messages: Record<string, any>): string {
  if (!messages || !messages[locale]) {
    return key;
  }
  const message = messages[locale][key] || key;
  if (!values || typeof values !== 'object') {
    return message;
  }
  return message.replace(/\{\s*(\w+)\s*\}/g, (match: string, p1: string) => {
    return values[p1] !== undefined ? String(values[p1]) : match;
  });
}

export function getFileCssName(fileName?: string): string {
  if (!fileName) {
    return '';
  }
  return fileName.replace(/[^a-zA-Z0-9_-]/g, '-');
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
