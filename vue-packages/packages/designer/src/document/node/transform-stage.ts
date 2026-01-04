import { IPublicEnumTransformStage } from '@alilc/lowcode-types';

/**
 * 兼容 stage
 * @param stage
 * @returns
 */
export function compatStage(stage: IPublicEnumTransformStage): IPublicEnumTransformStage {
  if (!stage) {
    return IPublicEnumTransformStage.Save;
  }
  return stage;
}
