import express from 'express';
import {
  createColumn,
  createManyColumns,
  deleteColumn,
} from '../controllers/coulmnController.js';

const router = express.Router();

// create new board
router.post('/', createColumn);
router.delete('/:columnId', deleteColumn);
router.post('/many', createManyColumns);

export default router;
