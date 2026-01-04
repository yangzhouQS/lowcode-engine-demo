import { observer, engineConfig } from '@alilc/lowcode-editor-core';
import { BuiltinSimulatorHost } from '../host';
import { BorderDetecting } from './border-detecting';
import { BorderContainer } from './border-container';
import { BorderSelecting } from './border-selecting';
import { BoxResizing } from './border-resizing';
import { InsertionView } from './insertion';
import './bem-tools.less';
import './borders.less';

@observer
export class BemTools {
  private host: BuiltinSimulatorHost;

  constructor(host: BuiltinSimulatorHost) {
    this.host = host;
  }

  render() {
    const { host } = this;
    const { designMode } = host;
    const { scrollX, scrollY, scale } = host.viewport;
    if (designMode === 'live') {
      return null;
    }

    const borderDetecting = new BorderDetecting(host);
    const borderSelecting = new BorderSelecting(host);
    const borderContainer = new BorderContainer(host);
    const borderResizing = new BoxResizing(host);
    const insertionView = new InsertionView(host);

    return (
      <div className="lc-bem-tools" style={{ transform: `translate(${-scrollX * scale}px,${-scrollY * scale}px)` }}>
        { !engineConfig.get('disableDetecting') && borderDetecting.render() }
        { borderSelecting.render() }
        { engineConfig.get('enableReactiveContainer') && borderContainer.render() }
        { insertionView.render() }
        { borderResizing.render() }
        {
          host.designer.bemToolsManager.getAllBemTools().map(tools => {
            const ToolsCls = tools.item;
            return <ToolsCls key={tools.name} host={host} />;
          })
        }
      </div>
    );
  }
}
