<template>
  <div class="playground">
    <el-container>
      <el-header class="header">
        <h1>Vue3 LowCode Engine Playground</h1>
      </el-header>
      <el-main class="main">
        <div class="content">
          <h2>欢迎使用 Vue3 LowCode Engine</h2>
          <p>这是一个基于 Vue3 的低代码引擎示例应用</p>
          <el-alert
            title="开发中"
            type="info"
            description="Playground 应用正在开发中,更多功能即将推出"
            :closable="false"
            show-icon
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Playground 应用已启动');
});
</script>

<style scoped>
.playground {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header h1 {
  margin: 0;
  font-size: 20px;
}

.main {
  padding: 20px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.content h2 {
  margin-top: 0;
  color: #303133;
}

.content p {
  font-size: 16px;
  color: #606266;
  margin-bottom: 20px;
}
</style>
