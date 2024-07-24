import mongoose from 'mongoose';

const connectToDB = function () {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('DB connection successful!');
    })
    .catch((err) => {
      console.log(`Error connecting to DB ${err.message}`);
    });
};

export default connectToDB;
