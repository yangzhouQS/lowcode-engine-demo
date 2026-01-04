/**
 * Vue3 LowCode Engine - Utils Package
 * CSS 助手工具
 */

/**
 * 解析 CSS 字符串为对象
 */
export function parseCSS(css: string): Record<string, string> {
  const result: Record<string, string> = {};
  const rules = css.split(';');
  
  for (const rule of rules) {
    const [property, value] = rule.split(':').map(s => s.trim());
    if (property && value) {
      result[property] = value;
    }
  }
  
  return result;
}

/**
 * 将 CSS 对象转换为字符串
 */
export function stringifyCSS(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([property, value]) => `${property}: ${value}`)
    .join('; ');
}

/**
 * 转换 kebab-case 为 camelCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 转换 camelCase 为 kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 添加 CSS 单位
 */
export function addUnit(value: number | string, unit: string = 'px'): string {
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }
  return value;
}

/**
 * 移除 CSS 单位
 */
export function removeUnit(value: string): number | string {
  const match = value.match(/^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|deg|s|ms)?$/);
  if (match) {
    return parseFloat(match[1]);
  }
  return value;
}

/**
 * 解析颜色值
 */
export function parseColor(color: string): { r: number; g: number; b: number; a: number } | null {
  // Hex color
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: 1,
    };
  }
  
  // Short hex color
  const shortHexMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (shortHexMatch) {
    return {
      r: parseInt(shortHexMatch[1] + shortHexMatch[1], 16),
      g: parseInt(shortHexMatch[2] + shortHexMatch[2], 16),
      b: parseInt(shortHexMatch[3] + shortHexMatch[3], 16),
      a: 1,
    };
  }
  
  // RGB color
  const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
      a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
    };
  }
  
  return null;
}

/**
 * 颜色转换为 RGBA 字符串
 */
export function toRGBA(
  color: string | { r: number; g: number; b: number; a: number },
  alpha?: number
): string {
  let parsed: { r: number; g: number; b: number; a: number };
  
  if (typeof color === 'string') {
    parsed = parseColor(color) || { r: 0, g: 0, b: 0, a: 1 };
  } else {
    parsed = color;
  }
  
  const a = alpha !== undefined ? alpha : parsed.a;
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${a})`;
}

/**
 * 计算颜色亮度
 */
export function getBrightness(color: string): number {
  const parsed = parseColor(color);
  if (!parsed) return 0;
  
  return (parsed.r * 299 + parsed.g * 587 + parsed.b * 114) / 1000;
}

/**
 * 判断颜色是否为深色
 */
export function isDarkColor(color: string): boolean {
  return getBrightness(color) < 128;
}

/**
 * 判断颜色是否为浅色
 */
export function isLightColor(color: string): boolean {
  return !isDarkColor(color);
}

/**
 * 解析 CSS 选择器
 */
export function parseSelector(selector: string): {
  tag?: string;
  id?: string;
  classes: string[];
  attributes: string[];
  pseudoClasses: string[];
  pseudoElements: string[];
} {
  const result = {
    classes: [],
    attributes: [],
    pseudoClasses: [],
    pseudoElements: [],
  };
  
  // Parse ID
  const idMatch = selector.match(/#([a-zA-Z][\w-]*)/);
  if (idMatch) {
    result.id = idMatch[1];
  }
  
  // Parse classes
  const classMatches = selector.matchAll(/\.([a-zA-Z][\w-]*)/g);
  for (const match of classMatches) {
    result.classes.push(match[1]);
  }
  
  // Parse tag
  const tagMatch = selector.match(/^([a-zA-Z][\w-]*)/);
  if (tagMatch && !idMatch && result.classes.length === 0) {
    result.tag = tagMatch[1];
  }
  
  // Parse attributes
  const attrMatches = selector.matchAll(/\[([^\]]+)\]/g);
  for (const match of attrMatches) {
    result.attributes.push(match[1]);
  }
  
  // Parse pseudo-classes
  const pseudoClassMatches = selector.matchAll(/:([a-zA-Z-]+)(?=\(|:|\.|,|$)/g);
  for (const match of pseudoClassMatches) {
    result.pseudoClasses.push(match[1]);
  }
  
  // Parse pseudo-elements
  const pseudoElementMatches = selector.matchAll(/::([a-zA-Z-]+)/g);
  for (const match of pseudoElementMatches) {
    result.pseudoElements.push(match[1]);
  }
  
  return result;
}

/**
 * 合并 CSS 对象
 */
export function mergeCSS(...objects: Record<string, string>[]): Record<string, string> {
  return Object.assign({}, ...objects);
}

/**
 * 转换内联样式为 CSS 字符串
 */
export function inlineStyleToCSS(style: Record<string, any>): string {
  const css: string[] = [];
  
  for (const [property, value] of Object.entries(style)) {
    if (value !== undefined && value !== null) {
      css.push(`${camelToKebab(property)}: ${value}`);
    }
  }
  
  return css.join('; ');
}

/**
 * 转换 CSS 字符串为内联样式对象
 */
export function cssToInlineStyle(css: string): Record<string, string> {
  const result: Record<string, string> = {};
  const parsed = parseCSS(css);
  
  for (const [property, value] of Object.entries(parsed)) {
    result[kebabToCamel(property)] = value;
  }
  
  return result;
}

/**
 * 获取 CSS 变量值
 */
export function getCSSVariable(name: string, element: HTMLElement = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/**
 * 设置 CSS 变量值
 */
export function setCSSVariable(
  name: string,
  value: string,
  element: HTMLElement = document.documentElement
): void {
  element.style.setProperty(name, value);
}

/**
 * 移除 CSS 变量
 */
export function removeCSSVariable(
  name: string,
  element: HTMLElement = document.documentElement
): void {
  element.style.removeProperty(name);
}
