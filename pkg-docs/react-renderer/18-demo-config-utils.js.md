# demo/config/utils.js 文件功能说明

## 文件路径

`packages/react-renderer/demo/config/utils.js`

## 功能概述

[`demo/config/utils.js`](packages/react-renderer/demo/config/utils.js) 是 React Renderer 模块的 demo 工具函数文件，导出 Fusion Design 的 Message 组件、Moment.js 时间库和测试工具函数。

## 主要功能

1. **Message 组件**: 导出 Fusion Design 的消息提示组件
2. **Moment.js**: 导出 Moment.js 时间处理库
3. **测试工具**: 提供测试消息显示函数

## 代码结构

```javascript
import { Message } from '@alifd/next';
import moment from 'moment';

export default {
  Message,
  moment,
  test(msg) {
    this.Message.notice(msg);
  },
};
```

## 详细说明

### 1. 导入依赖

```javascript
import { Message } from '@alifd/next';
import moment from 'moment';
```

**功能**: 导入 Message 组件和 Moment.js。

**说明**:
- `Message`: Fusion Design 的消息提示组件
- `moment`: Moment.js 时间处理库

### 2. 导出对象

```javascript
export default {
  Message,
  moment,
  test(msg) {
    this.Message.notice(msg);
  },
};
```

**功能**: 导出工具函数对象。

**导出内容**:

| 属性 | 类型 | 说明 |
|------|------|------|
| `Message` | Object | Fusion Design Message 组件 |
| `moment` | Function | Moment.js 时间处理库 |
| `test` | Function | 测试消息显示函数 |

### 3. Message 组件

```javascript
Message,
```

**功能**: 导出 Fusion Design 的 Message 组件。

**说明**:
- Fusion Design 的消息提示组件
- 用于显示全局消息提示
- 支持多种消息类型

**Message 组件方法**:

| 方法 | 说明 |
|------|------|
| `success(msg)` | 显示成功消息 |
| `warning(msg)` | 显示警告消息 |
| `error(msg)` | 显示错误消息 |
| `help(msg)` | 显示帮助消息 |
| `loading(msg)` | 显示加载消息 |
| `notice(msg)` | 显示普通消息 |

**使用示例**:
```javascript
import utils from './demo/config/utils';

// 显示成功消息
utils.Message.success('操作成功');

// 显示错误消息
utils.Message.error('操作失败');

// 显示普通消息
utils.Message.notice('这是一条消息');
```

### 4. moment 库

```javascript
moment,
```

**功能**: 导出 Moment.js 时间处理库。

**说明**:
- Moment.js 是一个 JavaScript 日期处理库
- 提供丰富的日期解析、验证、操作和显示功能
- 支持多语言

**moment 常用方法**:

| 方法 | 说明 |
|------|------|
| `moment()` | 获取当前时间 |
| `moment(date)` | 解析日期 |
| `format(format)` | 格式化日期 |
| `add(amount, unit)` | 增加时间 |
| `subtract(amount, unit)` | 减少时间 |
| `diff(date, unit)` | 计算时间差 |

**使用示例**:
```javascript
import utils from './demo/config/utils';

// 获取当前时间
const now = utils.moment();

// 格式化日期
const formatted = utils.moment().format('YYYY-MM-DD HH:mm:ss');

// 增加时间
const tomorrow = utils.moment().add(1, 'days');

// 计算时间差
const diff = utils.moment().diff('2020-01-01', 'days');
```

### 5. test 函数

```javascript
test(msg) {
  this.Message.notice(msg);
},
```

**功能**: 测试消息显示函数。

**参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `msg` | string | 是 | 消息内容 |

**说明**:
- 使用 `Message.notice()` 显示消息
- 用于测试和调试
- 简化消息显示调用

**使用示例**:
```javascript
import utils from './demo/config/utils';

// 显示测试消息
utils.test('这是一条测试消息');
```

## 使用场景

### 1. 消息提示

```javascript
import utils from './demo/config/utils';

// 成功消息
utils.Message.success('保存成功');

// 错误消息
utils.Message.error('保存失败');

// 警告消息
utils.Message.warning('请注意');

// 加载消息
utils.Message.loading('加载中...');
```

### 2. 日期处理

