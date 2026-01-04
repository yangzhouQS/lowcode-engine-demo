/**
 * Vue3 LowCode Engine - Utils Package
 * CSS URL检查相关工具
 */

const CSS_URL_RE = /^(https?:|data:|blob:)/i;

export function isCSSUrl(url: string): boolean {
  return CSS_URL_RE.test(url);
}
