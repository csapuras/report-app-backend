import app from './app';
import config from './config/config';
import logger from './utils/logger';

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})