# create-icon.tsx API 设计文档

## 文件路径

`packages/utils/src/create-icon.tsx`

## 功能概述

`createIcon` 函数是一个灵活的图标创建工具，支持多种图标类型，包括字符串图标、URL 图标、React 组件图标和 React 元素图标。它自动识别图标类型并返回相应的 React 元素。

## 主要功能

1. **多类型支持**: 支持字符串、URL、React 组件、React 元素等多种图标类型
2. **ES Module 处理**: 自动处理 ES Module 导入的图标
3. **URL 识别**: 自动识别 URL 并创建 img 元素
4. **Props 传递**: 支持传递额外的 props 到图标组件
5. **类型安全**: 使用 TypeScript 类型定义确保类型安全
6. **灵活配置**: 支持配置图标的各种属性

## 函数定义

```typescript
import { IPublicTypeIconType } from '@alilc/lowcode-types';

export function createIcon(
  icon?: IPublicTypeIconType | null,
  props?: Record<string, unknown>,
): ReactNode
```

## 参数说明

### icon

- **类型**: `IPublicTypeIconType | null | undefined`
- **描述**: 图标配置
- **必需**: 否
- **说明**: 
  - 可以是字符串（图标名称或 URL）
  - 可以是 React 组件
  - 可以是 React 元素
  - 可以是对象（Icon 组件的 props）
  - 可以是 ES Module（自动提取 default 导出）
  - `null` 或 `undefined` 返回 `null`

### props

- **类型**: `Record<string, unknown>`
- **描述**: 传递给图标的额外属性
- **必需**: 否
- **说明**: 
  - 会合并到图标组件的 props 中
  - 常用属性：`className`、`style`、`onClick` 等

## 返回值

- **类型**: `ReactNode`
- **描述**: React 元素或 `null`

## 支持的图标类型

### 1. 字符串图标

```typescript
// Fusion Design Icon 类型
createIcon('arrow-left');
createIcon('arrow-right');
createIcon('close');
```

### 2. URL 图标

```typescript
// HTTP/HTTPS URL
createIcon('https://example.com/icon.png');
createIcon('http://example.com/icon.svg');
```

### 3. React 组件图标

```typescript
// React 组件
import MyIcon from './MyIcon';
createIcon(MyIcon);
```

### 4. React 元素图标

```typescript
// React 元素
const iconElement = <MyIcon size="large" />;
createIcon(iconElement);
```

### 5. 对象图标

```typescript
// Icon 组件的 props
createIcon({ type: 'arrow-left', size: 'large' });
```

### 6. ES Module 图标

```typescript
// ES Module（自动提取 default）
import * as iconModule from './icon';
createIcon(iconModule);
```

## 使用示例

### 基本使用

```typescript
import { createIcon } from '@alilc/lowcode-utils';

// 使用字符串图标
const icon1 = createIcon('arrow-left');
console.log(icon1); // <Icon type="arrow-left" />

// 使用 URL 图标
const icon2 = createIcon('https://example.com/icon.png');
console.log(icon2); // <img src="https://example.com/icon.png" />

// 使用 React 组件
const MyIcon = ({ size }) => <svg>...</svg>;
const icon3 = createIcon(MyIcon);
console.log(icon3); // <MyIcon />
```

### 带 Props 的图标

```typescript
import { createIcon } from '@alilc/lowcode-utils';

// 传递 className
const icon1 = createIcon('arrow-left', { className: 'my-icon' });
// <Icon type="arrow-left" className="my-icon" />

// 传递样式
const icon2 = createIcon('arrow-left', { style: { color: 'red' } });
// <Icon type="arrow-left" style={{ color: 'red' }} />

// 传递事件处理
const icon3 = createIcon('arrow-left', { onClick: handleClick });
// <Icon type="arrow-left" onClick={handleClick} />
```

### 在 React 组件中使用

