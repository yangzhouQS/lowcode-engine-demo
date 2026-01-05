# en-US.json 文档

## 文件路径

`packages/react-simulator-renderer/src/locale/en-US.json`

## 功能概述

该文件是低代码引擎模拟器的英文语言包，定义了模拟器界面中使用的英文文本。它为设计器提供了英文的提示信息和错误消息。

## 主要功能

1. **国际化支持**: 提供英文文本，支持英文用户界面
2. **提示信息**: 定义空容器和锁定状态的提示文本
3. **用户反馈**: 为用户提供清晰的操作指导

## 文件内容

```json
{
  "Drag and drop components or templates here": "Drag and drop components or templates here",
  "Locked elements and child elements cannot be edited": "Locked elements and child elements cannot be edited"
}
```

## 翻译键说明

### 1. Drag and drop components or templates here

**键名**: `Drag and drop components or templates here`

**值**: `"Drag and drop components or templates here"`

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

### 2. Locked elements and child elements cannot be edited

**键名**: `Locked elements and child elements cannot be edited`

**值**: `"Locked elements and child elements cannot be edited"`

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

## 使用方式

### 在 React 组件中使用

```typescript
import { createIntl } from './locale';

const { intl } = createIntl('en-US');

// 使用国际化文本
const placeholderText = intl('Drag and drop components or templates here');
const lockedText = intl('Locked elements and child elements cannot be edited');
```

### 在设计器中使用

```typescript
import { createIntl } from '@alilc/lowcode-react-simulator-renderer';

// 根据当前语言创建国际化工具
const locale = 'en-US'; // 或从配置中获取
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

const enUS: LocaleMessages = {
  "Drag and drop components or templates here": "Drag and drop components or templates here",
  "Locked elements and child elements cannot be edited": "Locked elements and child elements cannot be edited"
};
```

**说明**:
- 键名是英文文本本身
- 值是对应的翻译文本
- 当前文件中，键名和值相同（因为是英文语言包）

## 注意事项

1. **键名一致性**: 键名应该与其他语言包保持一致
2. **文本完整性**: 确保所有需要国际化的文本都有对应的翻译
3. **上下文相关**: 翻译时应考虑文本的使用场景
4. **占位符**: 如果文本包含变量，应使用占位符（如 `{name}`）
5. **格式一致性**: 保持 JSON 格式正确，确保逗号和引号正确

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

2. **在其他语言包中添加对应翻译**:
```json
// zh-CN.json
{
  "Drag and drop components or templates here": "拖拽组件或模板到这里",
  "Locked elements and child elements cannot be edited": "锁定元素及子元素无法编辑",
  "New message": "新的中文消息"
}
```

3. **在代码中使用**:
```typescript
const { intl } = createIntl('en-US');
const message = intl('New message');
```

## 相关文件

- [`src/locale/index.ts`](../packages/react-simulator-renderer/src/locale/index.ts) - 国际化工具函数
- [`src/locale/zh-CN.json`](../packages/react-simulator-renderer/src/locale/zh-CN.json) - 中文语言包

## 最佳实践

1. **键名使用英文**: 使用英文作为键名，便于理解和维护
2. **保持简洁**: 文本应简洁明了，避免冗长
3. **考虑长度**: 不同语言的文本长度可能不同，UI 设计应考虑文本长度变化
4. **测试翻译**: 在实际 UI 中测试翻译效果，确保显示正常
5. **版本控制**: 语言包变更应纳入版本控制，便于追踪

## 总结

`en-US.json` 文件是低代码引擎模拟器的英文语言包，它提供了两个关键的提示文本：

1. **空容器提示**: 引导用户拖拽组件到容器
2. **锁定提示**: 告知用户锁定元素无法编辑

通过这个语言包，设计器能够为英文用户提供友好的界面提示，提升用户体验。语言包的设计遵循了国际化的最佳实践，使用键值对的方式管理翻译，便于扩展和维护。
