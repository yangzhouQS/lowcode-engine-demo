# Command 模块文档

## 文件路径

`packages/editor-core/src/command.ts`

## 功能概述

`Command` 类是编辑器的命令系统，负责管理命令的注册、执行、批量执行等功能。它支持命令作用域、参数验证、错误处理等特性。

## 主要功能

### 1. 命令注册

- 注册新命令
- 注销命令
- 命令作用域支持

### 2. 命令执行

- 执行单个命令
- 批量执行多个命令
- 参数类型验证
- 错误处理和回调

### 3. 命令列表

- 获取所有已注册的命令
- 返回命令描述列表

### 4. 错误处理

- 命令执行错误回调
- 错误处理器管理

## 类定义

```typescript
export interface ICommand extends Omit<IPublicApiCommand, 'registerCommand' | 'batchExecuteCommand'> {
  registerCommand(command: IPublicTypeCommand, options?: {
    commandScope?: string;
  }): void;
  
  batchExecuteCommand(commands: { name: string; args: IPublicTypeCommandHandlerArgs }[], pluginContext?: IPublicModelPluginContext): void;
}

export class Command implements ICommand {
  private commands: Map<string, IPublicTypeCommand> = new Map();
  private commandErrors: Function[] = [];
}
```

## 属性

### `private commands: Map<string, IPublicTypeCommand>`

命令映射表，存储所有已注册的命令。

### `private commandErrors: Function[]`

命令错误处理器数组。

## 方法

### `registerCommand(command: IPublicTypeCommand, options?: ICommandOptions): void`

注册一个命令。

**参数:**
- `command`: 命令配置
- `options`: 命令选项
  - `commandScope`: 命令作用域（必需）

**行为:**
- 验证 `commandScope` 是否存在
- 检查命令是否已注册
- 生成完整的命令名称（`commandScope:commandName`）
- 存储命令到映射表

**错误处理:**
- 如果 `commandScope` 未提供，抛出错误
- 如果命令已注册，抛出错误

### `unregisterCommand(name: string): void`

注销一个命令。

**参数:**
- `name`: 命令名称（完整名称，包含作用域）

**行为:**
- 验证命令是否已注册
- 从映射表中删除命令

**错误处理:**
- 如果命令未注册，抛出错误

### `executeCommand(name: string, args: IPublicTypeCommandHandlerArgs): void`

执行一个命令。

**参数:**
- `name`: 命令名称（完整名称）
- `args`: 命令参数

**行为:**
- 从映射表中获取命令
- 验证命令是否存在
- 验证参数类型
- 执行命令处理器

**参数验证:**
- 使用 `checkPropTypes` 验证参数类型
- 根据 `parameters` 定义检查每个参数

**错误处理:**
- 如果命令不存在，抛出错误
- 如果参数验证失败，抛出错误
- 执行过程中捕获错误
- 如果有错误处理器，调用错误处理器

### `batchExecuteCommand(commands: { name: string; args: IPublicTypeCommandHandlerArgs }[], pluginContext?: IPublicModelPluginContext): void`

批量执行多个命令。

**参数:**
- `commands`: 命令数组，每个包含 `name` 和 `args`
- `pluginContext`: 插件上下文（可选）

**行为:**
- 在事务中执行所有命令
- 使用事务类型 `IPublicEnumTransitionType.REPAINT`

### `listCommands(): IPublicTypeListCommand[]`

获取所有已注册的命令列表。

**返回值:** 命令描述数组，每个包含：
- `name`: 命令名称
- `description`: 命令描述（如果有）
- `parameters`: 命令参数（如果有）

### `onCommandError(callback: (name: string, error: Error) => void): void`

注册命令错误处理器。

**参数:**
- `callback`: 错误回调函数

**行为:**
- 将回调添加到错误处理器数组

## 接口定义

### ICommandOptions

```typescript
export interface ICommandOptions {
  commandScope?: string;
}
```

### IPublicTypeCommand

