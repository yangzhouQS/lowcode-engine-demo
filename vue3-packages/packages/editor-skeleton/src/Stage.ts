import { shallowRef, type Ref } from 'vue';
import { isString } from '@vue3-lowcode/utils';
import type { StageConfig, ISkeleton, IStage } from './types';

/**
 * Stage 类
 * 舞台实现，用于管理编辑器中的舞台
 */
export class Stage implements IStage {
  readonly isStage = true;

  readonly skeleton: ISkeleton;

  readonly name: string;

  readonly title: string;

  readonly content: any;

  readonly props: Record<string, any>;

  readonly area: string;

  private _actived: Ref<boolean> = shallowRef(false);

  constructor(skeleton: ISkeleton, config: StageConfig) {
    this.skeleton = skeleton;
    this.name = config.name || '';
    this.title = config.title || config.name || '';
    this.content = config.content;
    this.props = config.props || {};
    this.area = config.area || 'mainArea';
  }

  get actived(): boolean {
    return this._actived.value;
  }

  set actived(value: boolean) {
    this._actived.value = value;
  }

  /**
   * 激活舞台
   */
  active(): void {
    this.actived = true;
  }

  /**
   * 取消激活舞台
   */
  unactive(): void {
    this.actived = false;
  }

  /**
   * 切换激活状态
   */
  toggle(): void {
    this.actived = !this.actived;
  }

  /**
   * 获取舞台内容
   */
  getContent(): any {
    return this.content;
  }

  /**
   * 获取舞台属性
   */
  getProps(): Record<string, any> {
    return this.props;
  }

  /**
   * 获取舞台名称
   */
  getName(): string {
    return this.name;
  }

  /**
   * 获取舞台标题
   */
  getTitle(): string {
    return this.title;
  }
}

export function isStage(obj: any): obj is Stage {
  return obj && obj.isStage === true;
}
