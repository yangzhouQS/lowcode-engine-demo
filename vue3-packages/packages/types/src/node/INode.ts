/**
 * INode Interface
 * 
 * 节点接口,表示低代码文档中的一个节点
 * 
 * @public
 */
export interface INode {
  /**
   * 节点 ID
   */
  id: string;

  /**
   * 节点类型
   */
  type: string;

  /**
   * 节点名称
   */
  componentName: string;

  /**
   * 父节点
   */
  parent?: INode;

  /**
   * 获取属性
   * 
   * @param path - 属性路径
   * @returns 属性
   */
  getProp(path: string): any;

  /**
   * 设置属性
   * 
   * @param path - 属性路径
   * @param value - 属性值
   * @returns Promise<void>
   */
  setProp(path: string, value: any): Promise<void>;

  /**
   * 获取所有属性
   * 
   * @returns 属性列表
   */
  getProps(): any;

  /**
   * 设置所有属性
   * 
   * @param props - 属性对象
   * @returns Promise<void>
   */
  setProps(props: any): Promise<void>;

  /**
   * 添加子节点
   * 
   * @param node - 子节点
   * @returns Promise<void>
   */
  addChild(node: any): Promise<void>;

  /**
   * 移除子节点
   * 
   * @param node - 子节点
   * @returns Promise<void>
   */
  removeChild(node: any): Promise<void>;

  /**
   * 获取子节点
   * 
   * @returns 子节点列表
   */
  getChildren(): any[];

  /**
   * 获取父节点
   * 
   * @returns 父节点
   */
  getParent(): any;

  /**
   * 获取兄弟节点
   * 
   * @returns 兄弟节点列表
   */
  getSibling(): any[];

  /**
   * 获取索引
   * 
   * @returns 索引
   */
  getIndex(): number;

  /**
   * 导出 schema
   * 
   * @returns schema
   */
  export(): any;
}
