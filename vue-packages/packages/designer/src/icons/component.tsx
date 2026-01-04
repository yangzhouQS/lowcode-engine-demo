import { SVGIcon, IconProps } from '@alilc/lowcode-utils';

export function IconComponent(props: IconProps) {
  return (
    <SVGIcon viewBox="0 0 1024 1024" {...props}>
      <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32z m-600 72h560v208H232V136z m560 752H232V408h560v480z" />
      <path d="M304 232h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
      <path d="M304 504h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
      <path d="M304 600h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
      <path d="M304 696h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
    </SVGIcon>
  );
}
IconComponent.displayName = 'Component';
