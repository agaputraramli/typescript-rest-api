import { Router } from 'express';
import { createOrder, getTopOrderCustomer } from '../controller/transaction.controller';

const router = Router();

router.post('/order', createOrder);
router.get('/top-customer', getTopOrderCustomer);

export default router;
