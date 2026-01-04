import { SVGIcon, IconProps } from '@alilc/lowcode-utils';

export function IconContainer(props: IconProps) {
  return (
    <SVGIcon viewBox="0 0 1024 1024" {...props}>
      <path d="M128 128h768v768H128z" fill="none" stroke="currentColor" strokeWidth="32" />
      <path d="M192 192h640v640H192z" fill="none" stroke="currentColor" strokeWidth="32" />
      <path d="M256 256h512v512H256z" fill="none" stroke="currentColor" strokeWidth="32" />
    </SVGIcon>
  );
}
IconContainer.displayName = 'Container';
