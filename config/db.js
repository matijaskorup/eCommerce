import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Database connected: ${process.env.MONGO_URI}`.cyan);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
