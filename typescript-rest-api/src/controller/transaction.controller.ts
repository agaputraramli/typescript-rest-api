import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db';
import logger from '../utils/logger';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id, total, items } = req.body;

  const client = await db.connect();
  try {
    logger.info(`Creating order for customer: ${customer_id}`);
    await client.query('BEGIN');

    const insertOrder = 'INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING id';
    const orderResult = await client.query(insertOrder, [customer_id, total]);
    const orderId = orderResult.rows[0].id;

    const insertItem = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)';
    for (const item of items) {
      await client.query(insertItem, [orderId, item.product_id, item.quantity]);
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Order created', orderId, data: items, total_amount: total});
  } catch (err) {
    await client.query('ROLLBACK');
    const error = err as Error;
    logger.error('Order failed', { error: error.message });
    next(err);
  } finally {
    client.release();
  }
};

export const getTopOrderCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Fetching top customer by order count');
  
      const query = `
        SELECT customer_id, COUNT(*) as total_orders
        FROM orders
        GROUP BY customer_id
        ORDER BY total_orders DESC
        LIMIT 1
      `;
      const result = await db.query(query);
      res.json(result.rows[0]);
    } catch (err) {
      const error = err as Error;
      logger.error('Failed to fetch top customer', { error: error.message });
      next(err);
    }
  };