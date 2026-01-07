/**
 * ShellModel Class
 * 
 * Shell 模型类,提供对低代码引擎核心模型的访问
 * 
 * @public
 */

import type { IShellModel } from '@vue3-lowcode/types';
import type { IEditor } from '@vue3-lowcode/types';
import type { IDesigner } from '@vue3-lowcode/types';
import type { IDocumentModel } from '@vue3-lowcode/types';

/**
 * ShellModel 类
 * 
 * Shell 模型类,提供对低代码引擎核心模型的访问
 */
export class ShellModel implements IShellModel {
  private editor: IEditor | null = null;
  private designer: IDesigner | null = null;

  /**
   * 构造函数
   * 
   * @param editor - 编辑器实例
   * @param designer - 设计器实例
   */
  constructor(editor: IEditor | null = null, designer: IDesigner | null = null) {
    this.editor = editor;
    this.designer = designer;
  }

  /**
   * 设置编辑器
   * 
   * @param editor - 编辑器实例
   */
  setEditor(editor: IEditor): void {
    this.editor = editor;
  }

  /**
   * 设置设计器
   * 
   * @param designer - 设计器实例
   */
  setDesigner(designer: IDesigner): void {
    this.designer = designer;
  }

  /**
   * 获取文档模型
   * 
   * @returns 文档模型
   */
  getDocumentModel(): IDocumentModel | null {
    if (!this.designer) {
      return null;
    }
    return this.designer.getCurrentDocument();
  }

  /**
   * 获取选区
   * 
   * @returns 选区
   */
  getSelection(): any {
    const documentModel = this.getDocumentModel();
    if (!documentModel) {
      return null;
    }
    return documentModel.selection;
  }

  /**
   * 获取历史记录
   * 
   * @returns 历史记录
   */
  getHistory(): any {
    const documentModel = this.getDocumentModel();
    if (!documentModel) {
      return null;
    }
    return documentModel.history;
  }

  /**
   * 获取项目
   * 
   * @returns 项目
   */
  getProject(): any {
    if (!this.designer) {
      return null;
    }
    return this.designer.project;
  }

  /**
   * 获取编辑器
   * 
   * @returns 编辑器
   */
  getEditor(): IEditor | null {
    return this.editor;
  }

  /**
   * 获取设计器
   * 
   * @returns 设计器
   */
  getDesigner(): IDesigner | null {
    return this.designer;
  }

  /**
   * 获取引擎
   * 
   * @returns 引擎
   */
  getEngine(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor;
  }

  /**
   * 获取插件管理器
   * 
   * @returns 插件管理器
   */
  getPluginManager(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getPluginManager();
  }

  /**
   * 获取事件总线
   * 
   * @returns 事件总线
   */
  getEventBus(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getEventBus();
  }

  /**
   * 获取命令
   * 
   * @returns 命令
   */
  getCommand(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getCommand();
  }

  /**
   * 获取配置
   * 
   * @returns 配置
   */
  getConfig(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getConfig();
  }

  /**
   * 获取快捷键
   * 
   * @returns 快捷键
   */
  getHotkey(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getHotkey();
  }

  /**
   * 获取国际化
   * 
   * @returns 国际化
   */
  getIntl(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getIntl();
  }

  /**
   * 获取容器
   * 
   * @returns 容器
   */
  getContainer(): any {
    if (!this.editor) {
      return null;
    }
    return this.editor.getContainer();
  }
}
