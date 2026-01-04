import { inject, provide } from 'vue';
import { BuiltinSimulatorHost } from './host';

const SimulatorContextKey = Symbol('SimulatorContext');

export function useSimulatorContext() {
  return inject(SimulatorContextKey);
}

export function provideSimulatorContext(host: BuiltinSimulatorHost) {
  provide(SimulatorContextKey, host);
}

export { SimulatorContextKey };
