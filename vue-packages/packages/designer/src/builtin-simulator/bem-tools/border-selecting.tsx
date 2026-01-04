import { computed, observer } from '@alilc/lowcode-editor-core';
import { INode, OffsetObserver } from '../../designer';
import NodeSelector from '../node-selector';
import { ISimulatorHost } from '../../simulator';
import BorderSelectingInstance from './border-selecting.vue';

@observer
export class BorderSelectingForNode {
  private host: ISimulatorHost;
  private node: INode;

  constructor(host: ISimulatorHost, node: INode) {
    this.host = host;
    this.node = node;
  }

  get dragging(): boolean {
    return this.host.designer.dragon.dragging;
  }

  get instances() {
    return this.host.getComponentInstances(this.node);
  }

  render() {
    const { instances } = this;
    const { designer } = this.host;

    if (!instances || instances.length < 1) {
      return null;
    }
    return (
      <>
        {instances.map((instance) => {
          const observed = designer.createOffsetObserver({
            node: this.node,
            instance,
          });
          if (!observed) {
            return null;
          }
          return <BorderSelectingInstance key={observed.id} dragging={this.dragging} observed={observed} />;
        })}
      </>
    );
  }
}

@observer
export class BorderSelecting {
  private host: ISimulatorHost;

  constructor(host: ISimulatorHost) {
    this.host = host;
  }

  get dragging(): boolean {
    return this.host.designer.dragon.dragging;
  }

  get selecting() {
    const doc = this.host.currentDocument;
    if (!doc || doc.suspensed || this.host.liveEditing.editing) {
      return null;
    }
    const { selection } = doc;
    return this.dragging ? selection.getTopNodes() : selection.getNodes();
  }

  render() {
    const { selecting } = this;
    if (!selecting || selecting.length < 1) {
      return null;
    }

    return (
      <>
        {selecting.map((node) => (
          <BorderSelectingForNode key={node.id} host={this.host} node={node} />
        ))}
      </>
    );
  }
}
