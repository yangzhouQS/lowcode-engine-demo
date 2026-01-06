/**
 * IProp Interface
 * 
 * 属性接口,表示单个属性
 * 
 * @public
 */
export interface IProp {
  /**
   * 属性路径
   */
  path: string;

  /**
   * 属性值
   */
  value: any;

  /**
   * 属性类型
   */
  type: string;

  /**
   * 属性元数据
   */
  meta: any;

  /**
   * 获取属性值
   * 
   * @returns 属性值
   */
  getValue(): any;

  /**
   * 设置属性值
   * 
   * @param value - 属性值
   * @returns Promise<void>
   */
  setValue(value: any): Promise<void>;

  /**
   * 导出属性
   * 
   * @returns 属性对象
   */
  export(): any;
}
