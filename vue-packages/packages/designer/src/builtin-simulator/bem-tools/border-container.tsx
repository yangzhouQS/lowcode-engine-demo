import { computed, defineComponent, onMounted, ref } from 'vue';
import { observer } from '@alilc/lowcode-editor-core';
import { globalLocale } from '@alilc/lowcode-editor-core';
import { IPublicTypeI18nData, IPublicTypeTitleContent } from '@alilc/lowcode-types';
import { isI18nData } from '@alilc/lowcode-utils';
import { DropLocation } from '../../designer';
import { BuiltinSimulatorHost } from '../../builtin-simulator/host';
import { INode } from '../../document/node';
import BorderContainerInstance from './border-container.vue';

function getTitle(title: string | IPublicTypeI18nData): string {
  if (typeof title === 'string') return title;
  if (isI18nData(title)) {
    const locale = globalLocale.getLocale() || 'zh-CN';
    return `将放入到此${title[locale]}`;
  }
  return '';
}

@observer
export class BorderContainer {
  private host: BuiltinSimulatorHost;
  private target = ref<INode | undefined>(undefined);

  constructor(host: BuiltinSimulatorHost) {
    this.host = host;
    onMounted(() => {
      this.host.designer.editor.eventBus.on('designer.dropLocation.change', (loc: DropLocation) => {
        if (this.target.value === loc?.target) return;
        this.target.value = loc?.target;
      });
    });
  }

  get scale() {
    return this.host.viewport.scale;
  }

  get scrollX() {
    return this.host.viewport.scrollX;
  }

  get scrollY() {
    return this.host.viewport.scrollY;
  }

  render() {
    const target = this.target.value;
    if (target == undefined) {
      return null;
    }
    const instances = this.host.getComponentInstances(target!);
    if (!instances || instances.length < 1) {
      return null;
    }

    if (instances.length === 1) {
      return (
        <BorderContainerInstance
          key="line-h"
          title={getTitle(target.componentMeta.title)}
          scale={this.scale}
          scrollX={this.scrollX}
          scrollY={this.scrollY}
          rect={this.host.computeComponentInstanceRect(instances[0], target.componentMeta.rootSelector)}
        />
      );
    }
    return (
      <>
        {instances.map((inst, i) => (
          <BorderContainerInstance
            key={`line-h-${i}`}
            title={getTitle(target.componentMeta.title)}
            scale={this.scale}
            scrollX={this.scrollX}
            scrollY={this.scrollY}
            rect={this.host.computeComponentInstanceRect(inst, target.componentMeta.rootSelector)}
          />
        ))}
      </>
    );
  }
}
