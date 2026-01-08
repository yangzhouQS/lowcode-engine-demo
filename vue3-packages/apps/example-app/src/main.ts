import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { Shell } from '@vue3-lowcode/shell';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);

// 初始化 Vue3 LowCode Engine Shell
const shell = new Shell({
  container: document.getElementById('app'),
  locale: 'zh-CN',
  editorConfig: {
    debug: true,
    locale: 'zh-CN',
  },
  designerConfig: {
    maxHistorySize: 50,
  },
});

// 初始化并启动 Shell
shell.init({
  container: document.getElementById('app'),
  locale: 'zh-CN',
  editorConfig: {
    debug: true,
    locale: 'zh-CN',
  },
  designerConfig: {
    maxHistorySize: 50,
  },
}).then(() => {
  console.log('[LowCode Engine] Shell initialized successfully');
  
  // 启动 Shell
  return shell.start();
}).then(() => {
  console.log('[LowCode Engine] Shell started successfully');
  
  // 将 shell 挂载到 window 对象，方便调试和访问
  (window as any).__LOWCODE_SHELL__ = shell;
  
  // 监听 Shell 事件
  const eventBus = shell.getEventBus();
  eventBus.on('shell:init', () => {
    console.log('[LowCode Engine] Shell init event received');
  });
  
  eventBus.on('shell:start', () => {
    console.log('[LowCode Engine] Shell start event received');
  });
  
  // 获取文档模型
  const documentModel = shell.getDocumentModel();
  if (documentModel) {
    console.log('[LowCode Engine] Document model available:', documentModel);
  }
  
  // 获取编辑器
  const editor = shell.getEditor();
  if (editor) {
    console.log('[LowCode Engine] Editor available:', editor);
  }
  
  // 获取设计器
  const designer = shell.getDesigner();
  if (designer) {
    console.log('[LowCode Engine] Designer available:', designer);
  }
}).catch((error) => {
  console.error('[LowCode Engine] Failed to initialize Shell:', error);
});

// 挂载 Vue 应用
app.mount('#app');
