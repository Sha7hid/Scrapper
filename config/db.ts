import mongoose from "mongoose";
const mongo_uri = `mongodb+srv://shahid:arthur540913@cluster2.ggcnvuy.mongodb.net/Backlit`
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log(`Mongo DB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


 export default connectDB;