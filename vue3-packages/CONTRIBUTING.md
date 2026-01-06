# 贡献指南

感谢你对 Vue3 LowCode Engine 项目的关注！我们欢迎任何形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [问题反馈](#问题反馈)

## 行为准则

- 尊重所有贡献者
- 接受建设性的批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

## 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 检查 [Issues](https://github.com/your-org/vue3-lowcode-engine/issues) 确认该 bug 是否已被报告
2. 如果没有，创建一个新的 Issue，包含：
   - 清晰的标题和描述
   - 重现步骤
   - 预期行为和实际行为
   - 截图或错误日志（如果适用）
   - 环境信息（Node.js 版本、操作系统等）

### 提交功能请求

如果你有功能建议，请：

1. 检查 [Issues](https://github.com/your-org/vue3-lowcode-engine/issues) 确认该功能是否已被建议
2. 如果没有，创建一个新的 Issue，包含：
   - 清晰的功能描述
   - 使用场景
   - 可能的实现方案

### 提交代码

如果你想提交代码，请按照以下步骤进行：

## 开发流程

### 1. Fork 项目

点击项目页面右上角的 "Fork" 按钮，将项目 fork 到你的 GitHub 账户。

### 2. 克隆项目

```bash
git clone https://github.com/your-username/vue3-lowcode-engine.git
cd vue3-lowcode-engine
```

### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

分支命名规范：
- 功能: `feature/功能名称`
- 修复: `fix/问题描述`
- 文档: `docs/文档更新`
- 测试: `test/测试更新`
- 重构: `refactor/重构描述`

### 4. 安装依赖

```bash
pnpm install
```

### 5. 开发和测试

```bash
# 运行开发服务器
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 6. 提交代码

```bash
git add .
git commit -m "feat: 添加新功能"
```

### 7. 推送代码

```bash
git push origin feature/your-feature-name
```

### 8. 创建 Pull Request

1. 访问 [Pull Requests](https://github.com/your-org/vue3-lowcode-engine/pulls)
2. 点击 "New Pull Request"
3. 选择你的分支
4. 填写 PR 模板
5. 提交 PR

## 代码规范

### TypeScript 规范

- 使用 TypeScript 编写所有代码
- 避免使用 `any` 类型
- 使用接口定义数据结构
- 添加适当的类型注解

### Vue3 规范

- 使用 Composition API
- 使用 `<script setup>` 语法
- 组件文件使用 PascalCase 命名
- Props 定义使用 TypeScript 接口

### 命名规范

- 文件名: kebab-case
- 组件名: PascalCase
- 变量名: camelCase
- 常量名: UPPER_SNAKE_CASE
- 函数名: camelCase
- 类名: PascalCase

### 注释规范

- 使用 JSDoc 风格的注释
- 为公共 API 添加注释
- 为复杂逻辑添加注释

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI 配置文件和脚本的变动
- `revert`: 回滚之前的 commit

### 示例

```bash
feat(editor): 添加组件拖拽功能

- 实现组件拖拽逻辑
- 添加拖拽事件处理
- 更新相关文档

Closes #123
```

## 问题反馈

在提交 Issue 之前，请：

1. 搜索现有的 Issues
2. 提供清晰的问题描述
3. 包含重现步骤
4. 提供环境信息
5. 使用合适的 Issue 模板

## 获取帮助

如果你需要帮助：

- 查看 [文档](./docs/)
- 在 [Discussions](https://github.com/your-org/vue3-lowcode-engine/discussions) 中提问
- 加入我们的 [Discord/Slack 社区](#)

---

再次感谢你的贡献！🎉
