import express from 'express';
import {
  createManySubtasks,
  createSubtask,
  createTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:taskId', getTask);

router.post('/', createTask);
router.post('/subtask', createSubtask);
router.post('/subtask-many', createManySubtasks);
router.patch('/:taskId', updateTask);

export default router;
