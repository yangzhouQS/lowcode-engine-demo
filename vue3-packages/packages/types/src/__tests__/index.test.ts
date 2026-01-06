/**
 * @vue3-lowcode/types Package Tests
 * 
 * 测试类型定义的正确性和完整性
 */

import { describe, it, expect } from 'vitest';

// 测试类型导出
describe('@vue3-lowcode/types Package', () => {
  describe('Shell API Types', () => {
    it('should export IShell', () => {
      expect(() => {
        import('../shell/IShell');
      }).not.toThrow();
    });

    it('should export IShellModel', () => {
      expect(() => {
        import('../shell/IShellModel');
      }).not.toThrow();
    });

    it('should export IShellConfig', () => {
      expect(() => {
        import('../shell/IShellConfig');
      }).not.toThrow();
    });
  });

  describe('Model Types', () => {
    it('should export IEditor', () => {
      expect(() => {
        import('../model/IEditor');
      }).not.toThrow();
    });

    it('should export IDesigner', () => {
      expect(() => {
        import('../model/IDesigner');
      }).not.toThrow();
    });

    it('should export IDocumentModel', () => {
      expect(() => {
        import('../model/IDocumentModel');
      }).not.toThrow();
    });

    it('should export IDocument', () => {
      expect(() => {
        import('../model/IDocument');
      }).not.toThrow();
    });
  });

  describe('Node Types', () => {
    it('should export INode', () => {
      expect(() => {
        import('../node/INode');
      }).not.toThrow();
    });

    it('should export IProps', () => {
      expect(() => {
        import('../node/IProps');
      }).not.toThrow();
    });

    it('should export IProp', () => {
      expect(() => {
        import('../node/IProp');
      }).not.toThrow();
    });

    it('should export ISlot', () => {
      expect(() => {
        import('../node/ISlot');
      }).not.toThrow();
    });
  });

  describe('Renderer Types', () => {
    it('should export IRuntime', () => {
      expect(() => {
        import('../renderer/IRuntime');
      }).not.toThrow();
    });

    it('should export IRenderer', () => {
      expect(() => {
        import('../renderer/IRenderer');
      }).not.toThrow();
    });

    it('should export IRendererProps', () => {
      expect(() => {
        import('../renderer/IRendererProps');
      }).not.toThrow();
    });

    it('should export IBaseRendererInstance', () => {
      expect(() => {
        import('../renderer/IBaseRendererInstance');
      }).not.toThrow();
    });
  });

  describe('Plugin Types', () => {
    it('should export IPlugin', () => {
      expect(() => {
        import('../plugin/IPlugin');
      }).not.toThrow();
    });

    it('should export IPluginContext', () => {
      expect(() => {
        import('../plugin/IPluginContext');
      }).not.toThrow();
    });

    it('should export IPluginManager', () => {
      expect(() => {
        import('../plugin/IPluginManager');
      }).not.toThrow();
    });

    it('should export IPluginConfig', () => {
      expect(() => {
        import('../plugin/IPluginConfig');
      }).not.toThrow();
    });
  });

  describe('Material Types', () => {
    it('should export IComponentMeta', () => {
      expect(() => {
        import('../material/IComponentMeta');
      }).not.toThrow();
    });

    it('should export IPropMeta', () => {
      expect(() => {
        import('../material/IPropMeta');
      }).not.toThrow();
    });

    it('should export IEventMeta', () => {
      expect(() => {
        import('../material/IEventMeta');
      }).not.toThrow();
    });

    it('should export ISlotMeta', () => {
      expect(() => {
        import('../material/ISlotMeta');
      }).not.toThrow();
    });

    it('should export ISchema', () => {
      expect(() => {
        import('../material/ISchema');
      }).not.toThrow();
    });
  });

  describe('Vue3 Specific Types', () => {
    it('should export IVueComponent', () => {
      expect(() => {
        import('../vue/IVueComponent');
      }).not.toThrow();
    });

    it('should export IVueProps', () => {
      expect(() => {
        import('../vue/IVueProps');
      }).not.toThrow();
    });

    it('should export IVueContext', () => {
      expect(() => {
        import('../vue/IVueContext');
      }).not.toThrow();
    });

    it('should export IVueEvent', () => {
      expect(() => {
        import('../vue/IVueEvent');
      }).not.toThrow();
    });
  });

  describe('Main Index Exports', () => {
    it('should export all types from index', async () => {
      const typesModule = await import('../index');
      
      // 验证 Shell API 类型
      expect(typeof typesModule.IShell).toBe('object');
      expect(typeof typesModule.IShellModel).toBe('object');
      expect(typeof typesModule.IShellConfig).toBe('object');
      
      // 验证 Model 类型
      expect(typeof typesModule.IEditor).toBe('object');
      expect(typeof typesModule.IDesigner).toBe('object');
      expect(typeof typesModule.IDocumentModel).toBe('object');
      expect(typeof typesModule.IDocument).toBe('object');
      
      // 验证 Node 类型
      expect(typeof typesModule.INode).toBe('object');
      expect(typeof typesModule.IProps).toBe('object');
      expect(typeof typesModule.IProp).toBe('object');
      expect(typeof typesModule.ISlot).toBe('object');
      
      // 验证 Renderer 类型
      expect(typeof typesModule.IRuntime).toBe('object');
      expect(typeof typesModule.IRenderer).toBe('object');
      expect(typeof typesModule.IRendererProps).toBe('object');
      expect(typeof typesModule.IBaseRendererInstance).toBe('object');
      
      // 验证 Plugin 类型
      expect(typeof typesModule.IPlugin).toBe('object');
      expect(typeof typesModule.IPluginContext).toBe('object');
      expect(typeof typesModule.IPluginManager).toBe('object');
      expect(typeof typesModule.IPluginConfig).toBe('object');
      
      // 验证 Material 类型
      expect(typeof typesModule.IComponentMeta).toBe('object');
      expect(typeof typesModule.IPropMeta).toBe('object');
      expect(typeof typesModule.IEventMeta).toBe('object');
      expect(typeof typesModule.ISlotMeta).toBe('object');
      expect(typeof typesModule.ISchema).toBe('object');
      
      // 验证 Vue3 特定类型
      expect(typeof typesModule.IVueComponent).toBe('object');
      expect(typeof typesModule.IVueProps).toBe('object');
      expect(typeof typesModule.IVueContext).toBe('object');
      expect(typeof typesModule.IVueEvent).toBe('object');
    });
  });
});