```typescript
import { createIcon } from '@alilc/lowcode-utils';

function MyComponent({ icon }) {
  return (
    <div>
      {createIcon(icon, { className: 'component-icon' })}
    </div>
  );
}

// 使用
<MyComponent icon="arrow-left" />
<MyComponent icon="https://example.com/icon.png" />
<MyComponent icon={MyCustomIcon} />
```

### 动态图标

```typescript
import { createIcon } from '@alilc/lowcode-utils';

function IconComponent({ iconName, iconType }) {
  const icon = iconType === 'url' 
    ? `https://example.com/${iconName}.png`
    : iconName;
    
  return createIcon(icon, { className: 'dynamic-icon' });
}

// 使用
<IconComponent iconName="arrow-left" iconType="string" />
<IconComponent iconName="arrow-left" iconType="url" />
```

### 条件渲染

```typescript
import { createIcon } from '@alilc/lowcode-utils';

function ConditionalIcon({ showIcon, icon }) {
  return showIcon ? createIcon(icon) : null;
}

// 使用
<ConditionalIcon showIcon={true} icon="arrow-left" />
<ConditionalIcon showIcon={false} icon="arrow-left" />
```

### 列表渲染

```typescript
import { createIcon } from '@alilc/lowcode-utils';

const icons = ['arrow-left', 'arrow-right', 'close'];

function IconList() {
  return (
    <div>
      {icons.map(icon => (
        <div key={icon}>
          {createIcon(icon, { className: 'list-icon' })}
        </div>
      ))}
    </div>
  );
}
```

### 自定义图标组件

```typescript
import { createIcon } from '@alilc/lowcode-utils';

function CustomIcon({ icon, size = 'medium', color = 'black' }) {
  return createIcon(icon, {
    className: `custom-icon custom-icon-${size}`,
    style: { color }
  });
}

// 使用
<CustomIcon icon="arrow-left" size="large" color="red" />
```

## 实现细节

### 核心代码

```typescript
import { isValidElement, ReactNode, createElement, cloneElement } from 'react';
import { Icon } from '@alifd/next';
import { IPublicTypeIconType } from '@alilc/lowcode-types';
import { isReactComponent } from './is-react';
import { isESModule } from './is-es-module';

const URL_RE = /^(https?:)\/\//i;

export function createIcon(
    icon?: IPublicTypeIconType | null,
    props?: Record<string, unknown>,
  ): ReactNode {
  // 1. 检查 icon 是否为空
  if (!icon) {
    return null;
  }
  
  // 2. 处理 ES Module
  if (isESModule(icon)) {
    icon = icon.default;
  }
  
  // 3. 处理字符串类型
  if (typeof icon === 'string') {
    // 3.1 检查是否为 URL
    if (URL_RE.test(icon)) {
      return createElement('img', {
        src: icon,
        class: props?.className,
        ...props,
      });
    }
    // 3.2 使用 Fusion Design Icon
    return <Icon type={icon} {...props} />;
  }
  
  // 4. 处理 React 元素
  if (isValidElement(icon)) {
    return cloneElement(icon, { ...props });
  }
  
  // 5. 处理 React 组件
  if (isReactComponent(icon)) {
    return createElement(icon, {
      class: props?.className,
      ...props,
    });
  }
  
  // 6. 处理对象类型（Icon 组件的 props）
  return <Icon {...icon} {...props} />;
}
```

### 判断逻辑

1. **空值检查**: 如果 `icon` 为 `null` 或 `undefined`，返回 `null`
2. **ES Module 处理**: 如果是 ES Module，提取 `default` 导出
3. **字符串处理**:
   - 如果是 URL（以 `http://` 或 `https://` 开头），创建 `<img>` 元素
   - 否则使用 Fusion Design 的 `<Icon>` 组件
4. **React 元素**: 使用 `cloneElement` 克隆元素并合并 props
5. **React 组件**: 使用 `createElement` 创建组件实例
6. **对象**: 作为 props 传递给 `<Icon>` 组件

