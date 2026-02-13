const mongoose = require('mongoose');

const connectDB =  async () => {
    if (!process.env.MONGO_URI) {
        console.error('Falta configurar MONGO_URI en variables de entorno');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('erroral conectar a MongoDB', error.message);
    }
};

module.exports = connectDB;