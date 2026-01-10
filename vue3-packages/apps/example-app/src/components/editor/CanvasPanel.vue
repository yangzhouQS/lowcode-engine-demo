<template>
  <div class="canvas-panel">
    <div class="canvas-header">
      <h3>画布</h3>
      <div class="canvas-actions">
        <el-button size="small" :icon="ZoomOut" @click="handleZoomOut">缩小</el-button>
        <span class="zoom-level">{{ Math.round(zoomLevel * 100) }}%</span>
        <el-button size="small" :icon="ZoomIn" @click="handleZoomIn">放大</el-button>
        <el-button size="small" @click="handleResetZoom">重置</el-button>
      </div>
    </div>

    <div class="canvas-content" @dragover.prevent @drop="handleDrop">
      <div
        class="canvas-container"
        :style="{ transform: `scale(${zoomLevel})` }"
        @click.self="handleCanvasClick"
      >
        <div
          v-if="!schema.children || schema.children.length === 0"
          class="empty-canvas"
        >
          <el-empty description="拖拽组件到此处开始设计">
            <template #image>
              <el-icon :size="80" color="#c0c4cc">
                <Document />
              </el-icon>
            </template>
          </el-empty>
        </div>

        <div v-else class="page-container">
          <SchemaNode
            v-for="(node, index) in schema.children"
            :key="node.id"
            :node="node"
            :selected-node-id="selectedNodeId"
            @select="handleSelectNode"
            @update="handleUpdateNode"
            @delete="handleDeleteNode"
            @move-up="handleMoveUp(index)"
            @move-down="handleMoveDown(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Document, ZoomIn, ZoomOut } from '@element-plus/icons-vue';
import SchemaNode from './SchemaNode.vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  schema: any;
}>();

const emit = defineEmits<{
  selectNode: [node: any];
  updateSchema: [schema: any];
}>();

const zoomLevel = ref(1);
const selectedNodeId = ref<string | null>(null);

// 缩放控制
const handleZoomIn = () => {
  if (zoomLevel.value < 2) {
    zoomLevel.value += 0.1;
  }
};

const handleZoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value -= 0.1;
  }
};

const handleResetZoom = () => {
  zoomLevel.value = 1;
};

// 拖拽放置
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const componentData = e.dataTransfer?.getData('component');
  if (componentData) {
    try {
      const component = JSON.parse(componentData);
      const newNode = {
        id: `node_${Date.now()}`,
        componentName: component.componentName,
        label: component.label,
        props: getDefaultProps(component.componentName),
        children: []
      };

      const newSchema = {
        ...props.schema,
        children: [...(props.schema.children || []), newNode]
      };

      emit('updateSchema', newSchema);
      ElMessage.success(`已添加 ${component.label}`);
    } catch (error) {
      console.error('Failed to parse component data:', error);
    }
  }
};

// 获取默认属性
const getDefaultProps = (componentName: string): any => {
  const defaultProps: Record<string, any> = {
    ElButton: { type: 'primary', size: 'default' },
    ElInput: { placeholder: '请输入内容', clearable: true },
    ElSelect: { placeholder: '请选择', clearable: true },
    ElText: { type: 'primary' },
    ElCard: { shadow: 'hover' },
    ElForm: { labelWidth: '100px' },
    ElTable: { border: true, stripe: true },
    ElDialog: { title: '对话框', width: '50%' },
    ElAlert: { title: '提示信息', type: 'info' },
    ElTag: { type: 'primary' },
    ElProgress: { percentage: 50, strokeWidth: 15 },
    ElSwitch: { activeText: '开', inactiveText: '关' },
    ElSlider: { min: 0, max: 100, step: 1 },
    ElRate: { max: 5, allowHalf: false },
    ElRadio: { label: '选项' },
    ElCheckbox: { label: '选项' },
    ElContainer: { direction: 'vertical' },
    ElRow: { gutter: 20 },
    ElCol: { span: 12 },
    ElTabs: { type: 'border-card' },
    ElTabPane: { label: '标签页' },
    ElCollapse: { accordion: false },
    ElCollapseItem: { title: '折叠项' },
    ElBreadcrumb: { separator: '/' },
    ElDivider: { contentPosition: 'left' },
    ElSpace: { size: 'default' },
    ElBadge: { value: 99, type: 'primary' },
    ElAvatar: { size: 'default', icon: 'User' },
    ElSkeleton: { animated: true, count: 3 },
    ElEmpty: { description: '暂无数据' },
    ElDescriptions: { border: true, column: 1 },
    ElResult: { title: '操作成功', subTitle: '请根据实际情况进行操作' },
    ElStatistic: { title: '总数', value: 1128 },
    ElPagination: { layout: 'prev, pager, next', total: 100 },
    ElTree: { data: [], defaultExpandAll: false },
    ElTransfer: { data: [], titles: ['源列表', '目标列表'] },
    ElInputNumber: { min: 0, max: 100, step: 1 },
    ElCascader: { options: [], placeholder: '请选择' },
    ElTimePicker: { placeholder: '选择时间' },
    ElDatePicker: { type: 'date', placeholder: '选择日期' },
    ElColorPicker: { showAlpha: false },
    ElLink: { type: 'primary', underline: false },
    ElIcon: { size: 20 },
  };

  return defaultProps[componentName] || {};
};

// 选择节点
const handleSelectNode = (node: any) => {
  selectedNodeId.value = node.id;
  emit('selectNode', node);
};

// 更新节点
const handleUpdateNode = (nodeId: string, updates: any) => {
  const updateNodeRecursive = (node: any): any => {
    if (node.id === nodeId) {
      return { ...node, ...updates };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(updateNodeRecursive)
      };
    }
    return node;
  };

  const newSchema = updateNodeRecursive(props.schema);
  emit('updateSchema', newSchema);
};

// 删除节点
const handleDeleteNode = (nodeId: string) => {
  const deleteNodeRecursive = (node: any): any => {
    if (node.children) {
      return {
        ...node,
        children: node.children.filter((child: any) => child.id !== nodeId).map(deleteNodeRecursive)
      };
    }
    return node;
  };

  const newSchema = deleteNodeRecursive(props.schema);
  emit('updateSchema', newSchema);

  if (selectedNodeId.value === nodeId) {
    selectedNodeId.value = null;
  }
};

// 上移节点
const handleMoveUp = (index: number) => {
  if (index > 0) {
    const children = [...props.schema.children];
    [children[index], children[index - 1]] = [children[index - 1], children[index]];
    emit('updateSchema', { ...props.schema, children });
  }
};

// 下移节点
const handleMoveDown = (index: number) => {
  if (index < props.schema.children.length - 1) {
    const children = [...props.schema.children];
    [children[index], children[index + 1]] = [children[index + 1], children[index]];
    emit('updateSchema', { ...props.schema, children });
  }
};

// 点击画布空白处
const handleCanvasClick = () => {
  selectedNodeId.value = null;
  emit('selectNode', null);
};
</script>

<style scoped>
.canvas-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f0f2f5;
}

.canvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.canvas-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.canvas-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-level {
  min-width: 50px;
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.canvas-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.canvas-container {
  min-width: 800px;
  min-height: 600px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  transform-origin: top center;
}

.empty-canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  padding: 40px;
}

.page-container {
  padding: 20px;
  min-height: 600px;
}
</style>
