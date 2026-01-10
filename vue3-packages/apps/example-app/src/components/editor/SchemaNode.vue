<template>
  <div
    class="schema-node"
    :class="{ 'is-selected': isSelected, 'is-draggable': isDraggable }"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragover.prevent="handleDragOver"
    @drop="handleDrop"
    draggable="true"
  >
    <div class="node-wrapper">
      <!-- 节点操作栏 -->
      <div class="node-actions" v-if="isSelected">
        <el-button-group size="small">
          <el-button :icon="ArrowUp" @click.stop="handleMoveUp" title="上移" />
          <el-button :icon="ArrowDown" @click.stop="handleMoveDown" title="下移" />
          <el-button :icon="Delete" @click.stop="handleDelete" type="danger" title="删除" />
        </el-button-group>
      </div>

      <!-- 节点标签 -->
      <div class="node-label">
        <el-icon><component :is="getIcon()" /></el-icon>
        <span>{{ node.label || node.componentName }}</span>
      </div>

      <!-- 子节点容器 -->
      <div
        v-if="hasChildren"
        class="node-children"
        @dragover.prevent="handleDragOver"
        @drop="handleDrop"
      >
        <SchemaNode
          v-for="(child, index) in node.children"
          :key="child.id"
          :node="child"
          :selected-node-id="selectedNodeId"
          @select="$emit('select', $event)"
          @update="$emit('update', $event)"
          @delete="$emit('delete', $event)"
          @move-up="$emit('moveUp', index)"
          @move-down="$emit('moveDown', index)"
        />
        <div v-if="node.children.length === 0" class="empty-children">
          <el-text type="info" size="small">拖拽组件到此处</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ArrowUp,
  ArrowDown,
  Delete,
  Document,
  Edit,
  Grid,
  Picture,
  Link,
  Calendar,
  Timer,
  Select,
  CircleCheck,
  Sort,
  Histogram,
  Warning,
  Message,
  Bell,
  View,
  ArrowRight,
  ArrowLeft,
  MoreFilled,
  Menu,
  Rank,
  Share,
  House,
  User,
  Setting,
  VideoCamera,
  Location,
  Goods,
  ShoppingBag,
  Wallet,
  PieChart,
  TrendCharts,
  DataLine,
  Monitor,
  Tools,
  List,
  Tickets,
  Folder,
  Files,
  EditPen,
  Download,
  Upload,
  Lock,
  ZoomIn,
  ZoomOut,
  Refresh,
  Search,
  Close,
  Plus,
  Minus,
  Check,
  InfoFilled,
  SuccessFilled,
  WarningFilled,
  CircleCloseFilled,
  Loading
} from '@element-plus/icons-vue';

const props = defineProps<{
  node: any;
  selectedNodeId: string | null;
}>();

const emit = defineEmits<{
  select: [node: any];
  update: [nodeId: string, updates: any];
  delete: [nodeId: string];
  moveUp: [index: number];
  moveDown: [index: number];
}>();

const isSelected = computed(() => props.node.id === props.selectedNodeId);
const isDraggable = computed(() => true);
const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

const getIcon = () => {
  const iconMap: Record<string, any> = {
    ElButton: Document,
    ElInput: Edit,
    ElSelect: Select,
    ElText: Document,
    ElCard: Document,
    ElForm: Document,
    ElTable: Histogram,
    ElDialog: View,
    ElAlert: Warning,
    ElTag: Select,
    ElProgress: Sort,
    ElSwitch: Select,
    ElSlider: Sort,
    ElRate: Select,
    ElRadio: CircleCheck,
    ElCheckbox: Select,
    ElContainer: Grid,
    ElRow: Grid,
    ElCol: Grid,
    ElTabs: Select,
    ElTabPane: Select,
    ElCollapse: ArrowDown,
    ElCollapseItem: ArrowDown,
    ElBreadcrumb: ArrowRight,
    ElDivider: Minus,
    ElSpace: Grid,
    ElBadge: Select,
    ElAvatar: User,
    ElSkeleton: Loading,
    ElEmpty: Document,
    ElDescriptions: Document,
    ElResult: SuccessFilled,
    ElStatistic: DataLine,
    ElPagination: Sort,
    ElTree: ArrowRight,
    ElTransfer: ArrowRight,
    ElInputNumber: Edit,
    ElCascader: ArrowRight,
    ElTimePicker: Timer,
    ElDatePicker: Calendar,
    ElColorPicker: Picture,
    ElLink: Link,
    ElIcon: Picture,
    ElMessage: Message,
    ElNotification: Bell,
    ElMessageBox: View,
    ElLoading: Loading,
  };
  return iconMap[props.node.componentName] || Document;
};

const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  emit('select', props.node);
};

const handleDragStart = (e: DragEvent) => {
  e.stopPropagation();
  if (e.dataTransfer) {
    e.dataTransfer.setData('node-id', props.node.id);
    e.dataTransfer.effectAllowed = 'move';
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const draggedNodeId = e.dataTransfer?.getData('node-id');
  const componentData = e.dataTransfer?.getData('component');

  if (draggedNodeId && draggedNodeId !== props.node.id) {
    // 处理节点移动
    console.log('Move node:', draggedNodeId, 'to:', props.node.id);
  } else if (componentData) {
    // 处理新组件添加
    try {
      const component = JSON.parse(componentData);
      const newNode = {
        id: `node_${Date.now()}`,
        componentName: component.componentName,
        label: component.label,
        props: getDefaultProps(component.componentName),
        children: []
      };

      emit('update', props.node.id, {
        children: [...(props.node.children || []), newNode]
      });
    } catch (error) {
      console.error('Failed to parse component data:', error);
    }
  }
};

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

const handleMoveUp = () => {
  emit('moveUp', 0);
};

const handleMoveDown = () => {
  emit('moveDown', 0);
};

const handleDelete = () => {
  emit('delete', props.node.id);
};
</script>

<style scoped>
.schema-node {
  position: relative;
  margin: 8px 0;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
  background: #fff;
}

.schema-node:hover {
  border-color: #c6e2ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.schema-node.is-selected {
  border-color: #409eff;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.2);
}

.schema-node.is-draggable {
  cursor: grab;
}

.schema-node.is-draggable:active {
  cursor: grabbing;
}

.node-wrapper {
  position: relative;
  padding: 8px;
}

.node-actions {
  position: absolute;
  top: -12px;
  right: 8px;
  z-index: 10;
  background: #fff;
  padding: 2px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.node-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #303133;
  cursor: pointer;
}

.node-label .el-icon {
  color: #409eff;
}

.node-children {
  margin-left: 20px;
  padding: 8px 0;
  border-left: 2px dashed #dcdfe6;
  min-height: 40px;
}

.empty-children {
  padding: 16px;
  text-align: center;
  border: 2px dashed #e4e7ed;
  border-radius: 4px;
  background: #fafafa;
}
</style>