```javascript
import utils from './demo/config/utils';

// 格式化日期
const dateStr = utils.moment().format('YYYY-MM-DD');

// 相对时间
const relativeTime = utils.moment('2020-01-01').fromNow();

// 时间差
const days = utils.moment().diff('2020-01-01', 'days');
```

### 3. 测试工具

```javascript
import utils from './demo/config/utils';

// 测试消息
utils.test('测试消息');
```

### 4. 组合使用

```javascript
import utils from './demo/config/utils';

// 显示当前时间
const now = utils.moment().format('YYYY-MM-DD HH:mm:ss');
utils.Message.notice(`当前时间: ${now}`);

// 显示操作结果
try {
  // 执行操作
  utils.Message.success('操作成功');
} catch (error) {
  utils.Message.error(`操作失败: ${error.message}`);
}
```

## 设计模式

### 1. 工具对象模式

```javascript
export default {
  Message,
  moment,
  test(msg) {
    this.Message.notice(msg);
  },
};
```

**优点**:
- 集中管理工具函数
- 简化导入
- 便于维护

**缺点**:
- 所有工具函数在一个对象中
- 可能造成命名冲突

### 2. 函数绑定模式

```javascript
test(msg) {
  this.Message.notice(msg);
},
```

**优点**:
- 简化调用
- 封装复杂逻辑
- 提高代码可读性

**缺点**:
- 依赖 `this` 上下文
- 需要注意调用方式

## 与其他文件的关系

### 与 demo/config/components/index.js 的关系

| 文件 | 用途 |
|------|------|
| [`demo/config/utils.js`](packages/react-renderer/demo/config/utils.js) | 工具函数 |
| [`demo/config/components/index.js`](packages/react-renderer/demo/config/components/index.js) | 组件导出 |

**协作方式**:
- [`components/index.js`](packages/react-renderer/demo/config/components/index.js) 导出组件
- [`utils.js`](packages/react-renderer/demo/config/utils.js) 导出工具函数
- 两者配合使用

### 与 demo/config/constants.js 的关系

| 文件 | 用途 |
|------|------|
| [`demo/config/utils.js`](packages/react-renderer/demo/config/utils.js) | 工具函数 |
| [`demo/config/constants.js`](packages/react-renderer/demo/config/constants.js) | 常量定义 |

**协作方式**:
- [`constants.js`](packages/react-renderer/demo/config/constants.js) 定义常量
- [`utils.js`](packages/react-renderer/demo/config/utils.js) 提供工具函数
- 两者配合使用

## 最佳实践

### 1. 消息提示

- **类型选择**: 根据场景选择合适的消息类型
- **消息内容**: 提供清晰、简洁的消息内容
- **用户反馈**: 及时提供用户反馈

### 2. 日期处理

- **格式统一**: 统一日期格式
- **时区处理**: 注意时区问题
- **性能优化**: 避免频繁创建 moment 对象

### 3. 工具函数

- **职责单一**: 每个函数只做一件事
- **命名清晰**: 使用清晰的函数名
- **错误处理**: 添加必要的错误处理

## 常见问题

### 1. 消息不显示

**问题**: 消息提示不显示

**解决方案**:
- 检查 Message 组件是否正确导入
- 确认消息内容是否为空
- 验证组件是否正确渲染

### 2. 日期格式错误

**问题**: 日期格式不正确

**解决方案**:
- 检查日期格式字符串
- 确认 moment 对象是否正确创建
- 验证日期是否有效

### 3. test 函数不工作

**问题**: test 函数不工作

**解决方案**:
- 检查 `this` 上下文是否正确
- 确认 Message 组件是否可用
- 验证调用方式是否正确

## 相关文件

- [`demo/config/components/index.js`](packages/react-renderer/demo/config/components/index.js): 组件导出
- [`demo/config/constants.js`](packages/react-renderer/demo/config/constants.js): 常量定义

## 总结

[`demo/config/utils.js`](packages/react-renderer/demo/config/utils.js) 是一个工具函数文件，通过导出 Fusion Design 的 Message 组件、Moment.js 时间库和测试工具函数，为 demo 提供了消息提示、日期处理和测试工具的支持。该文件使用工具对象模式，集中管理工具函数，简化了导入和使用过程。
