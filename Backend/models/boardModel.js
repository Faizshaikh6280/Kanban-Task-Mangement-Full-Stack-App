import mongoose from 'mongoose';
import slugify from 'slugify';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Board name is required'],
    trim: true,
    maxLength: [30, 'Maximum length of name is 30 characters.'],
    minLength: [3, 'Minimum length of name is 3 characters.'],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  slug: {
    type: String,
  },
  coulmns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Coulmn',
    },
  ],
});

boardSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model('Board', boardSchema);
