import { Router } from 'express';
import { fetchExternal } from '../controller/fetch.controller';

const router = Router();

router.get('/external', fetchExternal);

export default router;