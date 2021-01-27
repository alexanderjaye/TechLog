// const { response } = require('express');

import * as express from 'express';
import * as reports from './controllers/reports.controller';
import { authMiddleware } from './middlewares/auth';

const router = express.Router();
//Reports routes
router.get('/reports', reports.allReports);

router.get('/reports/:id', reports.getReport);

router.post('/reports', reports.newReport);

router.put('/reports', reports.editReport);

router.delete('/reports/:id', authMiddleware, reports.deleteReport);

export default router;
