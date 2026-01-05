# zh-CN.json 文档

## 文件路径

`packages/react-simulator-renderer/src/locale/zh-CN.json`

## 功能概述

该文件是低代码引擎模拟器的中文语言包，定义了模拟器界面中使用的中文文本。它为设计器提供了中文的提示信息和错误消息。

## 主要功能

1. **国际化支持**: 提供中文文本，支持中文用户界面
2. **提示信息**: 定义空容器和锁定状态的提示文本
3. **用户反馈**: 为用户提供清晰的操作指导

## 文件内容

```json
{
  "Drag and drop components or templates here": "拖拽组件或模板到这里",
  "Locked elements and child elements cannot be edited": "锁定元素及子元素无法编辑"
}
```

## 翻译键说明

### 1. Drag and drop components or templates here

**键名**: `Drag and drop components or templates here`

**值**: `"拖拽组件或模板到这里"`

**用途**: 空容器提示文本

**使用场景**:
- 当容器中没有子元素时显示
- 提示用户可以拖拽组件或模板到该容器
- 在设计器的画布中显示

**示例**:
```typescript
// 在空容器中显示
<div className="lc-container-placeholder">
  {intl('Drag and drop components or templates here')}
</div>
```

**翻译说明**:
- "Drag and drop": 拖拽
- "components": 组件
- "or": 或
- "templates": 模板
- "here": 这里

### 2. Locked elements and child elements cannot be edited

**键名**: `Locked elements and child elements cannot be edited`

**值**: `"锁定元素及子元素无法编辑"`

**用途**: 锁定状态提示文本

**使用场景**:
- 当元素被锁定时显示
- 提示用户无法编辑锁定的元素及其子元素
- 在设计器的属性面板或画布中显示

**示例**:
```typescript
// 在锁定元素上显示提示
<div className="lc-locked-element">
  <div className="lock-warning">
    {intl('Locked elements and child elements cannot be edited')}
  </div>
</div>
```

**翻译说明**:
- "Locked elements": 锁定元素
- "and": 及
- "child elements": 子元素
- "cannot be edited": 无法编辑

## 使用方式

### 在 React 组件中使用

```typescript
import { createIntl } from './locale';

const { intl } = createIntl('zh-CN');

// 使用国际化文本
const placeholderText = intl('Drag and drop components or templates here');
const lockedText = intl('Locked elements and child elements cannot be edited');
```

### 在设计器中使用

```typescript
import { createIntl } from '@alilc/lowcode-react-simulator-renderer';

// 根据当前语言创建国际化工具
const locale = 'zh-CN'; // 或从配置中获取
const { intl } = createIntl(locale);

// 在组件中使用
function ContainerPlaceholder() {
  return (
    <div className="lc-container-placeholder">
      {intl('Drag and drop components or templates here')}
    </div>
  );
}
```

## 语言包结构

```typescript
type LocaleMessages = {
  [key: string]: string;
};

const zhCN: LocaleMessages = {
  "Drag and drop components or templates here": "拖拽组件或模板到这里",
  "Locked elements and child elements cannot be edited": "锁定元素及子元素无法编辑"
};
```

**说明**:
- 键名是英文文本（与 en-US.json 保持一致）
- 值是对应的中文翻译
- 键名使用英文便于跨语言包的一致性

## 多语言对比

| 键名 | 英文 (en-US) | 中文 (zh-CN) |
|------|----------------|--------------|
| Drag and drop components or templates here | Drag and drop components or templates here | 拖拽组件或模板到这里 |
| Locked elements and child elements cannot be edited | Locked elements and child elements cannot be edited | 锁定元素及子元素无法编辑 |

## 注意事项

1. **键名一致性**: 键名必须与 en-US.json 保持完全一致
2. **翻译准确性**: 确保翻译准确传达原意
3. **语言习惯**: 遵循中文表达习惯，避免直译
4. **简洁性**: 文本应简洁明了，便于快速理解
5. **格式正确**: 保持 JSON 格式正确，确保逗号和引号正确

## 扩展语言包

如需添加新的翻译文本，按以下步骤操作：

1. **在 en-US.json 中添加**:
```json
{
  "Drag and drop components or templates here": "Drag and drop components or templates here",
  "Locked elements and child elements cannot be edited": "Locked elements and child elements cannot be edited",
  "New message": "New message in English"
}
```

2. **在 zh-CN.json 中添加对应翻译**:
```json
{
  "Drag and drop components or templates here": "拖拽组件或模板到这里",
  "Locked elements and child elements cannot be edited": "锁定元素及子元素无法编辑",
  "New message": "新的中文消息"
}
```

3. **在代码中使用**:
```typescript
const { intl } = createIntl('zh-CN');
const message = intl('New message');
```

## 翻译最佳实践

1. **保持简洁**: 中文表达通常比英文简洁，避免冗长
2. **使用专业术语**: 使用领域内通用的专业术语
3. **考虑上下文**: 根据使用场景选择合适的表达方式
4. **避免歧义**: 确保翻译不会产生歧义
5. **测试效果**: 在实际 UI 中测试翻译效果，确保显示正常

## 常见翻译模式

### 1. 动作提示

```
英文: Drag and drop X here
中文: 拖拽X到这里
```

### 2. 状态说明

```
英文: X cannot be edited
中文: X无法编辑
```

### 3. 组合表达

```
英文: X and Y
中文: X及Y / X和Y
```

## 相关文件

- [`src/locale/index.ts`](../packages/react-simulator-renderer/src/locale/index.ts) - 国际化工具函数
- [`src/locale/en-US.json`](../packages/react-simulator-renderer/src/locale/en-US.json) - 英文语言包

## 最佳实践

1. **键名使用英文**: 使用英文作为键名，便于理解和维护
2. **翻译一致性**: 同一概念在不同地方的翻译应保持一致
3. **用户友好**: 翻译应考虑用户的使用场景和心理预期
4. **版本控制**: 语言包变更应纳入版本控制，便于追踪
5. **团队协作**: 翻译工作应由熟悉目标语言的团队成员完成

## 总结

`zh-CN.json` 文件是低代码引擎模拟器的中文语言包，它提供了两个关键的提示文本：

1. **空容器提示**: "拖拽组件或模板到这里" - 引导用户拖拽组件到容器
2. **锁定提示**: "锁定元素及子元素无法编辑" - 告知用户锁定元素无法编辑

通过这个语言包，设计器能够为中文用户提供友好的界面提示，提升用户体验。语言包的设计遵循了国际化的最佳实践，使用键值对的方式管理翻译，便于扩展和维护。键名使用英文确保了跨语言包的一致性，而值则提供了准确的中文翻译。
