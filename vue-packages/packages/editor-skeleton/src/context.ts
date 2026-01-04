import { InjectionKey, inject, provide } from 'vue';
import { ISkeleton } from './skeleton';

export const SkeletonContextKey: InjectionKey<ISkeleton> = Symbol('SkeletonContext');

export function provideSkeleton(skeleton: ISkeleton) {
  provide(SkeletonContextKey, skeleton);
}

export function useSkeleton(): ISkeleton {
  const skeleton = inject(SkeletonContextKey);
  if (!skeleton) {
    throw new Error('Skeleton context not found');
  }
  return skeleton;
}

export { SkeletonContextKey as SkeletonContext };
