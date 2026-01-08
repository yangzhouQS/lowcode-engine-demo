<template>
  <div class="app-container">
    <el-container>
      <el-header class="app-header">
        <h1>Vue3 低代码引擎 - 示例应用</h1>
        <p>基于 Vue3 + Element Plus 的低代码开发平台</p>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="welcome-card">
              <template #header>
                <div class="card-header">
                  <span>欢迎使用 Vue3 低代码引擎</span>
                  <el-tag :type="engineStatus.type" size="small">
                    {{ engineStatus.text }}
                  </el-tag>
                </div>
              </template>
              
              <div class="feature-list">
                <h3>核心特性</h3>
                <ul>
                  <li>✅ 基于 Vue3 Composition API</li>
                  <li>✅ 集成 Element Plus UI 组件库</li>
                  <li>✅ 使用 Vite 5 构建工具</li>
                  <li>✅ 支持 TypeScript</li>
                  <li>✅ 插件系统架构</li>
                  <li>✅ 可扩展的设计器</li>
                  <li>✅ 灵活的渲染器</li>
                  <li>✅ 完整的工作区管理</li>
                </ul>
              </div>
              
              <el-divider></el-divider>
              
              <div class="engine-info">
                <h3>引擎状态</h3>
                <el-descriptions :column="2" border>
                  <el-descriptions-item label="Shell 状态">
                    <el-tag :type="shellInitialized ? 'success' : 'info'">
                      {{ shellInitialized ? '已初始化' : '未初始化' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="编辑器状态">
                    <el-tag :type="editorAvailable ? 'success' : 'info'">
                      {{ editorAvailable ? '可用' : '不可用' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="设计器状态">
                    <el-tag :type="designerAvailable ? 'success' : 'info'">
                      {{ designerAvailable ? '可用' : '不可用' }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="文档模型">
                    <el-tag :type="documentModelAvailable ? 'success' : 'info'">
                      {{ documentModelAvailable ? '可用' : '不可用' }}
                    </el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
              
              <el-divider></el-divider>
              
              <div class="demo-section">
                <h3>快速演示</h3>
                <el-space wrap>
                  <el-button type="primary" @click="showDemo = true">
                    查看演示
                  </el-button>
                  <el-button @click="exportShellState">
                    导出状态
                  </el-button>
                  <el-button @click="showEngineInfo = true">
                    引擎信息
                  </el-button>
                </el-space>
              </div>
            </el-card>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="8">
            <el-card>
              <template #header>
                <div class="card-header">
                  <el-icon><Edit /></el-icon>
                  <span>设计器</span>
                </div>
              </template>
              <p>可视化拖拽设计界面，快速构建页面结构</p>
              <el-tag v-if="designerAvailable" type="success" size="small">已就绪</el-tag>
              <el-tag v-else type="info" size="small">未就绪</el-tag>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card>
              <template #header>
                <div class="card-header">
                  <el-icon><View /></el-icon>
                  <span>渲染器</span>
                </div>
              </template>
              <p>实时预览页面效果，支持多种渲染模式</p>
              <el-tag type="success" size="small">已集成</el-tag>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card>
              <template #header>
                <div class="card-header">
                  <el-icon><Setting /></el-icon>
                  <span>配置器</span>
                </div>
              </template>
              <p>灵活配置组件属性，支持自定义扩展</p>
              <el-tag type="success" size="small">已集成</el-tag>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      
      <el-footer class="app-footer">
        <p>&copy; 2026 Vue3 LowCode Engine. All rights reserved.</p>
      </el-footer>
    </el-container>
    
    <el-dialog v-model="showDemo" title="演示" width="50%">
      <div class="demo-content">
        <h4>这是一个演示对话框</h4>
        <p>Vue3 低代码引擎提供了完整的开发工具链，帮助开发者快速构建低代码平台。</p>
        <el-form :model="demoForm" label-width="100px">
          <el-form-item label="项目名称">
            <el-input v-model="demoForm.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input
              v-model="demoForm.description"
              type="textarea"
              placeholder="请输入项目描述"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showDemo = false">取消</el-button>
        <el-button type="primary" @click="handleDemoSubmit">确定</el-button>
      </template>
    </el-dialog>
    
    <el-dialog v-model="showEngineInfo" title="引擎信息" width="60%">
      <div class="engine-info-content">
        <h4>Shell 实例信息</h4>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Shell 实例">
            {{ shellInstance ? '已加载' : '未加载' }}
          </el-descriptions-item>
          <el-descriptions-item label="编辑器实例">
            {{ editorInstance ? '已加载' : '未加载' }}
          </el-descriptions-item>
          <el-descriptions-item label="设计器实例">
            {{ designerInstance ? '已加载' : '未加载' }}
          </el-descriptions-item>
          <el-descriptions-item label="文档模型实例">
            {{ documentModelInstance ? '已加载' : '未加载' }}
          </el-descriptions-item>
          <el-descriptions-item label="事件总线">
            {{ eventBusInstance ? '已加载' : '未加载' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="showEngineInfo = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit, View, Setting } from '@element-plus/icons-vue';

const showDemo = ref(false);
const showEngineInfo = ref(false);

const demoForm = reactive({
  name: '',
  description: ''
});

// 引擎状态
const shellInitialized = ref(false);
const editorAvailable = ref(false);
const designerAvailable = ref(false);
const documentModelAvailable = ref(false);

// 引擎实例
const shellInstance = ref<any>(null);
const editorInstance = ref<any>(null);
const designerInstance = ref<any>(null);
const documentModelInstance = ref<any>(null);
const eventBusInstance = ref<any>(null);

// 引擎整体状态
const engineStatus = computed(() => {
  if (shellInitialized.value && editorAvailable.value && designerAvailable.value) {
    return { type: 'success', text: '运行中' };
  } else if (shellInitialized.value) {
    return { type: 'warning', text: '部分初始化' };
  } else {
    return { type: 'info', text: '未初始化' };
  }
});

const handleDemoSubmit = () => {
  if (!demoForm.name) {
    ElMessage.warning('请输入项目名称');
    return;
  }
  ElMessage.success('项目创建成功！');
  showDemo.value = false;
  demoForm.name = '';
  demoForm.description = '';
};

const exportShellState = () => {
  const shell = (window as any).__LOWCODE_SHELL__;
  if (shell) {
    const state = shell.export();
    console.log('[LowCode Engine] Shell state:', state);
    ElMessage.success('状态已导出到控制台');
  } else {
    ElMessage.warning('Shell 未初始化');
  }
};

// 检查引擎状态
const checkEngineStatus = () => {
  const shell = (window as any).__LOWCODE_SHELL__;
  if (shell) {
    shellInstance.value = shell;
    shellInitialized.value = true;
    
    // 获取编辑器
    const editor = shell.getEditor();
    if (editor) {
      editorInstance.value = editor;
      editorAvailable.value = true;
    }
    
    // 获取设计器
    const designer = shell.getDesigner();
    if (designer) {
      designerInstance.value = designer;
      designerAvailable.value = true;
    }
    
    // 获取文档模型
    const documentModel = shell.getDocumentModel();
    if (documentModel) {
      documentModelInstance.value = documentModel;
      documentModelAvailable.value = true;
    }
    
    // 获取事件总线
    const eventBus = shell.getEventBus();
    if (eventBus) {
      eventBusInstance.value = eventBus;
    }
    
    console.log('[LowCode Engine] Engine status checked:', {
      shellInitialized: shellInitialized.value,
      editorAvailable: editorAvailable.value,
      designerAvailable: designerAvailable.value,
      documentModelAvailable: documentModelAvailable.value,
    });
  }
};

onMounted(() => {
  // 延迟检查，等待 Shell 初始化完成
  setTimeout(() => {
    checkEngineStatus();
  }, 1000);
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 28px;
  color: #333;
}

.app-header p {
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
}

.el-main {
  padding: 40px 20px;
}

.welcome-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
}

.feature-list h3 {
  margin-top: 0;
  color: #333;
}

.feature-list ul {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 8px 0;
  color: #555;
  font-size: 15px;
}

.demo-section {
  text-align: center;
  padding: 20px 0;
}

.demo-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.app-footer {
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 14px;
}

.demo-content h4 {
  margin-top: 0;
  color: #333;
}

.demo-content p {
  color: #666;
  line-height: 1.6;
}
</style>
