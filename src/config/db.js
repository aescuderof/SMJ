const mongoose = require('mongoose');

const connectDB =  async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Falta configurar MONGO_URI en variables de entorno');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('MongoDB connected');
        return mongoose.connection;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        throw error;
    }
};

module.exports = connectDB;