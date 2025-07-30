import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/blog_api', {
  
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message);
        process.exit(1); //sluit app want zonder databease werkt het niet
    }
};

export default connectDB; 