### URL 正则表达式

```typescript
const URL_RE = /^(https?:)\/\//i;
```

匹配规则:
- `http://` 或 `https://` 开头
- 不区分大小写（`i` 标志）
- 例如：
  - `https://example.com/icon.png` ✓
  - `http://example.com/icon.svg` ✓
  - `HTTPS://EXAMPLE.COM/ICON.PNG` ✓
  - `ftp://example.com/icon.png` ✗
  - `/path/to/icon.png` ✗

## 特性说明

### 自动类型识别

```typescript
// 自动识别不同类型的图标
createIcon('arrow-left');           // 字符串 → Icon 组件
createIcon('https://example.com/icon.png'); // URL → img 元素
createIcon(MyIcon);                 // React 组件 → 组件实例
createIcon(<MyIcon />);            // React 元素 → 克隆元素
createIcon({ type: 'arrow-left' }); // 对象 → Icon 组件
```

### Props 合并

```typescript
// props 会合并到图标组件中
createIcon('arrow-left', { className: 'my-icon', onClick: handleClick });
// 等价于 <Icon type="arrow-left" className="my-icon" onClick={handleClick} />
```

### ES Module 支持

```typescript
// ES Module 会自动提取 default 导出
import * as iconModule from './icon';

// iconModule = { default: MyIcon, __esModule: true }
createIcon(iconModule); // 等价于 createIcon(MyIcon)
```

### 空值处理

```typescript
// null 或 undefined 返回 null
createIcon(null);    // null
createIcon(undefined); // null
createIcon('');      // <Icon type="" />（空字符串不是空值）
```

## 性能考虑

1. **类型检查**: 使用多个条件判断，但都是简单的类型检查，性能良好
2. **正则匹配**: URL 正则匹配性能良好
3. **React 操作**: 使用 `createElement` 和 `cloneElement`，性能良好
4. **缓存**: 没有缓存机制，每次调用都会创建新的 React 元素

## 限制和注意事项

1. **className 属性**:
   - 对于 URL 图标，使用 `class` 属性（HTML 标准）
   - 对于其他图标，使用 `className` 属性（React 标准）
   - 这是因为 `createElement('img', ...)` 创建的是 DOM 元素

2. **URL 限制**:
   - 只支持 `http://` 和 `https://` 协议
   - 不支持相对路径、`data:` URL、`blob:` URL 等
   - 如果需要支持其他协议，需要修改正则表达式

3. **React 组件限制**:
   - 组件必须接受 props
   - 组件的 props 会与传入的 props 合并
   - 如果组件不接受某些 props，可能会产生警告

4. **ES Module 限制**:
   - 只提取 `default` 导出
   - 如果 ES Module 没有 `default` 导出，会使用整个 module
   - 可能导致意外的行为

5. **Fusion Design Icon 依赖**:
   - 依赖 `@alifd/next` 的 `Icon` 组件
   - 如果项目中没有安装 `@alifd/next`，会报错

## 最佳实践

1. **使用字符串图标**:
   ```typescript
   // ✅ 推荐: 使用 Fusion Design Icon
   createIcon('arrow-left');
   
   // ❌ 不推荐: 使用 URL（除非必要）
   createIcon('https://example.com/icon.png');
   ```

2. **传递 Props**:
   ```typescript
   // ✅ 推荐: 使用对象传递多个 props
   createIcon('arrow-left', { 
     className: 'my-icon', 
     style: { color: 'red' },
     onClick: handleClick 
   });
   ```

3. **自定义图标组件**:
   ```typescript
   // ✅ 推荐: 封装自定义图标组件
   function MyIcon({ name, size, color }) {
     return createIcon(name, { 
       className: `icon-${size}`,
       style: { color } 
     });
   }
   ```

4. **条件渲染**:
   ```typescript
   // ✅ 推荐: 使用条件渲染
   {icon && createIcon(icon, { className: 'my-icon' })}
   
   // ❌ 不推荐: 传递 null 或 undefined
   createIcon(null); // 返回 null，但不如条件渲染清晰
   ```

