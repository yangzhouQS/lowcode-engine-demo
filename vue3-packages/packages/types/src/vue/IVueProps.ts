/**
 * IVueProps Interface
 * 
 * Vue3属性接口,定义Vue3组件属性的基本类型
 * 
 * @public
 */
export interface IVueProps {
  /**
   * 属性值
   */
  [key: string]: any;
}

/**
 * PropOptions Interface
 * 
 * 属性选项接口
 * 
 * @public
 */
export interface PropOptions<T = any> {
  /**
   * 属性类型
   */
  type?: PropType<T> | PropType<T>[];

  /**
   * 属性是否必填
   */
  required?: boolean;

  /**
   * 属性默认值
   */
  default?: T | (() => T) | null | undefined;

  /**
   * 属性验证器
   */
  validator?: (value: T) => boolean;
}

/**
 * PropType Interface
 * 
 * 属性类型接口
 * 
 * @public
 */
export type PropType<T> =
  | { new (...args: any[]): T & {} }
  | { (): T };

/**
 * PropConstructor Interface
 * 
 * 属性构造函数接口
 * 
 * @public
 */
export type PropConstructor<T> =
  | { new (...args: any[]): T & {} }
  | { (): T };

/**
 * PropDefinition Interface
 * 
 * 属性定义接口
 * 
 * @public
 */
export type PropDefinition<T> =
  | PropOptions<T>
  | PropType<T>
  | PropType<T>[];

/**
 * PropsDefinition Interface
 * 
 * 属性定义集合接口
 * 
 * @public
 */
export type PropsDefinition<T> =
  | {
      [K in keyof T]: PropDefinition<T[K]>;
    }
  | string[];