来自 `@alilc/lowcode-types`，定义命令配置结构。

### IPublicTypeCommandHandlerArgs

来自 `@alilc/lowcode-types`，定义命令参数结构。

### IPublicTypeListCommand

来自 `@alilc/lowcode-types`，定义命令列表项结构。

## 使用示例

### 注册命令

```typescript
import { Command } from '@alilc/lowcode-editor-core';

const command = new Command();

// 注册命令
command.registerCommand({
  name: 'myCommand',
  description: '我的命令',
  handler: (args) => {
    console.log('Command executed:', args);
    console.log('param1:', args.param1);
    console.log('param2:', args.param2);
  },
  parameters: [
    {
      name: 'param1',
      propType: 'string',
      description: '第一个参数',
    },
    {
      name: 'param2',
      propType: 'number',
      description: '第二个参数',
    },
  ],
}, { commandScope: 'myScope' });

// 执行命令
command.executeCommand('myCommand:myScope', {
  param1: 'value1',
  param2: 100,
});
```

### 批量执行命令

```typescript
// 批量执行命令
command.batchExecuteCommand([
  { name: 'myCommand:myScope', args: { param1: 'value1' } },
  { name: 'myCommand:myScope', args: { param1: 'value2' } },
  { name: 'myCommand:myScope', args: { param1: 'value3' } },
]);
```

### 获取命令列表

```typescript
// 获取所有命令
const commands = command.listCommands();
console.log('Available commands:', commands);

// 输出示例：
// [
//   {
//     name: 'myCommand:myScope',
//     description: '我的命令',
//     parameters: [
//       { name: 'param1', propType: 'string', description: '第一个参数' },
//       { name: 'param2', propType: 'number', description: '第二个参数' }
//     ]
//   }
// ]
```

### 错误处理

```typescript
// 注册错误处理器
command.onCommandError((name, error) => {
  console.error(`Command ${name} failed:`, error);
});

// 执行命令时，如果发生错误会调用错误处理器
command.executeCommand('myCommand:myScope', { invalidParam: 'value' });
```

### 注销命令

```typescript
// 注销命令
command.unregisterCommand('myCommand:myScope');
```

## 命令作用域

命令作用域用于区分不同插件或模块的命令，避免命名冲突。

### 作用域格式

```
commandScope:commandName
```

### 作用域示例

```typescript
// 注册命令时指定作用域
command.registerCommand({
  name: 'save',
  handler: () => { /* 保存逻辑 */ },
}, { commandScope: 'file' });

command.registerCommand({
  name: 'save',
  handler: () => { /* 保存逻辑 */ },
}, { commandScope: 'edit' });

// 执行命令时需要指定完整名称
command.executeCommand('save:file', { /* 参数 */ });
command.executeCommand('save:edit', { /* 参数 */ });
```

## 参数验证

Command 类使用 `checkPropTypes` 进行参数类型验证：

### 支持的类型

- `string`
- `number`
- `boolean`
- `object`
- `array`
- `any`

### 验证失败

如果参数类型不匹配，会抛出错误：

```typescript
Command 'myCommand' arguments param1 is invalid.
```

## 注意事项

1. **命令作用域**: `commandScope` 是必需的，用于避免命令命名冲突
2. **命令唯一性**: 同一作用域内的命令名称必须唯一
3. **参数验证**: 命令参数会进行类型验证，确保类型正确
4. **错误处理**: 可以通过 `onCommandError` 注册错误处理器
5. **批量执行**: `batchExecuteCommand` 在事务中执行，支持回滚
6. **命令描述**: 建议为命令提供描述，方便用户理解

## 相关文件

- [`editor.ts`](./editor.md) - Editor 核心类，使用 Command
- [`../utils/index.ts`](../utils/index.md) - 工具函数

## 外部依赖

- `@alilc/lowcode-types` - 提供命令相关类型定义
- `@alilc/lowcode-utils` - 提供 `checkPropTypes` 工具函数
