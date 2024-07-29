import express from 'express';
import {
  createManySubtasks,
  createSubtask,
  createTask,
  getAllTasks,
  getTask,
  updateSubtask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:taskId', getTask);

router.post('/', createTask);
router.post('/subtask', createSubtask);
router.post('/subtask-many', createManySubtasks);
router.patch('/subtask/:subtaskId', updateSubtask);

export default router;
