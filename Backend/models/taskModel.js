import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  userId: String,
  description: String,
  subTasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Subtask',
    },
  ],
  status: String,
});

export default mongoose.model('Task', taskSchema);
