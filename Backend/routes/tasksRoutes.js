import express from 'express';
import {
  createManySubtasks,
  createSubtask,
  createTask,
  getTask,
  updateSubtask,
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/:taskId', getTask);
router.post('/subtask', createSubtask);
router.post('/subtask-many', createManySubtasks);
router.patch('/subtask/:subtaskId', updateSubtask);

export default router;
