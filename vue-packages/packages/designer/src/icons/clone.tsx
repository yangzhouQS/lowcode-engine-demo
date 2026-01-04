import { SVGIcon, IconProps } from '@alilc/lowcode-utils';

export function IconClone(props: IconProps) {
  return (
    <SVGIcon viewBox="0 0 1024 1024" {...props}>
      <path d="M736 160H224c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H264V232h432v560z" />
      <path d="M800 64h-512c-17.7 0-32 14.3-32 32v64h544v640h64c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32z" />
    </SVGIcon>
  );
}
IconClone.displayName = 'Clone';
