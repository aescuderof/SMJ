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

app.post('/users', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUsuario = await User.create({ nombre, email, password });

    if (!nuevoUsuario) return res.status(400).json({ message: 'No se pudo crear el usuario' });

    return res.status(201).json({datos: nuevoUsuario })
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al crear el usuario',
      error: error.message  
    })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id, { nombre, email, password },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ datos: usuarioActualizado });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al actualizar el usuario',
      error: error.message
    })
  } 
})

app.delete('/users/:id', async (req, res) => {
  try {
    const usuarioEliminado = await User.findByIdAndDelete(req.params.id);

    if (!usuarioEliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al eliminar el usuario',
      error: error.message
    })
  }
})


app.listen(PORT, () => {
  console.log('El servidor está corriendo en el puerto ' + PORT);
});
