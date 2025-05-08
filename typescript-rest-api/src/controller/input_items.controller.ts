import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db';
import logger from '../utils/logger';


export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    const client = await db.connect();
    const { name } = req.body;
  
    try {
      await client.query('BEGIN');
      const result = await client.query(`SELECT nextval('item_code_seq') AS number`);
      const count = result.rows[0].number;
      const code = `ITEM-${String(count).padStart(4, '0')}`;
  
      await client.query(
        `INSERT INTO items (code, name) VALUES ($1, $2)`,
        [code, name]
      );
  
      await client.query('COMMIT');
  
      const timestamp = new Date().toISOString();
      logger.debug('Item created successfully', {
        code,
        name,
        date: timestamp
      });
  
      res.status(201).json({ code, name });
    } catch (err) {
      await client.query('ROLLBACK');
  
      const error = err as Error;
      logger.error('Failed to create item', {
        name,
        error: error.message
      });
  
      next(error);
    } finally {
      client.release();
    }
  };
  