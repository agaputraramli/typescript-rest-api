import cron from 'node-cron';
import logger from '../utils/logger';

export const startScheduledTask = () => {
  cron.schedule('* * * * *', () => {
    logger.debug('Task berjalan setiap menit: ' + new Date().toISOString());
  });
};
