import mongoose from 'mongoose'

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if(connected) {
        console.log('MongoDB is already connected ...')
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000, 
            family: 4 
        });
        connected = true
        console.log('MongoDB connected ...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB