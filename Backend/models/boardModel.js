import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Board name is required'],
  },
  userId: String,
  coulmns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Coulmn',
    },
  ],
});

export default mongoose.model('Board', boardSchema);
