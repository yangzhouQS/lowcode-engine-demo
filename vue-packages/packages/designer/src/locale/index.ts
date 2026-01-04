import { IPublicTypeLocale } from '@alilc/lowcode-types';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

export { enUS, zhCN };

export const localeMap: Record<string, IPublicTypeLocale> = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

export function getLocale(locale?: string): IPublicTypeLocale {
  return localeMap[locale || 'zh-CN'] || zhCN;
}
