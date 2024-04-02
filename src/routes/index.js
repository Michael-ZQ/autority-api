import { Router } from 'express';

import * as homeController from '@/controllers/home';
import taskRoutes from './task';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);

router.use('/tasks', taskRoutes);

export default router;
