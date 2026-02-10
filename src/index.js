require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');

const userRouter = require('./routes/user.routes');
const collarRouter = require('./routes/collar.routes');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();


app.use(express.json());



app.get('/', (req, res) => {
  res.status(200).send('ok');
}
);

app.use('/users', userRouter);

app.use('/collares', collarRouter);

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
