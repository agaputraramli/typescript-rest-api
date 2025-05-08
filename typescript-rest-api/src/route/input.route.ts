import { Router } from 'express';
import { createItem } from '../controller/input_items.controller';

const router = Router();

router.post('/items', createItem);

export default router;
