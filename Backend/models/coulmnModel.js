import mongoose from 'mongoose';

const coulmnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Coulmn name should be unqiue'],
    unique: true,
  },
  color: String,
  // tasks: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Task',
  //   },
  // ],
});

coulmnSchema.pre(/^find/, function () {
  this.populate({
    path: 'tasks',
    select: 'title subtasks',
  });
});

export default mongoose.model('Coulmn', coulmnSchema);
