import express from 'express';
import { createBoard, getBoard } from '../controllers/boardController.js';

const router = express.Router();

// get board
router.get('/:name', getBoard);
router.post('/', createBoard);

// create new board

export default router;
