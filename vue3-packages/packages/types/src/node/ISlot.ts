/**
 * ISlot Interface
 * 
 * 插槽接口,表示组件的插槽
 * 
 * @public
 */
export interface ISlot {
  /**
   * 插槽 ID
   */
  id: string;

  /**
   * 插槽名称
   */
  name: string;

  /**
   * 插槽类型
   */
  type: string;

  /**
   * 插槽值
   */
  value: any;

  /**
   * 插槽元数据
   */
  meta: any;

  /**
   * 获取插槽值
   * 
   * @returns 插槽值
   */
  getValue(): any;

  /**
   * 设置插槽值
   * 
   * @param value - 插槽值
   * @returns Promise<void>
   */
  setValue(value: any): Promise<void>;

  /**
   * 导出插槽
   * 
   * @returns 插槽对象
   */
  export(): any;
}
