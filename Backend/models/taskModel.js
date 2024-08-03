import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    select: false,
  },
  description: String,
  subTasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Subtask',
    },
  ],

  boardSlug: String,
  status: String,
});

export default mongoose.model('Task', taskSchema);
