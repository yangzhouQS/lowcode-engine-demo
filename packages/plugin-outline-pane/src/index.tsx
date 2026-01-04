import { Pane } from './views/pane';
import { IconOutline } from './icons/outline';
import { IPublicModelPluginContext, IPublicModelDocumentModel } from '@alilc/lowcode-types';
import { MasterPaneName, BackupPaneName } from './helper/consts';
import { TreeMaster } from './controllers/tree-master';
import { PaneController } from './controllers/pane-controller';
import { useState, useEffect } from 'react';

export function OutlinePaneContext(props: {
  treeMaster?: TreeMaster;

  pluginContext: IPublicModelPluginContext;

  options: any;

  paneName: string;

  hideFilter?: boolean;
}) {
  const treeMaster = props.treeMaster || new TreeMaster(props.pluginContext, props.options);
  const [masterPaneController, setMasterPaneController] = useState(
    () => new PaneController(props.paneName || MasterPaneName, treeMaster),
  );
  useEffect(() => {
    return treeMaster.onPluginContextChange(() => {
      setMasterPaneController(new PaneController(props.paneName || MasterPaneName, treeMaster));
    });
  }, []);

  return (
    <Pane
      treeMaster={treeMaster}
      controller={masterPaneController}
      key={masterPaneController.id}
      hideFilter={props.hideFilter}
      {...props}
    />
  );
}

export const OutlinePlugin = (ctx: IPublicModelPluginContext, options: any) => {
  const { skeleton, config, canvas, project } = ctx;

  let isInFloatArea = true;
  const hasPreferenceForOutline = config
    .getPreference()
    .contains('outline-pane-pinned-status-isFloat', 'skeleton');
  if (hasPreferenceForOutline) {
    isInFloatArea = config.getPreference().get('outline-pane-pinned-status-isFloat', 'skeleton');
  }
  const showingPanes = {
    masterPane: false,
    backupPane: false,
  };
  const treeMaster = new TreeMaster(ctx, options);
  return {
    async init() {
      skeleton.add({
        area: 'leftArea',
        name: 'outlinePane',
        type: 'PanelDock',
        index: -1,
        content: {
          name: MasterPaneName,
          props: {
            icon: IconOutline,
            description: treeMaster.pluginContext.intlNode('Outline Tree'),
          },
          content: OutlinePaneContext,
        },
        panelProps: {
          area: isInFloatArea ? 'leftFloatArea' : 'leftFixedArea',
          keepVisibleWhileDragging: true,
          ...config.get('defaultOutlinePaneProps'),
        },
        contentProps: {
          treeTitleExtra: config.get('treeTitleExtra'),
          treeMaster,
          paneName: MasterPaneName,
        },
      });

      skeleton.add({
        area: 'rightArea',
        name: BackupPaneName,
        type: 'Panel',
        props: {
          hiddenWhenInit: true,
        },
        content: OutlinePaneContext,
        contentProps: {
          paneName: BackupPaneName,
          treeMaster,
        },
        index: 1,
      });

      // 处理 master pane 和 backup pane 切换
      const switchPanes = () => {
        const isDragging = canvas.dragon?.dragging;
        const hasVisibleTreeBoard = showingPanes.backupPane || showingPanes.masterPane;
        const shouldShowBackupPane = isDragging && !hasVisibleTreeBoard;

        if (shouldShowBackupPane) {
          skeleton.showPanel(BackupPaneName);
        } else {
          skeleton.hidePanel(BackupPaneName);
        }
      };
      canvas.dragon?.onDragstart(() => {
        switchPanes();
      });
      canvas.dragon?.onDragend(() => {
        switchPanes();
      });
      skeleton.onShowPanel((key: string) => {
        if (key === MasterPaneName) {
          showingPanes.masterPane = true;
        }
        if (key === BackupPaneName) {
          showingPanes.backupPane = true;
        }
      });
      skeleton.onHidePanel((key: string) => {
        if (key === MasterPaneName) {
          showingPanes.masterPane = false;
          switchPanes();
        }
        if (key === BackupPaneName) {
          showingPanes.backupPane = false;
        }
      });
      project.onChangeDocument((document: IPublicModelDocumentModel) => {
        if (!document) {
          return;
        }

        const { selection } = document;

        selection?.onSelectionChange(() => {
          const selectedNodes = selection?.getNodes();
          if (!selectedNodes || selectedNodes.length === 0) {
            return;
          }
          const tree = treeMaster.currentTree;
          selectedNodes.forEach((node) => {
            const treeNode = tree?.getTreeNodeById(node.id);
            tree?.expandAllAncestors(treeNode);
          });
        });
      });
    },
  };
};
OutlinePlugin.meta = {
  eventPrefix: 'OutlinePlugin',
  preferenceDeclaration: {
    title: '大纲树插件配置',
    properties: [
      {
        key: 'extraTitle',
        type: 'object',
        description: '副标题',
      },
    ],
  },
};
OutlinePlugin.pluginName = 'OutlinePlugin';



/*

function downloadFileByUrl(url, fileName) {
	// 创建a标签
	const link = document.createElement('a');
	// 设置文件URL（支持同源URL或跨域且允许下载的URL）
	link.href = url;
	// 设置下载文件名（可选，若不设置则使用服务器返回的文件名）
	if (fileName) {
		link.download = fileName; // 例如：'报表数据.xlsx'
	}
	// 部分浏览器要求元素必须在DOM中才能触发点击
	document.body.appendChild(link);
	// 模拟点击
	link.click();
	// 移除标签，清理DOM
	document.body.removeChild(link);
}

// 使用示例：下载服务器上的文件
downloadFileByUrl('http://192.168.5.25:30254/api/v1/download-shared-object/aHR0cDovL2xvY2FsaG9zdDo5MDAwL2N0Y2Utb25saW5lL3Rlc3QvJUU0JUJBJUE0JUU2JThEJUEyJUU2JTlDJUJBLnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPVNPN1lXVDAwSzhDQTAxSkNVR1NQJTJGMjAyNTExMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTEzVDA5MjMwOVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSlRUemRaVjFRd01FczRRMEV3TVVwRFZVZFRVQ0lzSW1WNGNDSTZNVGMyTXpBMk9EWTBOU3dpY0dGeVpXNTBJam9pZVdWaGNuSnZkeUo5LkNQY0VVX1ZJek1aekxVaFRvZFVjQkVrdG9iZmpqX29KeFJZTkFQSk9CdVgwUW1BcFUxd2VTLUJBWUZSbG1MQXVxMUd4bnhyUjc0X0hYb0RYbHpzNzRRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NDE1MTY2MTBhMTlkYjI3ZTg1YWMyNTlhNzY0N2VkMGE3ZTVjZjI5MWEzNDMzZTAxOTg3OWM2NDM2MWE1MTFkNw', '2023年度报表.pdf');
*/
