/**
 * Intl 国际化
 * 用于管理编辑器国际化
 */

/**
 * 国际化配置选项
 */
export interface IntlOptions {
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * 国际化消息类型
 */
export type IntlMessages = Record<string, string | Record<string, any>>;

/**
 * Intl 类
 * 国际化，用于管理编辑器国际化
 */
export class Intl {
  /**
   * 当前语言
   */
  private currentLocale: string;

  /**
   * 消息映射
   */
  private messages: Map<string, IntlMessages> = new Map();

  /**
   * 配置选项
   */
  private options: IntlOptions;

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: IntlOptions = {}) {
    this.options = {
      debug: false,
      ...options,
    };
    this.currentLocale = 'zh-CN';
  }

  /**
   * 初始化国际化
   * @param locale 语言代码
   * @param messages 消息对象
   */
  init(locale: string, messages: IntlMessages): void {
    if (this.options.debug) {
      console.log(`[Intl] Initializing intl: ${locale}`);
    }

    this.currentLocale = locale;
    this.messages.set(locale, messages);
  }

  /**
   * 获取消息
   * @param key 消息键
   * @param params 参数
   * @returns 消息文本
   */
  get(key: string, params?: Record<string, any>): string {
    if (this.options.debug) {
      console.log(`[Intl] Getting message: ${key}`);
    }

    const messages = this.messages.get(this.currentLocale);
    if (!messages) {
      console.warn(`[Intl] Messages not found for locale: ${this.currentLocale}`);
      return key;
    }

    // 支持嵌套键，如 'common.save'
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`[Intl] Message not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`[Intl] Message is not a string: ${key}`);
      return key;
    }

    // 替换参数
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : '';
      });
    }

    return value;
  }

  /**
   * 设置语言
   * @param locale 语言代码
   */
  setLocale(locale: string): void {
    if (this.options.debug) {
      console.log(`[Intl] Setting locale: ${locale}`);
    }

    if (!this.messages.has(locale)) {
      console.warn(`[Intl] Messages not found for locale: ${locale}`);
      return;
    }

    this.currentLocale = locale;
  }

  /**
   * 添加消息
   * @param locale 语言代码
   * @param messages 消息对象
   */
  add(locale: string, messages: IntlMessages): void {
    if (this.options.debug) {
      console.log(`[Intl] Adding messages for locale: ${locale}`);
    }

    const existingMessages = this.messages.get(locale);
    if (existingMessages) {
      this.messages.set(locale, { ...existingMessages, ...messages });
    } else {
      this.messages.set(locale, messages);
    }
  }

  /**
   * 移除消息
   * @param locale 语言代码
   */
  remove(locale: string): void {
    if (this.options.debug) {
      console.log(`[Intl] Removing messages for locale: ${locale}`);
    }

    this.messages.delete(locale);
  }

  /**
   * 检查语言是否存在
   * @param locale 语言代码
   * @returns 语言是否存在
   */
  has(locale: string): boolean {
    return this.messages.has(locale);
  }

  /**
   * 获取当前语言
   * @returns 当前语言代码
   */
  getLocale(): string {
    return this.currentLocale;
  }

  /**
   * 获取所有语言
   * @returns 语言代码数组
   */
  getLocales(): string[] {
    return Array.from(this.messages.keys());
  }

  /**
   * 清除所有消息
   */
  clear(): void {
    if (this.options.debug) {
      console.log('[Intl] Clearing all messages');
    }

    this.messages.clear();
  }
}
