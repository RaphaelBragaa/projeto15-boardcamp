import express from 'express';

import { GetCategory, PostCategory } from '../Controllers/CategoryController.js';


const router = express.Router();

router.get('/categories', (GetCategory))
router.post('/categories',(PostCategory))

export default router;

