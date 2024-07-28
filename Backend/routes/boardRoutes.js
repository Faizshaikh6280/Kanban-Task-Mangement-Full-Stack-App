import express from 'express';
import {
  createBoard,
  getAllBoards,
  getBoard,
} from '../controllers/boardController.js';

const router = express.Router();

// get board
router.get('/', getAllBoards);
router.get('/:name', getBoard);

// create new board
router.post('/', createBoard);

export default router;
