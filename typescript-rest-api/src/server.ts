import app from './app';
import logger from './utils/logger';
import { startScheduledTask } from './scheduler/task';

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  logger.debug(`Server started on port ${PORT}`);
});

startScheduledTask();
