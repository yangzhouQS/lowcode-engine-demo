import { computed, observer } from '@alilc/lowcode-editor-core';
import { Title } from '@alilc/lowcode-editor-core';
import { IPublicTypeTitleContent } from '@alilc/lowcode-types';
import { getClosestNode } from '@alilc/lowcode-utils';
import { intl } from '../../locale';
import { BuiltinSimulatorHost } from '../host';
import BorderDetectingInstance from './border-detecting.vue';

@observer
export class BorderDetecting {
  private host: BuiltinSimulatorHost;

  constructor(host: BuiltinSimulatorHost) {
    this.host = host;
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

  get current() {
    const doc = this.host.currentDocument;
    if (!doc) {
      return null;
    }
    const { selection } = doc;
    const { current } = this.host.designer.detecting;

    if (!current || current.document !== doc || selection.has(current.id)) {
      return null;
    }
    return current;
  }

  render() {
    const current = this.current;

    const canHoverHook = current?.componentMeta.advanced.callbacks?.onHoverHook;
    const canHover = (canHoverHook && typeof canHoverHook === 'function') ? canHoverHook(current.internalToShellNode()) : true;

    if (!canHover || !current || this.host.viewport.scrolling || this.host.liveEditing.editing) {
      return null;
    }

    // rootNode, hover whole viewport
    const focusNode = current.document.focusNode!;

    if (!focusNode.contains(current)) {
      return null;
    }

    if (current.contains(focusNode)) {
      const bounds = this.host.viewport.bounds;
      return (
        <BorderDetectingInstance
          key="line-root"
          title={current.title}
          scale={this.scale}
          scrollX={this.host.viewport.scrollX}
          scrollY={this.host.viewport.scrollY}
          rect={new DOMRect(0, 0, bounds.width, bounds.height)}
        />
      );
    }

    const lockedNode = getClosestNode(current, (n) => {
      // 假如当前节点就是 locked 状态，要从当前节点的父节点开始查找
      return !!(current?.isLocked ? n.parent?.isLocked : n.isLocked);
    });
    if (lockedNode && lockedNode.getId() !== current.getId()) {
      // 选中父节锁定的节点
      return (
        <BorderDetectingInstance
          key="line-h"
          title={current.title}
          scale={this.scale}
          scrollX={this.scrollX}
          scrollY={this.scrollY}
          // @ts-ignore
          rect={this.host.computeComponentInstanceRect(this.host.getComponentInstances(lockedNode)[0], lockedNode.componentMeta.rootSelector)}
          isLocked={lockedNode?.getId() !== current.getId()}
        />
      );
    }

    const instances = this.host.getComponentInstances(current);
    if (!instances || instances.length < 1) {
      return null;
    }

    if (instances.length === 1) {
      return (
        <BorderDetectingInstance
          key="line-h"
          title={current.title}
          scale={this.scale}
          scrollX={this.scrollX}
          scrollY={this.scrollY}
          rect={this.host.computeComponentInstanceRect(instances[0], current.componentMeta.rootSelector)}
        />
      );
    }
    return (
      <>
        {instances.map((inst, i) => (
          <BorderDetectingInstance
            key={`line-h-${i}`}
            title={current.title}
            scale={this.scale}
            scrollX={this.scrollX}
            scrollY={this.scrollY}
            rect={this.host.computeComponentInstanceRect(inst, current.componentMeta.rootSelector)}
          />
        ))}
      </>
    );
  }
}
