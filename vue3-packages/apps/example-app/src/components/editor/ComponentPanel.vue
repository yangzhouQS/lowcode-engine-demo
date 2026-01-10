<template>
  <div class="component-panel">
    <div class="panel-header">
      <h3>组件库</h3>
    </div>

    <el-collapse v-model="activeNames" accordion>
      <!-- 基础组件 -->
      <el-collapse-item title="基础组件" name="basic">
        <div class="component-list">
          <div
            v-for="component in basicComponents"
            :key="component.name"
            class="component-item"
            draggable="true"
            :data-component="component.componentName"
            :data-label="component.label"
            :data-icon="component.icon"
            @dragstart="handleDragStart(component)"
          >
            <el-icon class="component-icon">
              <component :is="component.icon" />
            </el-icon>
            <span class="component-name">{{ component.label }}</span>
          </div>
        </div>
      </el-collapse-item>

      <!-- 表单组件 -->
      <el-collapse-item title="表单组件" name="form">
        <div class="component-list">
          <div
            v-for="component in formComponents"
            :key="component.name"
            class="component-item"
            draggable="true"
            :data-component="component.componentName"
            :data-label="component.label"
            :data-icon="component.icon"
            @dragstart="handleDragStart(component)"
          >
            <el-icon class="component-icon">
              <component :is="component.icon" />
            </el-icon>
            <span class="component-name">{{ component.label }}</span>
          </div>
        </div>
      </el-collapse-item>

      <!-- 数据展示 -->
      <el-collapse-item title="数据展示" name="data">
        <div class="component-list">
          <div
            v-for="component in dataComponents"
            :key="component.name"
            class="component-item"
            draggable="true"
            :data-component="component.componentName"
            :data-label="component.label"
            :data-icon="component.icon"
            @dragstart="handleDragStart(component)"
          >
            <el-icon class="component-icon">
              <component :is="component.icon" />
            </el-icon>
            <span class="component-name">{{ component.label }}</span>
          </div>
        </div>
      </el-collapse-item>

      <!-- 反馈组件 -->
      <el-collapse-item title="反馈组件" name="feedback">
        <div class="component-list">
          <div
            v-for="component in feedbackComponents"
            :key="component.name"
            class="component-item"
            draggable="true"
            :data-component="component.componentName"
            :data-label="component.label"
            :data-icon="component.icon"
            @dragstart="handleDragStart(component)"
          >
            <el-icon class="component-icon">
              <component :is="component.icon" />
            </el-icon>
            <span class="component-name">{{ component.label }}</span>
          </div>
        </div>
      </el-collapse-item>

      <!-- 布局组件 -->
      <el-collapse-item title="布局组件" name="layout">
        <div class="component-list">
          <div
            v-for="component in layoutComponents"
            :key="component.name"
            class="component-item"
            draggable="true"
            :data-component="component.componentName"
            :data-label="component.label"
            :data-icon="component.icon"
            @dragstart="handleDragStart(component)"
          >
            <el-icon class="component-icon">
              <component :is="component.icon" />
            </el-icon>
            <span class="component-name">{{ component.label }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Picture,
  Document,
  Edit,
  Calendar,
  Timer,
  Link,
  Loading,
  CircleCheck,
  CircleClose,
  CircleCloseFilled,
  Warning,
  InfoFilled,
  SuccessFilled,
  WarningFilled,
  Grid,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  DArrowLeft,
  DArrowRight,
  MoreFilled,
  Menu,
  Rank,
  Share,
  House,
  User,
  Setting,
  Bell,
  Message,
  VideoCamera,
  Microphone,
  Phone,
  Location,
  Position,
  Compass,
  MapLocation,
  Goods,
  ShoppingBag,
  ShoppingCart,
  Wallet,
  Coin,
  CreditCard,
  Histogram,
  PieChart,
  TrendCharts,
  DataLine,
  DataAnalysis,
  Monitor,
  Laptop,
  Cellphone,
  Iphone,
  Platform,
  Operation,
  Tools,
  SetUp,
  List,
  Tickets,
  DocumentCopy,
  Folder,
  FolderOpened,
  Files,
  FolderAdd,
  FolderDelete,
  FolderRemove,
  EditPen,
  Delete,
  Download,
  Upload,
  View,
  Hide,
  Lock,
  Unlock,
  ZoomIn,
  ZoomOut,
  Refresh,
  RefreshLeft,
  RefreshRight,
  Sort,
  SortDown,
  SortUp,
  Filter,
  Search,
  Close,
  CloseBold,
  Plus,
  Minus,
  CirclePlus,
  Remove,
  SemiSelect,
  Select,
  SelectAll,
  SelectAllReverse,
  Check,
  CircleCheckFilled,
  WarningFilled as WarningFilled2,
  CircleCloseFilled as CircleCloseFilled2,
  InfoFilled as InfoFilled2
} from '@element-plus/icons-vue';

const emit = defineEmits<{
  dragStart: [component: any];
}>();

const activeNames = ref(['basic']);

// 基础组件
const basicComponents = [
  { name: 'Button', label: '按钮', icon: 'Document', componentName: 'ElButton' },
  { name: 'Link', label: '链接', icon: 'Link', componentName: 'ElLink' },
  { name: 'Text', label: '文本', icon: 'Document', componentName: 'ElText' },
  { name: 'Icon', label: '图标', icon: 'Picture', componentName: 'ElIcon' },
];

