<template>
  <div class="preview-panel">
    <div class="preview-header">
      <h3>页面预览</h3>
      <div class="preview-actions">
        <el-button size="small" :icon="Refresh" @click="handleRefresh">
          刷新
        </el-button>
        <el-button size="small" :icon="Close" @click="handleClose">
          关闭
        </el-button>
      </div>
    </div>

    <div class="preview-content">
      <div class="preview-container">
        <el-empty v-if="!schema.children || schema.children.length === 0" description="暂无内容" />
        <div v-else class="preview-page">
          <SchemaRenderer :schema="schema" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Refresh, Close } from '@element-plus/icons-vue';
import SchemaRenderer from './SchemaRenderer.vue';

defineProps<{
  schema: any;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleRefresh = () => {
  window.location.reload();
};

const handleClose = () => {
  emit('close');
};
</script>

<style scoped>
.preview-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.preview-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.preview-content {
  flex: 1;
  overflow: auto;
  background: #f5f7fa;
}

.preview-container {
  min-height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.preview-page {
  width: 100%;
  max-width: 1200px;
  min-height: 800px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
