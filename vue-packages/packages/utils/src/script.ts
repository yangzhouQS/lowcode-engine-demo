/**
 * Vue3 LowCode Engine - Utils Package
 * 脚本加载相关工具
 */

export function load(url: string, scriptType?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

export function evaluate(code: string, scriptType?: string): void {
  const script = document.createElement('script');
  script.text = code;
  document.head.appendChild(script);
  document.head.removeChild(script);
}