// 表单组件
const formComponents = [
  { name: 'Input', label: '输入框', icon: 'Edit', componentName: 'ElInput' },
  { name: 'InputNumber', label: '数字输入', icon: 'Edit', componentName: 'ElInputNumber' },
  { name: 'Select', label: '选择器', icon: 'Select', componentName: 'ElSelect' },
  { name: 'Cascader', label: '级联选择', icon: 'ArrowRight', componentName: 'ElCascader' },
  { name: 'Switch', label: '开关', icon: 'Select', componentName: 'ElSwitch' },
  { name: 'Slider', label: '滑块', icon: 'Sort', componentName: 'ElSlider' },
  { name: 'TimePicker', label: '时间选择', icon: 'Timer', componentName: 'ElTimePicker' },
  { name: 'DatePicker', label: '日期选择', icon: 'Calendar', componentName: 'ElDatePicker' },
  { name: 'Rate', label: '评分', icon: 'Star', componentName: 'ElRate' },
  { name: 'ColorPicker', label: '颜色选择', icon: 'Picture', componentName: 'ElColorPicker' },
  { name: 'Transfer', label: '穿梭框', icon: 'DArrowRight', componentName: 'ElTransfer' },
  { name: 'Form', label: '表单', icon: 'Document', componentName: 'ElForm' },
  { name: 'Radio', label: '单选框', icon: 'CircleCheck', componentName: 'ElRadio' },
  { name: 'Checkbox', label: '多选框', icon: 'Select', componentName: 'ElCheckbox' },
];

// 数据展示组件
const dataComponents = [
  { name: 'Table', label: '表格', icon: 'Histogram', componentName: 'ElTable' },
  { name: 'Tag', label: '标签', icon: 'Select', componentName: 'ElTag' },
  { name: 'Progress', label: '进度条', icon: 'Sort', componentName: 'ElProgress' },
  { name: 'Tree', label: '树形控件', icon: 'DArrowRight', componentName: 'ElTree' },
  { name: 'Pagination', label: '分页', icon: 'Sort', componentName: 'ElPagination' },
  { name: 'Badge', label: '标记', icon: 'Select', componentName: 'ElBadge' },
  { name: 'Avatar', label: '头像', icon: 'User', componentName: 'ElAvatar' },
  { name: 'Skeleton', label: '骨架屏', icon: 'Loading', componentName: 'ElSkeleton' },
  { name: 'Empty', label: '空状态', icon: 'Document', componentName: 'ElEmpty' },
  { name: 'Descriptions', label: '描述列表', icon: 'Document', componentName: 'ElDescriptions' },
  { name: 'Result', label: '结果', icon: 'CircleCheck', componentName: 'ElResult' },
  { name: 'Statistic', label: '统计数值', icon: 'DataLine', componentName: 'ElStatistic' },
];

// 反馈组件
const feedbackComponents = [
  { name: 'Alert', label: '警告', icon: 'Warning', componentName: 'ElAlert' },
  { name: 'Loading', label: '加载', icon: 'Loading', componentName: 'ElLoading' },
  { name: 'Message', label: '消息提示', icon: 'Message', componentName: 'ElMessage' },
  { name: 'MessageBox', label: '弹窗', icon: 'Message', componentName: 'ElMessageBox' },
  { name: 'Notification', label: '通知', icon: 'Bell', componentName: 'ElNotification' },
  { name: 'Dialog', label: '对话框', icon: 'View', componentName: 'ElDialog' },
  { name: 'Drawer', label: '抽屉', icon: 'View', componentName: 'ElDrawer' },
  { name: 'Popconfirm', label: '气泡确认框', icon: 'QuestionFilled', componentName: 'ElPopconfirm' },
  { name: 'Popover', label: '弹出框', icon: 'View', componentName: 'ElPopover' },
  { name: 'Tooltip', label: '文字提示', icon: 'InfoFilled', componentName: 'ElTooltip' },
];

// 布局组件
const layoutComponents = [
  { name: 'Container', label: '容器', icon: 'Grid', componentName: 'ElContainer' },
  { name: 'Row', label: '行', icon: 'Grid', componentName: 'ElRow' },
  { name: 'Col', label: '列', icon: 'Grid', componentName: 'ElCol' },
  { name: 'Card', label: '卡片', icon: 'Document', componentName: 'ElCard' },
  { name: 'Collapse', label: '折叠面板', icon: 'ArrowDown', componentName: 'ElCollapse' },
  { name: 'CollapseItem', label: '折叠项', icon: 'ArrowDown', componentName: 'ElCollapseItem' },
  { name: 'Tabs', label: '标签页', icon: 'Select', componentName: 'ElTabs' },
  { name: 'TabPane', label: '标签页项', icon: 'Select', componentName: 'ElTabPane' },
  { name: 'Breadcrumb', label: '面包屑', icon: 'ArrowRight', componentName: 'ElBreadcrumb' },
  { name: 'PageHeader', label: '页头', icon: 'ArrowLeft', componentName: 'ElPageHeader' },
  { name: 'Divider', label: '分割线', icon: 'Minus', componentName: 'ElDivider' },
  { name: 'Space', label: '间距', icon: 'Grid', componentName: 'ElSpace' },
];

const handleDragStart = (component: any) => {
  emit('dragStart', component);
};
</script>

<style scoped>
.component-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.component-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 8px;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  cursor: grab;
  transition: all 0.3s;
}

.component-item:hover {
  background: #ecf5ff;
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.component-item:active {
  cursor: grabbing;
}

.component-icon {
  font-size: 24px;
  color: #409eff;
  margin-bottom: 8px;
}

.component-name {
  font-size: 12px;
  color: #606266;
  text-align: center;
}

:deep(.el-collapse-item__header) {
  font-weight: 500;
  color: #303133;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 8px;
}
</style>
