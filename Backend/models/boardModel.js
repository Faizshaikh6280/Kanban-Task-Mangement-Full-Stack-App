import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Board name is required'],
    unique: true,
  },
  userId: String,
  coulmns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Column',
    },
  ],
});

export default mongoose.model('Board', boardSchema);
