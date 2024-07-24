import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  subtaskname: String,
  isDone: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Subtask', subtaskSchema);
