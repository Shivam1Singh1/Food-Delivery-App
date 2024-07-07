import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shivamsingh16mar:rJNUQJSVuNwYSGtI@cluster0.wtli9no.mongodb.net/food-del').then(() => console.log("DB Connected"));
}