import { Request, Response } from 'express';
import logger from '../utils/logger';
import axios from 'axios';

export const fetchExternal = async (req: Request, res: Response) => {
  try {
    logger.info('Start Fetch External')
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    logger.info('Response: ' + JSON.stringify(response.data, null, 2));
    res.json({ posts: response.data });
  } catch (err) {
    const error = err as Error;
      logger.error('Failed to fetch external data', {
        error: error.message
      });
    res.status(500).json({ error: 'Failed to fetch external data' });
  }
};
