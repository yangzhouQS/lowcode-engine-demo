<template>
  <div class="property-panel">
    <div class="panel-header">
      <h3>属性配置</h3>
    </div>

    <div class="panel-content">
      <el-empty v-if="!selectedNode" description="请选择组件进行配置">
        <template #image>
          <el-icon :size="80" color="#c0c4cc">
            <Setting />
          </el-icon>
        </template>
      </el-empty>

      <div v-else class="property-form">
        <!-- 基础信息 -->
        <div class="property-section">
          <h4>基础信息</h4>
          <el-form label-width="80px" size="small">
            <el-form-item label="组件ID">
              <el-input :model-value="selectedNode.id" disabled />
            </el-form-item>
            <el-form-item label="组件名称">
              <el-input :model-value="selectedNode.componentName" disabled />
            </el-form-item>
            <el-form-item label="显示名称">
              <el-input :model-value="selectedNode.label" @update:model-value="handleLabelChange" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 属性配置 -->
        <div class="property-section">
          <h4>属性配置</h4>
          <el-form label-width="80px" size="small">
            <el-form-item
              v-for="(value, key) in selectedNode.props"
              :key="key"
              :label="key"
            >
              <!-- 字符串类型 -->
              <el-input
                v-if="typeof value === 'string'"
                :model-value="value"
                @update:model-value="val => handlePropChange(key, val)"
              />

              <!-- 数字类型 -->
              <el-input-number
                v-else-if="typeof value === 'number'"
                :model-value="value"
                @update:model-value="val => handlePropChange(key, val)"
                style="width: 100%"
              />

              <!-- 布尔类型 -->
              <el-switch
                v-else-if="typeof value === 'boolean'"
                :model-value="value"
                @update:model-value="val => handlePropChange(key, val)"
              />

              <!-- 数组类型 -->
              <el-select
                v-else-if="Array.isArray(value)"
                :model-value="value"
                @update:model-value="val => handlePropChange(key, val)"
                multiple
                style="width: 100%"
              >
                <el-option label="选项1" value="option1" />
                <el-option label="选项2" value="option2" />
                <el-option label="选项3" value="option3" />
              </el-select>

              <!-- 对象类型 -->
              <el-input
                v-else-if="typeof value === 'object'"
                type="textarea"
                :rows="3"
                :model-value="JSON.stringify(value, null, 2)"
                @update:model-value="val => handleObjectChange(key, val)"
              />

              <!-- 其他类型 -->
              <el-input
                v-else
                :model-value="String(value)"
                @update:model-value="val => handlePropChange(key, val)"
              />
            </el-form-item>

            <!-- 添加新属性 -->
            <el-form-item label="添加属性">
              <el-space>
                <el-input
                  v-model="newPropKey"
                  placeholder="属性名"
                  style="width: 120px"
                />
                <el-select
                  v-model="newPropType"
                  placeholder="类型"
                  style="width: 100px"
                >
                  <el-option label="字符串" value="string" />
                  <el-option label="数字" value="number" />
                  <el-option label="布尔" value="boolean" />
                  <el-option label="数组" value="array" />
                </el-select>
                <el-button type="primary" @click="handleAddProp">添加</el-button>
              </el-space>
            </el-form-item>
          </el-form>
        </div>

        <!-- 样式配置 -->
        <div class="property-section">
          <h4>样式配置</h4>
          <el-form label-width="80px" size="small">
            <el-form-item label="宽度">
              <el-input
                :model-value="styleValues.width"
                placeholder="如: 100px, 50%"
                @update:model-value="val => handleStyleChange('width', val)"
              />
            </el-form-item>
            <el-form-item label="高度">
              <el-input
                :model-value="styleValues.height"
                placeholder="如: 100px, auto"
                @update:model-value="val => handleStyleChange('height', val)"
              />
            </el-form-item>
            <el-form-item label="内边距">
              <el-input
                :model-value="styleValues.padding"
                placeholder="如: 10px, 10px 20px"
                @update:model-value="val => handleStyleChange('padding', val)"
              />
            </el-form-item>
            <el-form-item label="外边距">
              <el-input
                :model-value="styleValues.margin"
                placeholder="如: 10px, 10px 20px"
                @update:model-value="val => handleStyleChange('margin', val)"
              />
            </el-form-item>
            <el-form-item label="背景色">
              <el-color-picker
                :model-value="styleValues.backgroundColor"
                @update:model-value="val => handleStyleChange('backgroundColor', val)"
              />
            </el-form-item>
            <el-form-item label="文字颜色">
              <el-color-picker
                :model-value="styleValues.color"
                @update:model-value="val => handleStyleChange('color', val)"
              />
            </el-form-item>
            <el-form-item label="字体大小">
              <el-input
                :model-value="styleValues.fontSize"
                placeholder="如: 14px"
                @update:model-value="val => handleStyleChange('fontSize', val)"
              />
            </el-form-item>
            <el-form-item label="圆角">
              <el-input
                :model-value="styleValues.borderRadius"
                placeholder="如: 4px"
                @update:model-value="val => handleStyleChange('borderRadius', val)"
              />
            </el-form-item>
            <el-form-item label="边框">
              <el-input
                :model-value="styleValues.border"
                placeholder="如: 1px solid #ddd"
                @update:model-value="val => handleStyleChange('border', val)"
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 事件配置 -->
        <div class="property-section">
          <h4>事件配置</h4>
          <el-form label-width="80px" size="small">
            <el-form-item
              v-for="(handler, event) in selectedNode.events"
              :key="event"
              :label="event"
            >
              <el-input
                :model-value="handler"
                placeholder="事件处理函数"
                @update:model-value="val => handleEventChange(event, val)"
              />
            </el-form-item>

            <!-- 添加新事件 -->
            <el-form-item label="添加事件">
              <el-space>
                <el-select
                  v-model="newEventName"
                  placeholder="事件名"
                  style="width: 150px"
                >
                  <el-option label="点击" value="click" />
                  <el-option label="双击" value="dblclick" />
                  <el-option label="输入" value="input" />
                  <el-option label="改变" value="change" />
                  <el-option label="聚焦" value="focus" />
                  <el-option label="失焦" value="blur" />
                  <el-option label="提交" value="submit" />
                  <el-option label="重置" value="reset" />
                </el-select>
                <el-button type="primary" @click="handleAddEvent">添加</el-button>
              </el-space>
            </el-form-item>
          </el-form>
        </div>

        <!-- 操作按钮 -->
        <div class="property-actions">
          <el-button type="danger" :icon="Delete" @click="handleDelete">
            删除组件
          </el-button>
          <el-button :icon="CopyDocument" @click="handleCopy">
            复制组件
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Setting, Delete, CopyDocument } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps<{
  selectedNode: any;
}>();

