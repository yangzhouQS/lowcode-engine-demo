/**
 * Vue3 LowCode Engine - Code Result Types
 * 低代码引擎代码结果类型定义
 */

/**
 * 代码结果接口
 */
export interface CodeResult {
  /**
   * 代码
   */
  code: string;

  /**
   * 源映射
   */
  sourceMap?: string;

  /**
   * 依赖
   */
  dependencies?: string[];

  /**
   * 错误
   */
  errors?: string[];

  /**
   * 警告
   */
  warnings?: string[];

  /**
   * 上下文
   */
  context?: Record<string, any>;
}
