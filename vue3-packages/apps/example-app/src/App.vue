<template>
  <div id="app" class="app">
    <EditorLayout />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import EditorLayout from './components/editor/EditorLayout.vue';

// 设置全局拖拽处理
const handleGlobalDragStart = (e: DragEvent) => {
  const target = e.target as HTMLElement;
  const componentItem = target.closest('.component-item');
  if (componentItem) {
    const componentName = componentItem.getAttribute('data-component');
    const componentLabel = componentItem.getAttribute('data-label');
    const componentIcon = componentItem.getAttribute('data-icon');

    if (e.dataTransfer && componentName) {
      e.dataTransfer.setData('component', JSON.stringify({
        componentName,
        label: componentLabel,
        icon: componentIcon
      }));
      e.dataTransfer.effectAllowed = 'copy';
    }
  }
};

onMounted(() => {
  document.addEventListener('dragstart', handleGlobalDragStart);
});

onBeforeUnmount(() => {
  document.removeEventListener('dragstart', handleGlobalDragStart);
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  overflow: hidden;
}
</style>
