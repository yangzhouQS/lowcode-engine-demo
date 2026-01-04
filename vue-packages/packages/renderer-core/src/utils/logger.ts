import debug from 'debug';

const logger = debug('renderer');

export default {
  debug: (...args: any[]) => logger(...args),
  info: (...args: any[]) => logger.info(...args),
  warn: (...args: any[]) => logger.warn(...args),
  error: (...args: any[]) => logger.error(...args),
};
