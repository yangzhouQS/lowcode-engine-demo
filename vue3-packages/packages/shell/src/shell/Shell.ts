/**
 * Shell Class
 * 
 * Shell API 实现,提供对低代码引擎的统一访问入口
 * 
 * @public
 */

import type { IShell, IShellConfig, IShellModel } from '@vue3-lowcode/types';
import { Editor } from '@vue3-lowcode/editor-core';
import { Designer, DocumentModel } from '@vue3-lowcode/designer';
import { ref, type Ref } from 'vue';
import { useEventBus } from '@vue3-lowcode/utils';

/**
 * Shell 类实现
 */
export class Shell implements IShell {
  /**
   * Shell 配置
   */
  config: IShellConfig;

  /**
   * Shell 模型
   */
  model: IShellModel;

  /**
   * 编辑器实例
   */
  private editor: Editor | null = null;

  /**
   * 设计器实例
   */
  private designer: Designer | null = null;

  /**
   * 文档模型实例
   */
  private documentModel: DocumentModel | null = null;

  /**
   * 事件总线
   */
  private eventBus = useEventBus();

  /**
   * 是否已初始化
   */
  private initialized: Ref<boolean> = ref(false);

  /**
   * 是否已启动
   */
  private started: Ref<boolean> = ref(false);

  /**
   * 构造函数
   * 
   * @param config - Shell 配置
   */
  constructor(config: IShellConfig) {
    this.config = config;
    this.model = {
      getDocumentModel: this.getDocumentModel.bind(this),
      getSelection: this.getSelection.bind(this),
      getHistory: this.getHistory.bind(this),
      getProject: this.getProject.bind(this),
      getEditor: this.getEditor.bind(this),
      getDesigner: this.getDesigner.bind(this),
      getEngine: this.getEngine.bind(this),
      getPluginManager: this.getPluginManager.bind(this),
      getEventBus: this.getEventBus.bind(this),
      getCommand: this.getCommand.bind(this),
      getConfig: this.getConfig.bind(this),
      getHotkey: this.getHotkey.bind(this),
      getIntl: this.getIntl.bind(this),
      getContainer: this.getContainer.bind(this),
    };
  }

  /**
   * 初始化 Shell
   * 
   * @param config - Shell 配置
   * @returns Promise<void>
   */
  async init(config: IShellConfig): Promise<void> {
    if (this.initialized.value) {
      console.warn('[Shell] Shell is already initialized');
      return;
    }

    try {
      this.config = config;

      // 初始化编辑器
      this.editor = new Editor(config.editorConfig || {});
      await this.editor.init();

      // 初始化设计器
      this.designer = new Designer(config.designerConfig || {});
      await this.designer.init();

      // 初始化文档模型
      this.documentModel = new DocumentModel();
      await this.documentModel.init();

      this.initialized.value = true;
      this.eventBus.emit('shell:init', { config });
      console.log('[Shell] Shell initialized successfully');
    } catch (error) {
      console.error('[Shell] Failed to initialize Shell:', error);
      throw error;
    }
  }

  /**
   * 启动 Shell
   * 
   * @returns Promise<void>
   */
  async start(): Promise<void> {
    if (!this.initialized.value) {
      throw new Error('[Shell] Shell must be initialized before starting');
    }

    if (this.started.value) {
      console.warn('[Shell] Shell is already started');
      return;
    }

    try {
      // 启动编辑器
      if (this.editor) {
        await this.editor.start();
      }

      // 启动设计器
      if (this.designer) {
        await this.designer.start();
      }

      // 启动文档模型
      if (this.documentModel) {
        await this.documentModel.start();
      }

      this.started.value = true;
      this.eventBus.emit('shell:start', {});
      console.log('[Shell] Shell started successfully');
    } catch (error) {
      console.error('[Shell] Failed to start Shell:', error);
      throw error;
    }
  }

  /**
   * 停止 Shell
   * 
   * @returns Promise<void>
   */
  async stop(): Promise<void> {
    if (!this.started.value) {
      console.warn('[Shell] Shell is not started');
      return;
    }

    try {
      // 停止文档模型
      if (this.documentModel) {
        await this.documentModel.stop();
      }

      // 停止设计器
      if (this.designer) {
        await this.designer.stop();
      }

      // 停止编辑器
      if (this.editor) {
        await this.editor.stop();
      }

      this.started.value = false;
      this.eventBus.emit('shell:stop', {});
      console.log('[Shell] Shell stopped successfully');
    } catch (error) {
      console.error('[Shell] Failed to stop Shell:', error);
      throw error;
    }
  }

