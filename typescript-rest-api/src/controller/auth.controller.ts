import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/db';
import logger from '../utils/logger';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, password } = req.body;
  const client = await db.connect();

  try {
    const query = `
      SELECT * FROM users 
      WHERE email = $1 OR username = $1
      LIMIT 1
    `;
    const result = await client.query(query, [identifier]);
    const user = result.rows[0];

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      logger.error('User not found', { identifier });
      return;
    }

    // const isMatch = await bcrypt.compare(password, user.password.trim());
    const isMatch = password === user.password;

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid password' });
      logger.error('Invalid password attempt', { identifier, inputPassword: password, storedPassword: user.password });
      return;
    }

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    const timestamp = new Date().toISOString();
    logger.info('User logged in successfully', { identifier });
    res.json({
      date: timestamp,
      token
    });

  } catch (err) {
    const error = err as Error;
    logger.error('An error occurred during login', { error: error.message });
    next(error);
  } finally {
    client.release(); 
  }
};


