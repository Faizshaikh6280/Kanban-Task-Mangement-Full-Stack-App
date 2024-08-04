import express from 'express';
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoard,
} from '../controllers/boardController.js';

const router = express.Router();

// get board
router.get('/', getAllBoards);
router.get('/:name', getBoard);

router.delete('/:boardId', deleteBoard);

// create new board
router.post('/', createBoard);

export default router;
