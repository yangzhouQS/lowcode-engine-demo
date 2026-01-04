export function isElementNode(domNode: Element) {
  return domNode.nodeType === Node.ELEMENT_NODE;
}

/**
 * normalize triggers
 * @param triggers
 */
export function normalizeTriggers(triggers: string[]) {
  return triggers.map((trigger: string) => trigger?.toUpperCase());
}

/**
 * make a handler that listen all sensors:document, avoid frame lost
 */
export function makeEventsHandler(
  boostEvent: MouseEvent | DragEvent,
  sensors: any[],
): (fn: (sdoc: Document) => void) => void {
  const topDoc = window.document;
  const sourceDoc = boostEvent.view?.document || topDoc;
  const docs = new Set<Document>();
  docs.add(topDoc);
  docs.add(sourceDoc);
  sensors.forEach((sim) => {
    const sdoc = sim.contentDocument;
    if (sdoc) {
      docs.add(sdoc);
    }
  });

  return (handle: (sdoc: Document) => void) => {
    docs.forEach((doc) => handle(doc));
  };
}
