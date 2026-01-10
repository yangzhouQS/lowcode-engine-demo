<template>
  <component
    :is="getComponent(schema.componentName)"
    v-bind="schema.props"
    :style="schema.style"
    @[eventName]="handleEvent"
  >
    <template v-if="schema.children && schema.children.length > 0">
      <SchemaRenderer
        v-for="(child, index) in schema.children"
        :key="child.id || index"
        :schema="child"
        @[eventName]="handleEvent"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as ElementPlus from 'element-plus';

const props = defineProps<{
  schema: any;
}>();

const emit = defineEmits<{
  [eventName: string]: [event: Event];
}>();

// 获取组件
const getComponent = (componentName: string) => {
  const componentMap: Record<string, any> = {
    // 基础组件
    ElButton: ElementPlus.ElButton,
    ElLink: ElementPlus.ElLink,
    ElText: ElementPlus.ElText,
    ElIcon: ElementPlus.ElIcon,

    // 表单组件
    ElInput: ElementPlus.ElInput,
    ElInputNumber: ElementPlus.ElInputNumber,
    ElSelect: ElementPlus.ElSelect,
    ElOption: ElementPlus.ElOption,
    ElCascader: ElementPlus.ElCascader,
    ElSwitch: ElementPlus.ElSwitch,
    ElSlider: ElementPlus.ElSlider,
    ElTimePicker: ElementPlus.ElTimePicker,
    ElDatePicker: ElementPlus.ElDatePicker,
    ElRate: ElementPlus.ElRate,
    ElColorPicker: ElementPlus.ElColorPicker,
    ElTransfer: ElementPlus.ElTransfer,
    ElForm: ElementPlus.ElForm,
    ElFormItem: ElementPlus.ElFormItem,
    ElRadio: ElementPlus.ElRadio,
    ElRadioGroup: ElementPlus.ElRadioGroup,
    ElCheckbox: ElementPlus.ElCheckbox,
    ElCheckboxGroup: ElementPlus.ElCheckboxGroup,

    // 数据展示组件
    ElTable: ElementPlus.ElTable,
    ElTableColumn: ElementPlus.ElTableColumn,
    ElTag: ElementPlus.ElTag,
    ElProgress: ElementPlus.ElProgress,
    ElTree: ElementPlus.ElTree,
    ElPagination: ElementPlus.ElPagination,
    ElBadge: ElementPlus.ElBadge,
    ElAvatar: ElementPlus.ElAvatar,
    ElSkeleton: ElementPlus.ElSkeleton,
    ElSkeletonItem: ElementPlus.ElSkeletonItem,
    ElEmpty: ElementPlus.ElEmpty,
    ElDescriptions: ElementPlus.ElDescriptions,
    ElDescriptionsItem: ElementPlus.ElDescriptionsItem,
    ElResult: ElementPlus.ElResult,
    ElStatistic: ElementPlus.ElStatistic,

    // 反馈组件
    ElAlert: ElementPlus.ElAlert,
    ElDialog: ElementPlus.ElDialog,
    ElDrawer: ElementPlus.ElDrawer,
    ElPopconfirm: ElementPlus.ElPopconfirm,
    ElPopover: ElementPlus.ElPopover,
    ElTooltip: ElementPlus.ElTooltip,

    // 布局组件
    ElContainer: ElementPlus.ElContainer,
    ElHeader: ElementPlus.ElHeader,
    ElMain: ElementPlus.ElMain,
    ElFooter: ElementPlus.ElFooter,
    ElAside: ElementPlus.ElAside,
    ElRow: ElementPlus.ElRow,
    ElCol: ElementPlus.ElCol,
    ElCard: ElementPlus.ElCard,
    ElCollapse: ElementPlus.ElCollapse,
    ElCollapseItem: ElementPlus.ElCollapseItem,
    ElTabs: ElementPlus.ElTabs,
    ElTabPane: ElementPlus.ElTabPane,
    ElBreadcrumb: ElementPlus.ElBreadcrumb,
    ElBreadcrumbItem: ElementPlus.ElBreadcrumbItem,
    ElPageHeader: ElementPlus.ElPageHeader,
    ElDivider: ElementPlus.ElDivider,
    ElSpace: ElementPlus.ElSpace,
  };

  return componentMap[componentName] || 'div';
};

// 事件处理
const handleEvent = (event: Event) => {
  const eventName = event.type;
  emit(eventName, event);
};
</script>
