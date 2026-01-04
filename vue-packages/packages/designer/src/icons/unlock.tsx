import { SVGIcon, IconProps } from '@alilc/lowcode-utils';

export function IconUnlock(props: IconProps) {
  return (
    <SVGIcon viewBox="0 0 1024 1024" {...props}>
      <path d="M832 464h-64V224c0-70.7-57.3-128-128-128H384c-70.7 0-128 57.3-128 128v80h64v-80c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v240H192c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32z m-40 376H232V528h560v312z" />
      <path d="M512 640c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z" />
    </SVGIcon>
  );
}
IconUnlock.displayName = 'Unlock';
