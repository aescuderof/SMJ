require('dotenv').config();
const cors = require('cors');
const express = require('express');

const connectDB = require('./config/db');

const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

const whiteList = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
];

const corsOptions = {
  origin: function(origin, callback) {
    // Permitir peticiones sin origin (como Thunder Client, Postman, etc.)
    if (!origin) return callback(null, true);

    if(whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());



app.get('/', (req, res) => {
  res.status(200).send('ok');
}
);

app.use('/users', userRouter);

app.use('/products', productRouter);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users })
  }
    catch (error) {
      return res.status(500).json({
        message: 'Hubo un error al obtener los usuarios',
        error: error.message
      })
    }
})




app.listen(PORT, () => {
  console.log('El servidor está corriendo en el puerto ' + PORT);
});
