<template>
  <div class="editor-layout">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <el-space>
          <span class="logo">Vue3 LowCode</span>
          <el-divider direction="vertical" />
          <el-button-group>
            <el-button :icon="RefreshLeft" @click="handleUndo" :disabled="!canUndo">
              撤销
            </el-button>
            <el-button :icon="RefreshRight" @click="handleRedo" :disabled="!canRedo">
              重做
            </el-button>
          </el-button-group>
          <el-divider direction="vertical" />
          <el-button type="primary" :icon="Document" @click="handleSave">
            保存
          </el-button>
          <el-button :icon="FolderOpened" @click="handleLoad">
            加载
          </el-button>
          <el-button :icon="Download" @click="handleExport">
            导出
          </el-button>
          <el-button :icon="Upload" @click="handleImport">
            导入
          </el-button>
        </el-space>
      </div>
      <div class="toolbar-right">
        <el-space>
          <el-button :icon="View" @click="handlePreview">
            预览
          </el-button>
          <el-button :icon="Delete" @click="handleClear" type="danger">
            清空
          </el-button>
        </el-space>
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="editor-main">
      <!-- 左侧组件面板 -->
      <div class="editor-left">
        <ComponentPanel @drag-start="handleDragStart" />
      </div>

      <!-- 中间画布区域 -->
      <div class="editor-center">
        <CanvasPanel
          :schema="schema"
          @select-node="handleSelectNode"
          @update-schema="handleUpdateSchema"
        />
      </div>

      <!-- 右侧属性面板 -->
      <div class="editor-right">
        <PropertyPanel
          :selected-node="selectedNode"
          @update-node="handleUpdateNode"
        />
      </div>
    </div>

    <!-- 预览面板 -->
    <PreviewPanel
      v-if="showPreview"
      :schema="schema"
      @close="showPreview = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  RefreshLeft,
  RefreshRight,
  Document,
  FolderOpened,
  Download,
  Upload,
  View,
  Delete
} from '@element-plus/icons-vue';
import ComponentPanel from './ComponentPanel.vue';
import CanvasPanel from './CanvasPanel.vue';
import PropertyPanel from './PropertyPanel.vue';
import PreviewPanel from './PreviewPanel.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// Schema 数据
const schema = ref<any>({
  componentName: 'Page',
  props: {},
  children: []
});

// 选中的节点
const selectedNode = ref<any>(null);

// 历史记录
const history = ref<any[]>([]);
const historyIndex = ref(-1);

// 是否显示预览
const showPreview = ref(false);

// 是否可以撤销/重做
const canUndo = computed(() => historyIndex.value > 0);
const canRedo = computed(() => historyIndex.value < history.value.length - 1);

// 添加到历史记录
const addToHistory = (newSchema: any) => {
  // 如果当前不在历史记录末尾，删除后面的记录
  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1);
  }
  history.value.push(JSON.parse(JSON.stringify(newSchema)));
  historyIndex.value++;
};

// 初始化历史记录
const initHistory = () => {
  history.value = [JSON.parse(JSON.stringify(schema.value))];
  historyIndex.value = 0;
};

// 撤销
const handleUndo = () => {
  if (canUndo.value) {
    historyIndex.value--;
    schema.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]));
    ElMessage.success('已撤销');
  }
};

// 重做
const handleRedo = () => {
  if (canRedo.value) {
    historyIndex.value++;
    schema.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]));
    ElMessage.success('已重做');
  }
};

// 保存
const handleSave = () => {
  const state = JSON.stringify(schema.value, null, 2);
  localStorage.setItem('lowcode-schema', state);
  ElMessage.success('已保存到本地存储');
};

// 加载
const handleLoad = () => {
  const state = localStorage.getItem('lowcode-schema');
  if (state) {
    try {
      const loadedSchema = JSON.parse(state);
      schema.value = loadedSchema;
      initHistory();
      ElMessage.success('已加载保存的方案');
    } catch (error) {
      ElMessage.error('加载失败');
    }
  } else {
    ElMessage.warning('没有找到保存的方案');
  }
};

// 导出
const handleExport = () => {
  const state = JSON.stringify(schema.value, null, 2);
  const blob = new Blob([state], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lowcode-schema.json';
  a.click();
  URL.revokeObjectURL(url);
  ElMessage.success('已导出');
};

// 导入
const handleImport = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const content = await file.text();
        const loadedSchema = JSON.parse(content);
        schema.value = loadedSchema;
        initHistory();
        ElMessage.success('已导入');
      } catch (error) {
        ElMessage.error('导入失败');
      }
    }
  };
  input.click();
};

// 预览
const handlePreview = () => {
  showPreview.value = true;
};

// 清空
const handleClear = async () => {
  try {
    await ElMessageBox.confirm('确定要清空画布吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    schema.value = {
      componentName: 'Page',
      props: {},
      children: []
    };
    selectedNode.value = null;
    initHistory();
    ElMessage.success('已清空');
  } catch {
    // 取消操作
  }
};

// 拖拽开始
const handleDragStart = (component: any) => {
  console.log('Drag start:', component);
};

// 选择节点
const handleSelectNode = (node: any) => {
  selectedNode.value = node;
};

// 更新 Schema
const handleUpdateSchema = (newSchema: any) => {
  schema.value = newSchema;
  addToHistory(newSchema);
};

// 更新节点
const handleUpdateNode = (nodeId: string, updates: any) => {
  const updateNodeRecursive = (node: any): any => {
    if (node.id === nodeId) {
      // 处理删除操作
      if (updates._delete) {
        return null;
      }
      // 处理复制操作
      if (updates._copy) {
        return updates._copy;
      }
      return { ...node, ...updates };
    }
    if (node.children) {
      const newChildren = node.children.map(updateNodeRecursive).filter(Boolean);
      return {
        ...node,
        children: newChildren
      };
    }
    return node;
  };

  schema.value = updateNodeRecursive(schema.value);
  addToHistory(schema.value);

  // 更新选中的节点
  if (selectedNode.value && selectedNode.value.id === nodeId) {
    if (updates._delete) {
      selectedNode.value = null;
    } else {
      selectedNode.value = { ...selectedNode.value, ...updates };
    }
  }
};

// 初始化历史记录
initHistory();
</script>

<style scoped>
.editor-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.toolbar-left .logo {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
}

.editor-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-left {
  width: 280px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.editor-center {
  flex: 1;
  background: #f0f2f5;
  overflow: auto;
  padding: 20px;
}

.editor-right {
  width: 320px;
  background: #fff;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
}
</style>
