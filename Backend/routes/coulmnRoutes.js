import express from 'express';
import {
  createColumn,
  createManyColumns,
} from '../controllers/coulmnController.js';

const router = express.Router();

// create new board
router.post('/', createColumn);
router.post('/many', createManyColumns);

export default router;