const emit = defineEmits<{
  updateNode: [nodeId: string, updates: any];
}>();

const newPropKey = ref('');
const newPropType = ref('string');
const newEventName = ref('');

// 计算样式值
const styleValues = computed(() => {
  return props.selectedNode?.style || {};
});

const handleLabelChange = (value: string) => {
  if (props.selectedNode) {
    emit('updateNode', props.selectedNode.id, {
      label: value
    });
  }
};

const handlePropChange = (key: string, value: any) => {
  if (props.selectedNode) {
    const newProps = { ...props.selectedNode.props, [key]: value };
    emit('updateNode', props.selectedNode.id, {
      props: newProps
    });
  }
};

const handleObjectChange = (key: string, value: string) => {
  try {
    const parsedValue = JSON.parse(value);
    handlePropChange(key, parsedValue);
  } catch (error) {
    ElMessage.error('JSON 格式错误');
  }
};

const handleAddProp = () => {
  if (!newPropKey.value) {
    ElMessage.warning('请输入属性名');
    return;
  }

  if (props.selectedNode) {
    let defaultValue: any = '';
    switch (newPropType.value) {
      case 'number':
        defaultValue = 0;
        break;
      case 'boolean':
        defaultValue = false;
        break;
      case 'array':
        defaultValue = [];
        break;
      default:
        defaultValue = '';
    }

    const newProps = { ...props.selectedNode.props, [newPropKey.value]: defaultValue };
    emit('updateNode', props.selectedNode.id, {
      props: newProps
    });

    newPropKey.value = '';
    ElMessage.success('属性添加成功');
  }
};

const handleStyleChange = (key: string, value: string) => {
  if (props.selectedNode) {
    const newStyle = { ...styleValues.value, [key]: value };
    emit('updateNode', props.selectedNode.id, {
      style: newStyle
    });
  }
};

const handleEventChange = (event: string, handler: string) => {
  if (props.selectedNode) {
    const newEvents = { ...props.selectedNode.events, [event]: handler };
    emit('updateNode', props.selectedNode.id, {
      events: newEvents
    });
  }
};

const handleAddEvent = () => {
  if (!newEventName.value) {
    ElMessage.warning('请选择事件名');
    return;
  }

  if (props.selectedNode) {
    const newEvents = { ...props.selectedNode.events, [newEventName.value]: '' };
    emit('updateNode', props.selectedNode.id, {
      events: newEvents
    });

    newEventName.value = '';
    ElMessage.success('事件添加成功');
  }
};

const handleDelete = async () => {
  if (!props.selectedNode) return;

  try {
    await ElMessageBox.confirm('确定要删除该组件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    emit('updateNode', props.selectedNode.id, { _delete: true });
    ElMessage.success('组件已删除');
  } catch {
    // 取消操作
  }
};

const handleCopy = () => {
  if (props.selectedNode) {
    const newNode = JSON.parse(JSON.stringify(props.selectedNode));
    newNode.id = `node_${Date.now()}`;
    emit('updateNode', props.selectedNode.id, { _copy: newNode });
    ElMessage.success('组件已复制');
  }
};
</script>

<style scoped>
.property-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
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

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.property-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.property-section {
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.property-section:last-child {
  border-bottom: none;
}

.property-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.property-actions {
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.property-actions .el-button {
  flex: 1;
}

:deep(.el-form-item) {
  margin-bottom: 12px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #606266;
}

:deep(.el-input__inner) {
  font-size: 12px;
}

:deep(.el-textarea__inner) {
  font-size: 12px;
  font-family: 'Courier New', monospace;
}
</style>
