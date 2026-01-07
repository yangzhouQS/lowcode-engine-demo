import { ref, type Ref } from 'vue';
import {
  IPublicTypeDragNodeObject,
  IPublicTypeDragAnyObject,
  IPublicEnumDragObjectType,
  IPublicTypeDragNodeDataObject,
  IPublicModelDragObject,
  IPublicModelNode,
  IPublicModelDragon,
  IPublicModelLocateEvent,
  IPublicModelSensor,
  IPublicTypeDisposable,
} from '@vue3-lowcode/types';
import { setNativeSelection, cursor } from '@vue3-lowcode/utils';
import { INode } from '@vue3-lowcode/types';
import type { IPublicModelNode } from '@vue3-lowcode/types';
import type { ISimulatorHost } from '@vue3-lowcode/types';
import { makeEventsHandler } from './utils';

/**
 * 定位事件接口
 */
export interface ILocateEvent extends IPublicModelLocateEvent {
  readonly type: 'LocateEvent';

  /**
   * 激活的感应器
   */
  sensor?: IPublicModelSensor;
}

/**
 * 判断是否为节点拖拽对象
 */
export function isDragNodeObject(obj: any): obj is IPublicTypeDragNodeObject {
  return obj && obj.type === IPublicEnumDragObjectType.Node;
}

/**
 * 判断是否为节点数据拖拽对象
 */
export function isDragNodeDataObject(obj: any): obj is IPublicTypeDragNodeDataObject {
  return obj && obj.type === IPublicEnumDragObjectType.NodeData;
}

/**
 * 判断是否为任意拖拽对象
 */
export function isDragAnyObject(obj: any): obj is IPublicTypeDragAnyObject {
  return obj && obj.type !== IPublicEnumDragObjectType.NodeData && obj.type !== IPublicEnumDragObjectType.Node;
}

/**
 * 判断是否为定位事件
 */
export function isLocateEvent(e: any): e is ILocateEvent {
  return e && e.type === 'LocateEvent';
}

const SHAKE_DISTANCE = 4;

/**
 * 鼠标抖动检测
 * 用于区分点击和拖拽操作
 */
