/**
 * Vue3 LowCode Engine - Code Intermediate Types
 * 低代码引擎代码中间表示类型定义
 */

/**
 * 代码中间表示接口
 */
export interface CodeIntermediate {
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
   * 上下文
   */
  context?: Record<string, any>;
}
