import { IDialogDockConfig } from '@vue-lowcode/types';
import { PanelDock } from './panel-dock';

export class DialogDock extends PanelDock {
  readonly isDialogDock = true;

  constructor(readonly config: IDialogDockConfig, parent: any) {
    super(config, parent);
  }
}
