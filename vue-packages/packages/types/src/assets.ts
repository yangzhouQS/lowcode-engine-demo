/**
 * Vue3 LowCode Engine - Assets Types
 * 低代码引擎资产类型定义
 */

/**
 * 资产JSON接口
 */
export interface AssetsJSON {
  /**
   * 包列表
   */
  packages?: Package[];

  /**
   * 组件列表
   */
  components?: any[];

  /**
   * 样式列表
   */
  styles?: string[];

  /**
   * 脚本列表
   */
  scripts?: string[];
}

/**
 * 包接口
 */
export interface Package {
  /**
   * 包名
   */
  package: string;

  /**
   * 版本
   */
  version: string;

  /**
   * 库
   */
  library?: string;

  /**
   * 主文件
   */
  main?: string;

  /**
   * 样式
   */
  style?: string;

  /**
   * 基础URL
   */
  baseUrl?: string;

  /**
   * 是否ES模块
   */
  esModule?: boolean;
}
