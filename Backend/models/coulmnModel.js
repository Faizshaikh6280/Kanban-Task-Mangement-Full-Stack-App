import mongoose from 'mongoose';

const coulmnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Coulmn name should be unqiue'],
  },
  color: String,
});

const coulmnModel = mongoose.model('Coulmn', coulmnSchema);
export default coulmnModel;
