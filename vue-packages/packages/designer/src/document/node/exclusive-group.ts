import { obx, makeObservable } from '@alilc/lowcode-editor-core';
import { IPublicModelExclusiveGroup, INode } from '@alilc/lowcode-types';

export class ExclusiveGroup implements IPublicModelExclusiveGroup {
  @obx.shallow nodes: INode[] = [];

  constructor(readonly name: string) {
    makeObservable(this);
  }

  add(node: INode) {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
    }
  }

  remove(node: INode) {
    const i = this.nodes.indexOf(node);
    if (i > -1) {
      this.nodes.splice(i, 1);
    }
  }

  isVisible(node: INode): boolean | undefined {
    const index = this.nodes.indexOf(node);
    if (index < 0) {
      return undefined;
    }
    return index === 0;
  }

  setVisible(node: INode) {
    const index = this.nodes.indexOf(node);
    if (index < 0) {
      return;
    }
    if (index > 0) {
      const target = this.nodes[index];
      this.nodes.splice(index, 1);
      this.nodes.unshift(target);
    }
  }
}

export function isExclusiveGroup(obj: any): obj is ExclusiveGroup {
  return obj && obj.nodes;
}
