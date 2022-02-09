import express from "express";
import mongoose from "mongoose";
import authRouter from './authRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
		await mongoose.connect(`mongodb+srv://Mihanik:Mihanik@cluster0.vsixi.mongodb.net/Project_0?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
