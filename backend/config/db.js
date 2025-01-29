import mongoose from "mongoose";

export const connectDB = async () => {
 await mongoose.connect('mongodb+srv://modanas:6291799667@cluster0.snrgf.mongodb.net/food-del')
 .then(() => console.log("DB Connected"))
}