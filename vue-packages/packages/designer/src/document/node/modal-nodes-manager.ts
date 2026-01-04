import { obx, makeObservable, computed } from '@alilc/lowcode-editor-core';
import { IPublicModelModalNodesManager, INode } from '@alilc/lowcode-types';
import { IDocumentModel } from '../document-model';
import { Node } from './node';

export class ModalNodesManager implements IPublicModelModalNodesManager {
  @obx.shallow private _modalNodes: Node[] = [];

  constructor(readonly document: IDocumentModel) {
    makeObservable(this);
  }

  @computed get nodes(): INode[] {
    return this._modalNodes;
  }

  @computed get isEmpty(): boolean {
    return this._modalNodes.length === 0;
  }

  add(node: Node) {
    if (this._modalNodes.indexOf(node) > -1) {
      return;
    }
    this._modalNodes.push(node);
  }

  remove(node: Node) {
    const i = this._modalNodes.indexOf(node);
    if (i > -1) {
      this._modalNodes.splice(i, 1);
    }
  }

  setVisible(node: Node, visible: boolean) {
    if (!visible) {
      this.remove(node);
    } else {
      this.add(node);
    }
  }

  getModalNode(id: string): Node | null {
    return this._modalNodes.find(node => node.id === id) || null;
  }

  getModalNodes(): Node[] {
    return this._modalNodes;
  }

  hasNode(node: Node): boolean {
    return this._modalNodes.indexOf(node) > -1;
  }
}
