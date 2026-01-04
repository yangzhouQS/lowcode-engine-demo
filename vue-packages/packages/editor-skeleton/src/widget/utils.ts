import { IPublicTypeIconType, IPublicTypeTitleContent, TipContent } from '@vue-lowcode/types';
import { isI18nData, isTitleConfig } from '@vue-lowcode/utils';
import { isVNode } from 'vue';

export function composeTitle(title?: IPublicTypeTitleContent, icon?: IPublicTypeIconType, tip?: TipContent, tipAsTitle?: boolean, noIcon?: boolean) {
  let _title: IPublicTypeTitleContent | undefined;
  if (!title) {
    _title = {};
    if (!icon || tipAsTitle) {
      _title = {
        label: tip,
      };
      tip = undefined;
    }
  } else {
    _title = title;
  }

  if (icon || tip) {
    if (typeof _title !== 'object' || isVNode(_title) || isI18nData(_title)) {
      if (isVNode(_title)) {
        const vnode = _title as any;
        if (vnode.type === 'svg' || vnode.type.getIcon) {
          if (!icon) {
            icon = _title;
          }
          if (tipAsTitle) {
            _title = tip;
            tip = null;
          } else {
            _title = undefined;
          }
        }
      }
      _title = {
        label: _title,
        icon,
        tip,
      };
    } else {
      _title = {
        ..._title,
        icon,
        tip,
      };
    }
  }
  if (isTitleConfig(_title) && noIcon) {
    if (!isVNode(_title)) {
      (_title as any).icon = undefined;
    }
  }
  return _title;
}
