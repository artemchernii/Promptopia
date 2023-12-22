import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MONGODB IS ALREADY CONNECTED')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
        })
        isConnected = true
        console.log('MONGO DB IS CONNECTED')
    } catch (error) {
        console.error(error)
    }
}
