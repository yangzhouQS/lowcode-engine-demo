import { SVGIcon, IconProps } from '@alilc/lowcode-utils';

export function IconPage(props: IconProps) {
  return (
    <SVGIcon viewBox="0 0 1024 1024" {...props}>
      <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32z m-40 824H232V136h560v752z" />
      <path d="M304 232h416c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
      <path d="M304 360h416c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
      <path d="M304 488h416c8.8 0 16-7.2 16-16s-7.2-16-16-16H304c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
    </SVGIcon>
  );
}
IconPage.displayName = 'Page';
