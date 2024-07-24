import express from 'express';
import { createColumn } from '../controllers/coulmnController.js';

const router = express.Router();

// create new board
router.post('/', createColumn);

export default router;