  /**
   * 销毁 Shell
   * 
   * @returns Promise<void>
   */
  async dispose(): Promise<void> {
    if (!this.initialized.value) {
      console.warn('[Shell] Shell is not initialized');
      return;
    }

    try {
      // 停止 Shell
      await this.stop();

      // 销毁文档模型
      if (this.documentModel) {
        await this.documentModel.dispose();
        this.documentModel = null;
      }

      // 销毁设计器
      if (this.designer) {
        await this.designer.dispose();
        this.designer = null;
      }

      // 销毁编辑器
      if (this.editor) {
        await this.editor.dispose();
        this.editor = null;
      }

      this.initialized.value = false;
      this.eventBus.emit('shell:dispose', {});
      console.log('[Shell] Shell disposed successfully');
    } catch (error) {
      console.error('[Shell] Failed to dispose Shell:', error);
      throw error;
    }
  }

  /**
   * 获取文档模型
   * 
   * @returns 文档模型
   */
  getDocumentModel(): any {
    return this.documentModel;
  }

  /**
   * 获取选区
   * 
   * @returns 选区
   */
  getSelection(): any {
    return this.designer?.getSelection();
  }

  /**
   * 获取历史记录
   * 
   * @returns 历史记录
   */
  getHistory(): any {
    return this.designer?.getHistory();
  }

  /**
   * 获取项目
   * 
   * @returns 项目
   */
  getProject(): any {
    return this.designer?.getProject();
  }

  /**
   * 获取编辑器
   * 
   * @returns 编辑器
   */
  getEditor(): any {
    return this.editor;
  }

  /**
   * 获取设计器
   * 
   * @returns 设计器
   */
  getDesigner(): any {
    return this.designer;
  }

  /**
   * 获取引擎
   * 
   * @returns 引擎
   */
  getEngine(): any {
    return this.editor;
  }

  /**
   * 获取插件管理器
   * 
   * @returns 插件管理器
   */
  getPluginManager(): any {
    return this.editor?.getPluginManager();
  }

  /**
   * 获取事件总线
   * 
   * @returns 事件总线
   */
  getEventBus(): any {
    return this.eventBus;
  }

  /**
   * 获取命令
   * 
   * @returns 命令
   */
  getCommand(): any {
    return this.editor?.getCommand();
  }

  /**
   * 获取配置
   * 
   * @returns 配置
   */
  getConfig(): any {
    return this.editor?.getConfig();
  }

  /**
   * 获取快捷键
   * 
   * @returns 快捷键
   */
  getHotkey(): any {
    return this.editor?.getHotkey();
  }

  /**
   * 获取国际化
   * 
   * @returns 国际化
   */
  getIntl(): any {
    return this.editor?.getIntl();
  }

  /**
   * 获取容器
   * 
   * @returns 容器
   */
  getContainer(): any {
    return this.editor?.getContainer();
  }

  /**
   * 导出 Shell 状态
   * 
   * @returns Shell 状态
   */
  export(): any {
    return {
      config: this.config,
      initialized: this.initialized.value,
      started: this.started.value,
      editor: this.editor?.export(),
      designer: this.designer?.export(),
      documentModel: this.documentModel?.export(),
    };
  }

  /**
   * 导入 Shell 状态
   * 
   * @param state - Shell 状态
   * @returns Promise<void>
   */
  async import(state: any): Promise<void> {
    try {
      this.config = state.config;

      if (state.editor && this.editor) {
        await this.editor.import(state.editor);
      }

      if (state.designer && this.designer) {
        await this.designer.import(state.designer);
      }

      if (state.documentModel && this.documentModel) {
        await this.documentModel.import(state.documentModel);
      }

      this.initialized.value = state.initialized;
      this.started.value = state.started;

      console.log('[Shell] Shell state imported successfully');
    } catch (error) {
      console.error('[Shell] Failed to import Shell state:', error);
      throw error;
    }
  }
}
