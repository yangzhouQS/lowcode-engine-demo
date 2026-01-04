import { IPublicModelPluginContext, IPublicTypePlugin } from '@alilc/lowcode-types';
import { LiveEditingManager, LiveEditingManagerConfig } from './live-editing-manager';

export interface LiveEditingPluginOptions extends LiveEditingManagerConfig {
  // 扩展选项
}

export const LiveEditingPlugin: IPublicTypePlugin<LiveEditingPluginOptions> = {
  name: 'LiveEditingPlugin',
  async init(context: IPublicModelPluginContext, options: LiveEditingPluginOptions = {}) {
    const { project, designer } = context;

    // 创建 LiveEditingManager
    const liveEditingManager = new LiveEditingManager({
      enabled: options.enabled ?? false,
      config: options.config,
      autoSave: options.autoSave ?? false,
      autoSaveDelay: options.autoSaveDelay ?? 1000,
    });

    // 添加到上下文
    context.setReadOnly({
      liveEditingManager,
    });

    // 监听事件
    liveEditingManager.on('startEditing', (data) => {
      console.log('LiveEditing startEditing:', data);
    });

    liveEditingManager.on('stopEditing', (data) => {
      console.log('LiveEditing stopEditing:', data);
    });

    liveEditingManager.on('contentChange', (data) => {
      console.log('LiveEditing contentChange:', data);
    });

    liveEditingManager.on('autoSave', (data) => {
      console.log('LiveEditing autoSave:', data);
    });

    // 返回清理函数
    return {
      destroy() {
        liveEditingManager.dispose();
      },
    };
  },
};

export default LiveEditingPlugin;
