/**
 * Props
 * 
 * 属性类,管理节点属性
 * 
 * @public
 */
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { IProps } from '@vue3-lowcode/types';
import { useEventBus } from '@vue3-lowcode/utils';

export class Props implements IProps {
  private props: Record<string, any>;
  private propsRef: Ref<Record<string, any>>;
  private eventBus: ReturnType<typeof useEventBus>;

  constructor(props: Record<string, any> = {}) {
    this.props = { ...props };
    this.propsRef = ref<Record<string, any>>(this.props);
    this.eventBus = useEventBus();
  }

  /**
   * 获取属性
   * 
   * @param path - 属性路径
   * @returns 属性值
   */
  getProp(path: string): any {
    const keys = path.split('.');
    let value = this.props;
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return undefined;
      }
    }
    return value;
  }

  /**
   * 设置属性
   * 
   * @param path - 属性路径
   * @param value - 属性值
   * @returns Promise<void>
   */
  async setProp(path: string, value: any): Promise<void> {
    const keys = path.split('.');
    let obj = this.props;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!obj[key] || typeof obj[key] !== 'object') {
        obj[key] = {};
      }
      obj = obj[key];
    }
    obj[keys[keys.length - 1]] = value;
    this.propsRef.value = { ...this.props };
    this.eventBus.emit('props:change', { path, value });
  }

  /**
   * 获取所有属性
   * 
   * @returns 属性对象
   */
  getProps(): Record<string, any> {
    return { ...this.props };
  }

  /**
   * 设置所有属性
   * 
   * @param props - 属性对象
   * @returns Promise<void>
   */
  async setProps(props: Record<string, any>): Promise<void> {
    this.props = { ...props };
    this.propsRef.value = { ...this.props };
    this.eventBus.emit('props:change', { props });
  }

  /**
   * 检查属性是否存在
   * 
   * @param path - 属性路径
   * @returns 是否存在
   */
  hasProp(path: string): boolean {
    const keys = path.split('.');
    let obj = this.props;
    for (const key of keys) {
      if (obj && typeof obj === 'object' && key in obj) {
        obj = obj[key];
      } else {
        return false;
      }
    }
    return true;
  }

  /**
   * 删除属性
   * 
   * @param path - 属性路径
   * @returns Promise<void>
   */
  async deleteProp(path: string): Promise<void> {
    const keys = path.split('.');
    let obj = this.props;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj && typeof obj === 'object') {
        obj = obj[keys[i]];
      } else {
        return;
      }
    }
    if (obj && typeof obj === 'object') {
      delete obj[keys[keys.length - 1]];
      this.propsRef.value = { ...this.props };
      this.eventBus.emit('props:delete', { path });
    }
  }

  /**
   * 获取 schema
   * 
   * @returns schema
   */
  getSchema(): any {
    return {
      type: 'object',
      properties: this.props,
    };
  }

  /**
   * 设置 schema
   * 
   * @param schema - schema
   * @returns Promise<void>
   */
  async setSchema(schema: any): Promise<void> {
    if (schema.properties) {
      await this.setProps(schema.properties);
    }
  }

  /**
   * 获取属性的响应式引用
   * 
   * @returns 属性的响应式引用
   */
  getPropsRef(): Ref<Record<string, any>> {
    return this.propsRef;
  }

  /**
   * 导出属性
   * 
   * @returns 属性对象
   */
  export(): Record<string, any> {
    return this.getProps();
  }

  /**
   * 导入属性
   * 
   * @param props - 属性对象
   * @returns Promise<void>
   */
  async import(props: Record<string, any>): Promise<void> {
    await this.setProps(props);
    this.eventBus.emit('props:import', { props });
  }

  /**
   * 注册事件监听器
   * 
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  on(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.on(event, listener);
  }

  /**
   * 移除事件监听器
   * 
   * @param event - 事件名称
   * @param listener - 监听器函数
   */
  off(event: string, listener: (...args: any[]) => void): void {
    this.eventBus.off(event, listener);
  }

  /**
   * 清除所有监听器
   */
  clearListeners(): void {
    this.eventBus.clear();
  }
}