export function isShaken(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean {
  if ((e1 as any).shaken) {
    return true;
  }
  if (e1.target !== e2.target) {
    return true;
  }
  return (
    Math.pow(e1.clientY - e2.clientY, 2) + Math.pow(e1.clientX - e2.clientX, 2) > SHAKE_DISTANCE
  );
}

/**
 * 判断是否为无效坐标
 */
export function isInvalidPoint(e: any, last: any): boolean {
  return (
    e.clientX === 0 &&
    e.clientY === 0 &&
    last &&
    (Math.abs(last.clientX - e.clientX) > 5 || Math.abs(last.clientY - e.clientY) > 5)
  );
}

/**
 * 判断两个事件坐标是否相同
 */
export function isSameAs(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean {
  return e1.clientY === e2.clientY && e1.clientX === e2.clientX;
}

/**
 * 设置抖动标记
 */
export function setShaken(e: any) {
  e.shaken = true;
}

/**
 * 获取源感应器
 */
function getSourceSensor(dragObject: IPublicModelDragObject): ISimulatorHost | null {
  if (!isDragNodeObject(dragObject)) {
    return null;
  }
  return (dragObject.nodes[0] as any)?.document?.simulator || null;
}

/**
 * 判断是否为拖拽事件
 */
function isDragEvent(e: any): e is DragEvent {
  return e?.type?.startsWith('drag');
}

/**
 * Dragon 公共接口扩展
 */
export interface IDragon extends IPublicModelDragon<
  INode,
  ILocateEvent
> {
  emitter: any;
}

/**
 * Dragon 拖拽引擎 - Vue3 版本
 *
 * 核心职责：
 * 1. 管理拖拽生命周期（开始、进行中、结束、取消）
 * 2. 分发拖拽相关事件（dragstart、drag、dragend）
 * 3. 管理投放感应器（Sensor）
 * 4. 控制拖拽状态（拖拽态、复制态）
 * 5. 处理跨 iframe 通信
 * 6. 坐标系统转换
 *
 * @example
 * ```ts
 * const dragon = new Dragon(designer);
 *
 * // 监听拖拽事件
 * dragon.onDragstart((e) => {
 *   console.log('拖拽开始', e.dragObject);
 * });
 *
 * // 启动拖拽
 * dragon.boost(dragObject, mouseEvent);
 *
 * // 绑定 DOM 元素
 * dragon.from(element, (e) => {
 *   return { type: 'nodeData', data: [...] };
 * });
 * ```
 */
export class Dragon implements IDragon {
  /**
   * 注册的感应器列表
   */
  private sensors: IPublicModelSensor[] = [];

  /**
   * 是否禁用了节点实例的 pointer-events（用于 RGL）
   */
  private nodeInstPointerEvents = false;

  /**
   * 唯一标识
   */
  key = Math.random();

  /**
   * 当前激活的感应器
   */
  private activeSensor: Ref<IPublicModelSensor | undefined> = ref(undefined);

  /**
   * 是否正在拖拽（已触发 shaken 检测）
   */
  private dragging: Ref<boolean> = ref(false);

  /**
   * 是否可投放（RGL 专用）
   */
  private canDrop: Ref<boolean> = ref(false);

  /**
   * 拖拽对象
   */
  private dragObject: Ref<IPublicModelDragObject | null> = ref(null);

  /**
   * 事件总线（使用 Vue3 utils 的 EventBus）
   */
  emitter: any;

  /**
   * 视图名称
   */
  viewName: string | undefined;

  constructor(readonly designer: any) {
    // 使用 @vue3-lowcode/utils 的事件总线
    this.emitter = useEventBus('Dragon');
    this.viewName = designer.viewName;
  }

  /**
   * 获取当前激活的感应器
   */
  get _activeSensor(): IPublicModelSensor | undefined {
    return this.activeSensor.value;
  }

  /**
   * 获取拖拽状态
   */
  get isDragging(): boolean {
    return this.dragging.value;
  }

  /**
   * 快速监听容器元素的拖拽行为
   *
   * @param shell - 容器元素
   * @param boost - 从鼠标事件获取拖拽对象的函数
   * @returns 清理函数
   *
   * @example
   * ```ts
   * dragon.from(document.querySelector('.component-panel'), (e) => {
   *   const componentMeta = getComponentMeta(e.target);
   *   return {
   *     type: IPublicEnumDragObjectType.NodeData,
   *     data: [{ componentName: componentMeta.componentName }]
   *   };
   * });
   * ```
   */
  from(shell: Element, boost: (e: MouseEvent) => IPublicModelDragObject | null) {
    const mousedown = (e: MouseEvent) => {
      // 忽略右键
      if (e.which === 3 || e.button === 2) {
        return;
      }

      // 获取要拖拽的对象
      const dragObject = boost(e);
      if (!dragObject) {
        return;
      }

      this.boost(dragObject, e);
    };

    shell.addEventListener('mousedown', mousedown as any);

    // 返回清理函数
    return () => {
      shell.removeEventListener('mousedown', mousedown as any);
    };
  }

  /**
   * 启动拖拽
   *
   * @param dragObject - 拖拽对象
   * @param boostEvent - 拖拽初始时的事件
   * @param fromRglNode - 是否来自 RGL 节点
   *
   * @example
   * ```ts
   * const node = document.getNode(nodeId);
   * dragon.boost(
   *   { type: IPublicEnumDragObjectType.Node, nodes: [node] },
   *   mouseEvent
   * );
   * ```
   */
  boost(
    dragObject: IPublicModelDragObject,
    boostEvent: MouseEvent | DragEvent,
    fromRglNode?: INode | IPublicModelNode
  ) {
    const { designer } = this;
    const masterSensors = this.getMasterSensors();
    const handleEvents = makeEventsHandler(boostEvent, masterSensors);
    const newBie = !isDragNodeObject(dragObject);
    const forceCopyState =
      isDragNodeObject(dragObject) &&
      dragObject.nodes.some(
        (node: any) =>
          (typeof node.isSlot === 'function' ? node.isSlot() : node.isSlot)
      );
    const isBoostFromDragAPI = isDragEvent(boostEvent);
    let lastSensor: IPublicModelSensor | undefined;

    this.dragging.value = false;
    this.dragObject.value = dragObject;

    /**
     * 获取 RGL 信息
     */
    const getRGL = (e: MouseEvent | DragEvent) => {
      const locateEvent = createLocateEvent(e);
      const sensor = chooseSensor(locateEvent);
      if (!sensor || !sensor.getNodeInstanceFromElement) return {};
      const nodeInst = sensor.getNodeInstanceFromElement(e.target as Element);
      return nodeInst?.node?.getRGL?.() || {};
    };

    /**
     * ESC 键取消拖拽
     */
    const checkesc = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        designer.clearLocation();
        over();
      }
    };

    let copy = false;

    /**
     * 检查复制状态（Ctrl/Option 键）
     */
    const checkcopy = (e: MouseEvent | DragEvent | KeyboardEvent) => {
      if (isDragEvent(e) && e.dataTransfer) {
        if (newBie || forceCopyState) {
          e.dataTransfer.dropEffect = 'copy';
        }
        return;
      }
      if (newBie) {
        return;
      }

      if (e.altKey || e.ctrlKey) {
        copy = true;
        this.setCopyState(true);
        if (isDragEvent(e) && e.dataTransfer) {
          e.dataTransfer.dropEffect = 'copy';
        }
      } else {
        copy = false;
        if (!forceCopyState) {
          this.setCopyState(false);
          if (isDragEvent(e) && e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
          }
        }
      }
    };

    let lastArrive: any;

    /**
     * 拖拽进行中
     */
    const drag = (e: MouseEvent | DragEvent) => {
      checkcopy(e);

      if (isInvalidPoint(e, lastArrive)) return;

      if (lastArrive && isSameAs(e, lastArrive)) {
        lastArrive = e;
        return;
      }
      lastArrive = e;

      const { isRGL, rglNode } = getRGL(e);
      const locateEvent = createLocateEvent(e);
      const sensor = chooseSensor(locateEvent);

      if (isRGL) {
        // RGL 特殊处理
        const nodes = (dragObject as any).nodes;
        if (nodes && nodes[0]) {
          const nodeInst = (nodes[0] as any).getDOMNode?.();
          if (nodeInst && nodeInst.style) {
            this.nodeInstPointerEvents = true;
            nodeInst.style.pointerEvents = 'none';
          }
        }

        this.emitter.emit('rgl.sleeping', false);
        if (fromRglNode && fromRglNode.id === rglNode?.id) {
          designer.clearLocation();
          this.clearState();
          this.emitter.emit('drag', locateEvent);
          return;
        }

        this.canDrop.value = !!sensor?.locate(locateEvent);
        if (this.canDrop.value) {
          this.emitter.emit('rgl.add.placeholder', {
            rglNode,
            fromRglNode,
            node: locateEvent.dragObject?.nodes?.[0],
            event: e,
          });
          designer.clearLocation();
          this.clearState();
          this.emitter.emit('drag', locateEvent);
          return;
        }
      } else {
        this.canDrop.value = false;
        this.emitter.emit('rgl.remove.placeholder');
        this.emitter.emit('rgl.sleeping', true);
      }

      if (sensor) {
        sensor.fixEvent(locateEvent);
        sensor.locate(locateEvent);
      } else {
        designer.clearLocation();
      }
      this.emitter.emit('drag', locateEvent);
    };

    /**
     * 拖拽开始
     */
    const dragstart = () => {
      this.dragging.value = true;
      setShaken(boostEvent);
      const locateEvent = createLocateEvent(boostEvent);
      if (newBie || forceCopyState) {
        this.setCopyState(true);
      } else {
        chooseSensor(locateEvent);
      }
      this.setDraggingState(true);

      // 注册 ESC 取消监听
      if (!isBoostFromDragAPI) {
        handleEvents((doc: Document) => {
          doc.addEventListener('keydown', checkesc, false);
        });
      }

      this.emitter.emit('dragstart', locateEvent);
    };

    /**
     * 鼠标移动
     */
    const move = (e: MouseEvent | DragEvent) => {
      if (isBoostFromDragAPI) {
        e.preventDefault();
      }

      if (this.dragging.value) {
        // 正在拖拽
        drag(e);
        return;
      }

      // 首次移动，检查是否抖动
      if (isShaken(boostEvent, e)) {
        dragstart();
        drag(e);
      }
    };

    let didDrop = true;

    /**
     * Drop 事件
     */
    const drop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      didDrop = true;
    };

    /**
     * 拖拽结束
     */
    const over = (e?: any) => {
      // 恢复 pointer-events
      if (this.nodeInstPointerEvents) {
        const nodes = (dragObject as any).nodes;
        if (nodes && nodes[0]) {
          const nodeInst = (nodes[0] as any).getDOMNode?.();
          if (nodeInst && nodeInst.style) {
            nodeInst.style.pointerEvents = '';
          }
          this.nodeInstPointerEvents = false;
        }
      }

      // RGL drop 事件
      if (e) {
        const { isRGL, rglNode } = getRGL(e);
        if (isRGL && this.canDrop.value && this.dragging.value) {
          const nodes = (dragObject as any).nodes;
          if (nodes && nodes[0]) {
            const tarNode = nodes[0] as any;
            if (rglNode?.id !== tarNode.id) {
              this.emitter.emit('rgl.drop', {
                rglNode,
                node: tarNode,
              });
              const selection = designer.project.currentDocument?.selection;
              selection?.select(tarNode.id);
            }
          }
        }
      }

      // 移除 RGL 占位符
      this.emitter.emit('rgl.remove.placeholder');

      if (e && isDragEvent(e)) {
        e.preventDefault();
      }

      if (lastSensor) {
        lastSensor.deactiveSensor();
      }

      if (isBoostFromDragAPI) {
        if (!didDrop) {
          designer.clearLocation();
        }
      } else {
        this.setNativeSelection(true);
      }

      this.clearState();

      let exception;
      if (this.dragging.value) {
        this.dragging.value = false;
        try {
          this.emitter.emit('dragend', { dragObject, copy });
        } catch (ex) {
          exception = ex;
        }
      }
      designer.clearLocation();

      handleEvents((doc: Document) => {
        if (isBoostFromDragAPI) {
          doc.removeEventListener('dragover', move, true);
          doc.removeEventListener('dragend', over, true);
          doc.removeEventListener('drop', drop, true);
        } else {
          doc.removeEventListener('mousemove', move, true);
          doc.removeEventListener('mouseup', over, true);
        }
        doc.removeEventListener('mousedown', over, true);
        doc.removeEventListener('keydown', checkesc, false);
        doc.removeEventListener('keydown', checkcopy, false);
        doc.removeEventListener('keyup', checkcopy, false);
      });

      if (exception) {
        throw exception;
      }
    };

    /**
     * 创建定位事件
     */
    const createLocateEvent = (e: MouseEvent | DragEvent): ILocateEvent => {
      const evt: any = {
        type: 'LocateEvent',
        dragObject,
        target: e.target,
        originalEvent: e,
      };

      const sourceDocument = e.view?.document;

      // 事件来自当前文档
      if (!sourceDocument || sourceDocument === document) {
        evt.globalX = e.clientX;
        evt.globalY = e.clientY;
      } else {
        // 事件来自 simulator iframe
        let srcSim: ISimulatorHost | undefined;
        const lastSim = lastSensor ? lastSensor : null;

        if (lastSim && lastSim.contentDocument === sourceDocument) {
          srcSim = lastSim;
        } else {
          srcSim = masterSensors.find((sim) => sim.contentDocument === sourceDocument);
          if (!srcSim && lastSim) {
            srcSim = lastSim;
          }
        }

        if (srcSim) {
          // 通过 simulator 转换坐标
          const g = srcSim.viewport.toGlobalPoint(e);
          evt.globalX = g.clientX;
          evt.globalY = g.clientY;
          evt.canvasX = e.clientX;
          evt.canvasY = e.clientY;
          evt.sensor = srcSim;
        } else {
          // 理论上不会走到这里，确保 TS 类型检查通过
          evt.globalX = e.clientX;
          evt.globalY = e.clientY;
        }
      }

      return evt;
    };

    /**
     * 选择感应器
     */
    const sourceSensor = getSourceSensor(dragObject);
    const chooseSensor = (e: ILocateEvent) => {
      // 合并所有可用的感应器
      const sensors: IPublicModelSensor[] = this.sensors.concat(
        masterSensors as IPublicModelSensor[]
      );

      let sensor =
        e.sensor && e.sensor.isEnter(e)
          ? e.sensor
          : sensors.find((s) => s.sensorAvailable && s.isEnter(e));

      if (!sensor) {
        if (lastSensor) {
          sensor = lastSensor;
        } else if (e.sensor) {
          sensor = e.sensor;
        } else if (sourceSensor) {
          sensor = sourceSensor;
        }
      }

      if (sensor !== lastSensor) {
        if (lastSensor) {
          lastSensor.deactiveSensor();
        }
        lastSensor = sensor;
      }

      if (sensor) {
        e.sensor = sensor;
        sensor.fixEvent(e);
      }

      this.activeSensor.value = sensor;
      return sensor;
    };

    // 如果是原生拖拽 API
    if (isDragEvent(boostEvent)) {
      const { dataTransfer } = boostEvent;

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'all';

        try {
          dataTransfer.setData('application/json', '{}');
        } catch (ex) {
          // 忽略
        }
      }

      dragstart();
    } else {
      this.setNativeSelection(false);
    }

    // 注册事件监听
    handleEvents((doc: Document) => {
      if (isBoostFromDragAPI) {
        doc.addEventListener('dragover', move, true);
        didDrop = false;
        doc.addEventListener('drop', drop, true);
        doc.addEventListener('dragend', over, true);
      } else {
        doc.addEventListener('mousemove', move, true);
        doc.addEventListener('mouseup', over, true);
      }
      doc.addEventListener('mousedown', over, true);
    });

    // 注册复制态快捷键
    if (!newBie && !isBoostFromDragAPI) {
      handleEvents((doc: Document) => {
        doc.addEventListener('keydown', checkcopy, false);
        doc.addEventListener('keyup', checkcopy, false);
      });
    }
  }

  /**
   * 获取主感应器列表（来自 Simulator）
   */
  private getMasterSensors(): ISimulatorHost[] {
    return Array.from(
      new Set(
        this.designer.project.documents
          .map((doc: any) => {
            if (doc.active && doc.simulator?.sensorAvailable) {
              return doc.simulator;
            }
            return null;
          })
          .filter(Boolean) as any
      )
    );
  }

  /**
   * 获取所有 Simulator
   */
  private getSimulators() {
    return new Set(this.designer.project.documents.map((doc) => doc.simulator));
  }

  // #region ======== 拖拽辅助方法 ============

  /**
   * 设置原生选择状态
   */
  private setNativeSelection(enableFlag: boolean) {
    setNativeSelection(enableFlag);
    this.getSimulators().forEach((sim) => {
      sim?.setNativeSelection?.(enableFlag);
    });
  }

  /**
   * 设置拖拽态
   */
  private setDraggingState(state: boolean) {
    cursor.setDragging(state);
    this.getSimulators().forEach((sim) => {
      sim?.setDraggingState?.(state);
    });
  }

  /**
   * 设置拷贝态
   */
  private setCopyState(state: boolean) {
    cursor.setCopy(state);
    this.getSimulators().forEach((sim) => {
      sim?.setCopyState?.(state);
    });
  }

  /**
   * 清除所有状态
   */
  private clearState() {
    cursor.release();
    this.getSimulators().forEach((sim) => {
      sim?.clearState?.();
    });
  }

  // #endregion

  /**
   * 添加投放感应器
   */
  addSensor(sensor: any) {
    this.sensors.push(sensor);
  }

  /**
   * 移除投放感应器
   */
  removeSensor(sensor: any) {
    const i = this.sensors.indexOf(sensor);
    if (i > -1) {
      this.sensors.splice(i, 1);
    }
  }

  /**
   * 监听拖拽开始事件
   */
  onDragstart(func: (e: ILocateEvent) => any): IPublicTypeDisposable {
    this.emitter.on('dragstart', func);
    return () => {
      this.emitter.removeListener('dragstart', func);
    };
  }

  /**
   * 监听拖拽进行事件
   */
  onDrag(func: (e: ILocateEvent) => any): IPublicTypeDisposable {
    this.emitter.on('drag', func);
    return () => {
      this.emitter.removeListener('drag', func);
    };
  }

  /**
   * 监听拖拽结束事件
   */
  onDragend(func: (x: { dragObject: IPublicModelDragObject; copy: boolean }) => any): IPublicTypeDisposable {
    this.emitter.on('dragend', func);
    return () => {
      this.emitter.removeListener('dragend', func);
    };
  }

  /**
   * 导出 Dragon 状态
   *
   * @returns Dragon 状态
   */
  exportState(): any {
    return {
      dragging: this.dragging.value,
      dragObject: this.dragObject.value,
      activeSensor: this.activeSensor.value,
      canDrop: this.canDrop.value,
    };
  }

  /**
   * 导入 Dragon 状态
   *
   * @param state - Dragon 状态
   */
  async importState(state: any): Promise<void> {
    this.dragging.value = state.dragging || false;
    this.dragObject.value = state.dragObject || null;
    this.activeSensor.value = state.activeSensor;
    this.canDrop.value = state.canDrop || false;
  }
}
