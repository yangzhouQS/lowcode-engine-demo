/**
 * Vue3 LowCode Engine - Utils Package
 * 事务管理器
 */

export type TransactionCallback = () => void | Promise<void>;

export interface TransactionOptions {
  name?: string;
  timeout?: number;
}

export class TransactionManager {
  private transactions: Map<string, TransactionCallback[]> = new Map();
  private activeTransactions: Set<string> = new Set();
  private timeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();

  /**
   * 开始事务
   */
  begin(name: string, options: TransactionOptions = {}): void {
    if (!this.transactions.has(name)) {
      this.transactions.set(name, []);
    }
    this.activeTransactions.add(name);

    // 设置超时
    if (options.timeout) {
      const timeoutId = setTimeout(() => {
        this.rollback(name);
      }, options.timeout);
      this.timeouts.set(name, timeoutId);
    }
  }

  /**
   * 提交事务
   */
  async commit(name: string): Promise<void> {
    const callbacks = this.transactions.get(name);
    if (!callbacks) {
      return;
    }

    // 执行所有回调
    for (const callback of callbacks) {
      await callback();
    }

    // 清理
    this.transactions.delete(name);
    this.activeTransactions.delete(name);
    const timeoutId = this.timeouts.get(name);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(name);
    }
  }

  /**
   * 回滚事务
   */
  rollback(name: string): void {
    this.transactions.delete(name);
    this.activeTransactions.delete(name);
    const timeoutId = this.timeouts.get(name);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(name);
    }
  }

  /**
   * 添加事务回调
   */
  addCallback(name: string, callback: TransactionCallback): void {
    if (!this.transactions.has(name)) {
      this.transactions.set(name, []);
    }
    this.transactions.get(name)!.push(callback);
  }

  /**
   * 检查事务是否活跃
   */
  isActive(name: string): boolean {
    return this.activeTransactions.has(name);
  }

  /**
   * 获取所有活跃事务
   */
  getActiveTransactions(): string[] {
    return Array.from(this.activeTransactions);
  }

  /**
   * 执行事务
   */
  async execute(
    name: string,
    callback: TransactionCallback,
    options: TransactionOptions = {}
  ): Promise<void> {
    this.begin(name, options);
    try {
      this.addCallback(name, callback);
      await this.commit(name);
    } catch (error) {
      this.rollback(name);
      throw error;
    }
  }

  /**
   * 批量执行事务
   */
  async executeBatch(
    name: string,
    callbacks: TransactionCallback[],
    options: TransactionOptions = {}
  ): Promise<void> {
    this.begin(name, options);
    try {
      for (const callback of callbacks) {
        this.addCallback(name, callback);
      }
      await this.commit(name);
    } catch (error) {
      this.rollback(name);
      throw error;
    }
  }

  /**
   * 清除所有事务
   */
  clear(): void {
    this.transactions.clear();
    this.activeTransactions.clear();
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.timeouts.clear();
  }
}

// 默认事务管理器实例
export const transactionManager = new TransactionManager();
