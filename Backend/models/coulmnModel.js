import mongoose from 'mongoose';

const coulmnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Coulmn name should be unqiue'],
  },
  color: String,
});

coulmnSchema.pre('save', function (next) {
  this.name = this.name.toLowerCase();
  next();
});

const coulmnModel = mongoose.model('Coulmn', coulmnSchema);
export default coulmnModel;
