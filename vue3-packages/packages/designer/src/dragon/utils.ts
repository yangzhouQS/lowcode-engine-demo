import { ISimulatorHost } from '../../simulator/src/simulator';

/**
 * 判断节点是否为元素节点
 */
export function isElementNode(domNode: Element): boolean {
  return domNode.nodeType === Node.ELEMENT_NODE;
}

/**
 * 创建跨文档事件处理器
 *
 * 用于处理跨 iframe 的事件监听，确保在主文档和所有 simulator iframe 中都能正确处理事件
 *
 * @param boostEvent - 初始触发事件（用于获取源文档）
 * @param sensors - Simulator 感应器列表
 * @returns 事件处理函数
 *
 * @example
 * ```ts
 * const handleEvents = makeEventsHandler(mouseEvent, masterSensors);
 *
 * // 在所有文档中注册事件监听
 * handleEvents((doc) => {
 *   doc.addEventListener('mousemove', moveHandler, true);
 *   doc.addEventListener('mouseup', upHandler, true);
 * });
 *
 * // 清理时移除所有监听
 * handleEvents((doc) => {
 *   doc.removeEventListener('mousemove', moveHandler, true);
 *   doc.removeEventListener('mouseup', upHandler, true);
 * });
 * ```
 */
export function makeEventsHandler(
  boostEvent: MouseEvent | DragEvent,
  sensors: ISimulatorHost[]
): (fn: (sdoc: Document) => void) => void {
  // 主文档
  const topDoc = window.document;

  // 源文档（事件触发的文档）
  const sourceDoc = boostEvent.view?.document || topDoc;

  // 收集所有相关文档
  const docs = new Set<Document>();
  docs.add(topDoc);
  docs.add(sourceDoc);

  // 添加所有 simulator 的文档
  sensors.forEach((sim) => {
    const sdoc = sim.contentDocument;
    if (sdoc) {
      docs.add(sdoc);
    }
  });

  // 返回处理函数
  return (handle: (sdoc: Document) => void) => {
    docs.forEach((doc) => handle(doc));
  };
}

/**
 * 规范化触发器名称
 * 将所有触发器名称转换为大写
 */
export function normalizeTriggers(triggers: string[]): string[] {
  return triggers.map((trigger: string) => trigger?.toUpperCase());
}