5. **类型安全**:
   ```typescript
   // ✅ 推荐: 使用 TypeScript 类型
   import { IPublicTypeIconType } from '@alilc/lowcode-types';
   
   function MyComponent({ icon }: { icon: IPublicTypeIconType }) {
     return createIcon(icon);
   }
   ```

## 使用场景

1. **按钮图标**:
   ```typescript
   function Button({ icon, children }) {
     return (
       <button>
         {createIcon(icon, { className: 'button-icon' })}
         {children}
       </button>
     );
   }
   ```

2. **菜单图标**:
   ```typescript
   function MenuItem({ icon, label }) {
     return (
       <div className="menu-item">
         {createIcon(icon, { className: 'menu-icon' })}
         <span>{label}</span>
       </div>
     );
   }
   ```

3. **工具栏图标**:
   ```typescript
   function Toolbar({ actions }) {
     return (
       <div className="toolbar">
         {actions.map(action => (
           <button key={action.name}>
             {createIcon(action.icon, { onClick: action.onClick })}
           </button>
         ))}
       </div>
     );
   }
   ```

4. **状态图标**:
   ```typescript
   function StatusIndicator({ status }) {
     const iconMap = {
       success: 'check-circle',
       error: 'close-circle',
       warning: 'warning',
       info: 'information'
     };
     
     return createIcon(iconMap[status], { 
       className: `status-icon status-${status}` 
     });
   }
   ```

5. **动态图标**:
   ```typescript
   function DynamicIcon({ iconName, iconType }) {
     const icon = iconType === 'url' 
       ? `https://cdn.example.com/icons/${iconName}.png`
       : iconName;
       
     return createIcon(icon, { className: 'dynamic-icon' });
   }
   ```

## 相关函数

- [`isReactComponent`](./is-react.ts) - 判断是否为 React 组件
- [`isESModule`](./is-es-module.ts) - 判断是否为 ES Module
- [`isValidElement`](https://react.dev/reference/react/isValidElement) - React 的 isValidElement 函数
- [`createElement`](https://react.dev/reference/react/createElement) - React 的 createElement 函数
- [`cloneElement`](https://react.dev/reference/react/cloneElement) - React 的 cloneElement 函数

## 使用建议

1. **优先使用字符串图标**: Fusion Design Icon 提供了丰富的图标库，优先使用
2. **合理使用 Props**: 只传递必要的 props，避免传递过多属性
3. **封装自定义组件**: 根据业务需求封装自定义图标组件
4. **注意 className**: URL 图标使用 `class`，其他图标使用 `className`
5. **处理空值**: 使用条件渲染而不是传递 `null` 或 `undefined`

## 示例：完整的图标系统

```typescript
import { createIcon } from '@alilc/lowcode-utils';
import { IPublicTypeIconType } from '@alilc/lowcode-types';

// 图标配置类型
interface IconConfig {
  name: string;
  type: 'string' | 'url' | 'component';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  onClick?: () => void;
}

// 图标组件
function Icon({ config }: { config: IconConfig }) {
  const { name, type, size = 'medium', color, onClick } = config;
  
  let icon: IPublicTypeIconType;
  
  switch (type) {
    case 'url':
      icon = `https://cdn.example.com/icons/${name}.png`;
      break;
    case 'component':
      icon = IconComponents[name];
      break;
    case 'string':
    default:
      icon = name;
  }
  
  return createIcon(icon, {
    className: `icon icon-${size}`,
    style: color ? { color } : undefined,
    onClick
  });
}

// 图标组件映射
const IconComponents = {
  customIcon1: CustomIcon1,
  customIcon2: CustomIcon2,
};

// 使用
<Icon config={{ 
  name: 'arrow-left', 
  type: 'string',
  size: 'large',
  color: 'red',
  onClick: handleClick 
}} />
```
