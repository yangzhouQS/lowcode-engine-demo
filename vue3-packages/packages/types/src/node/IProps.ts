/**
 * IProps Interface
 *
 * 属性接口,表示节点的属性集合
 *
 * @public
 */
import type { Ref } from 'vue';

export interface IProps {
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
   * @returns 属性对象
   */
  getProps(): Record<string, any>;

  /**
   * 设置所有属性
   *
   * @param props - 属性对象
   * @returns Promise<void>
   */
  setProps(props: Record<string, any>): Promise<void>;

  /**
   * 检查属性是否存在
   *
   * @param path - 属性路径
   * @returns 是否存在
   */
  hasProp(path: string): boolean;

  /**
   * 删除属性
   *
   * @param path - 属性路径
   * @returns Promise<void>
   */
  deleteProp(path: string): Promise<void>;

  /**
   * 获取 schema
   *
   * @returns schema
   */
  getSchema(): any;

  /**
   * 设置 schema
   *
   * @param schema - schema
   * @returns Promise<void>
   */
  setSchema(schema: any): Promise<void>;

  /**
   * 获取属性的响应式引用
   *
   * @returns 属性的响应式引用
   */
  getPropsRef(): Ref<Record<string, any>>;

  /**
   * 导出属性
   *
   * @returns 属性对象
   */
  export(): Record<string, any>;

  /**
   * 导入属性
   *
   * @param props - 属性对象
   * @returns Promise<void>
   */
  import(props: Record<string, any>): Promise<void>;

  /**
   * 注册事件监听器
   *
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  on(event: string, listener: (...args: any[]) => void): void;

  /**
   * 移除事件监听器
   *
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  off(event: string, listener: (...args: any[]) => void): void;

  /**
   * 清除所有监听器
   */
  clearListeners(): void;
}
