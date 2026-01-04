/**
 * Vue3 LowCode Engine - Utils Package
 * 节点助手相关工具
 */

export interface NodeLike {
  id?: string;
  componentName?: string;
  children?: NodeLike[] | string;
  props?: Record<string, any>;
  [key: string]: any;
}

/**
 * 获取节点 ID
 */
export function getNodeId(node: NodeLike): string | undefined {
  return node.id;
}

/**
 * 设置节点 ID
 */
export function setNodeId(node: NodeLike, id: string): void {
  node.id = id;
}

/**
 * 获取节点组件名
 */
export function getNodeComponentName(node: NodeLike): string | undefined {
  return node.componentName;
}

/**
 * 设置节点组件名
 */
export function setNodeComponentName(node: NodeLike, componentName: string): void {
  node.componentName = componentName;
}

/**
 * 获取节点属性
 */
export function getNodeProps(node: NodeLike): Record<string, any> {
  return node.props || {};
}

/**
 * 设置节点属性
 */
export function setNodeProps(node: NodeLike, props: Record<string, any>): void {
  node.props = props;
}

/**
 * 获取节点子节点
 */
export function getNodeChildren(node: NodeLike): NodeLike[] | string | undefined {
  return node.children;
}

/**
 * 设置节点子节点
 */
export function setNodeChildren(node: NodeLike, children: NodeLike[] | string): void {
  node.children = children;
}

/**
 * 添加子节点
 */
export function addNodeChild(node: NodeLike, child: NodeLike): void {
  if (!node.children) {
    node.children = [];
  }
  if (typeof node.children === 'string') {
    node.children = [node.children];
  }
  node.children.push(child);
}

/**
 * 移除子节点
 */
export function removeNodeChild(node: NodeLike, childId: string): boolean {
  if (!node.children || typeof node.children === 'string') {
    return false;
  }
  const index = node.children.findIndex(child => child.id === childId);
  if (index !== -1) {
    node.children.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * 查找子节点
 */
export function findNodeChild(node: NodeLike, childId: string): NodeLike | null {
  if (!node.children || typeof node.children === 'string') {
    return null;
  }
  return node.children.find(child => child.id === childId) || null;
}

/**
 * 深度遍历节点
 */
export function traverseNode(node: NodeLike, visitor: (node: NodeLike) => void): void {
  visitor(node);
  
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(child => traverseNode(child, visitor));
  }
}

/**
 * 查找节点
 */
export function findNode(root: NodeLike, predicate: (node: NodeLike) => boolean): NodeLike | null {
  if (predicate(root)) {
    return root;
  }
  
  if (root.children && Array.isArray(root.children)) {
    for (const child of root.children) {
      const found = findNode(child, predicate);
      if (found) return found;
    }
  }
  
  return null;
}

/**
 * 通过 ID 查找节点
 */
export function findNodeById(root: NodeLike, id: string): NodeLike | null {
  return findNode(root, node => node.id === id);
}

/**
 * 通过组件名查找所有节点
 */
export function findNodesByComponentName(root: NodeLike, componentName: string): NodeLike[] {
  const result: NodeLike[] = [];
  traverseNode(root, node => {
    if (node.componentName === componentName) {
      result.push(node);
    }
  });
  return result;
}

/**
 * 获取节点路径
 */
export function getNodePath(root: NodeLike, targetId: string): NodeLike[] | null {
  const path: NodeLike[] = [];
  
  function search(node: NodeLike): boolean {
    path.push(node);
    
    if (node.id === targetId) {
      return true;
    }
    
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (search(child)) {
          return true;
        }
      }
    }
    
    path.pop();
    return false;
  }
  
  return search(root) ? path : null;
}

/**
 * 获取节点深度
 */
export function getNodeDepth(root: NodeLike, targetId: string): number {
  const path = getNodePath(root, targetId);
  return path ? path.length - 1 : -1;
}

/**
 * 克隆节点
 */
export function cloneNode<T extends NodeLike>(node: T): T {
  return JSON.parse(JSON.stringify(node));
}

/**
 * 合并节点属性
 */
export function mergeNodeProps(node: NodeLike, props: Record<string, any>): void {
  node.props = { ...node.props, ...props };
}

/**
 * 判断节点是否为叶子节点
 */
export function isLeafNode(node: NodeLike): boolean {
  return !node.children || 
         typeof node.children === 'string' || 
         node.children.length === 0;
}

/**
 * 统计节点数量
 */
export function countNodes(root: NodeLike): number {
  let count = 0;
  traverseNode(root, () => count++);
  return count;
}

/**
 * 获取所有节点 ID
 */
export function getAllNodeIds(root: NodeLike): string[] {
  const ids: string[] = [];
  traverseNode(root, node => {
    if (node.id) {
      ids.push(node.id);
    }
  });
  return ids;
}
