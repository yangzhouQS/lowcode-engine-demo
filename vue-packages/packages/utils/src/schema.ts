/**
 * Vue3 LowCode Engine - Utils Package
 * Schema 相关工具
 */

export interface SchemaNode {
  componentName?: string;
  props?: Record<string, any>;
  children?: SchemaNode[] | string;
  id?: string;
  fileName?: string;
}

export interface Schema {
  componentName?: string;
  props?: Record<string, any>;
  children?: SchemaNode[] | string;
  state?: Record<string, any>;
  lifeCycles?: Record<string, string>;
  methods?: Record<string, string>;
  dataSource?: any;
  css?: string;
}

/**
 * 深度遍历 Schema
 */
export function traverseSchema(
  schema: Schema | SchemaNode,
  visitor: (node: SchemaNode) => void
): void {
  if (!schema) return;

  visitor(schema as SchemaNode);

  if (schema.children) {
    const children = Array.isArray(schema.children) ? schema.children : [schema.children];
    children.forEach(child => {
      if (typeof child === 'object') {
        traverseSchema(child, visitor);
      }
    });
  }
}

/**
 * 查找 Schema 节点
 */
export function findSchemaNode(
  schema: Schema | SchemaNode,
  predicate: (node: SchemaNode) => boolean
): SchemaNode | null {
  if (!schema) return null;

  if (predicate(schema as SchemaNode)) {
    return schema as SchemaNode;
  }

  if (schema.children) {
    const children = Array.isArray(schema.children) ? schema.children : [schema.children];
    for (const child of children) {
      if (typeof child === 'object') {
        const found = findSchemaNode(child, predicate);
        if (found) return found;
      }
    }
  }

  return null;
}

/**
 * 查找所有匹配的 Schema 节点
 */
export function findSchemaNodes(
  schema: Schema | SchemaNode,
  predicate: (node: SchemaNode) => boolean
): SchemaNode[] {
  const result: SchemaNode[] = [];

  traverseSchema(schema, node => {
    if (predicate(node)) {
      result.push(node);
    }
  });

  return result;
}

/**
 * 通过 ID 查找 Schema 节点
 */
export function findSchemaNodeById(
  schema: Schema | SchemaNode,
  id: string
): SchemaNode | null {
  return findSchemaNode(schema, node => node.id === id);
}

/**
 * 通过组件名查找 Schema 节点
 */
export function findSchemaNodesByComponentName(
  schema: Schema | SchemaNode,
  componentName: string
): SchemaNode[] {
  return findSchemaNodes(schema, node => node.componentName === componentName);
}

/**
 * 验证 Schema
 */
export function validateSchema(schema: Schema): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!schema || typeof schema !== 'object') {
    errors.push('Schema must be an object');
    return { valid: false, errors };
  }

  traverseSchema(schema, node => {
    if (node.componentName && typeof node.componentName !== 'string') {
      errors.push(`Component name must be a string, got ${typeof node.componentName}`);
    }

    if (node.props && typeof node.props !== 'object') {
      errors.push(`Props must be an object, got ${typeof node.props}`);
    }

    if (node.id && typeof node.id !== 'string') {
      errors.push(`ID must be a string, got ${typeof node.id}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 克隆 Schema
 */
export function cloneSchema<T extends Schema | SchemaNode>(schema: T): T {
  return JSON.parse(JSON.stringify(schema));
}

/**
 * 合并 Schema
 */
export function mergeSchema(base: Schema, override: Partial<Schema>): Schema {
  return {
    ...base,
    ...override,
    props: { ...base.props, ...override.props },
    state: { ...base.state, ...override.state },
    lifeCycles: { ...base.lifeCycles, ...override.lifeCycles },
    methods: { ...base.methods, ...override.methods },
  };
}

/**
 * 转换 Schema 为字符串
 */
export function schemaToString(schema: Schema, indent: number = 2): string {
  return JSON.stringify(schema, null, indent);
}

/**
 * 从字符串解析 Schema
 */
export function stringToSchema(str: string): Schema {
  return JSON.parse(str);
}

/**
 * 生成 Schema ID
 */
export function generateSchemaId(): string {
  return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 为 Schema 节点生成唯一 ID
 */
export function assignSchemaIds(schema: Schema | SchemaNode): void {
  traverseSchema(schema, node => {
    if (!node.id) {
      node.id = generateSchemaId();
    }
  });
}
