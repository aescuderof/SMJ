require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Collar = require('./models/Collar');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('ok');
}
);

app.get('/collares', async (req, res) => {
  try {
    const collares = await Collar.find({});
    return res.status(200).json({ collares })
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al obtener los collares',
      error: error.message
    })
  }
})

app.post('/collares', async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen } = req.body;
    const nuevoCollar = await Collar.create({ nombre, precio, descripcion, imagen });

    if (!nuevoCollar) return res.status(400).json({ message: 'No se pudo crear el collar' });
 
    return res.status(201).json({datos: nuevoCollar })

  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al crear el collar',
      error: error.message  
    })
  }
})

app.put('/collares/:id', async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const collarActualizado = await Collar.findByIdAndUpdate(
      req.params.id, { nombre, precio, descripcion }, 
      { new: true, runValidators: true }
    );

    if (!collarActualizado) return res.status(404).json({ message: 'Collar no encontrado' });

    return res.status(200).json({ datos: collarActualizado });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al actualizar el collar',
      error: error.message
    })
  }
})

app.delete('/collares/:id', async (req, res) => {
  try {
    const collarEliminado = await Collar.findByIdAndDelete(req.params.id);

    if (!collarEliminado) return res.status(404).json({ message: 'Collar no encontrado' });

    return res.status(200).json({ message: 'Collar eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al eliminar el collar',
      error: error.message
    })
  }
})

app.post('/users/register', async (req, res) => {
  const { username, nombre, email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const nombreUsuario = nombre || username;
    if (!nombreUsuario) {
      return res.status(400).json({ message: 'El nombre de usuario es requerido' });
    }

    const newUser = new User({ 
      nombre: nombreUsuario,
      email, 
      password: hashedPassword });

    await newUser.save();
    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registar usuario', error: error.message });
  }   
});

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
  console.log('El servidor está corriendo en el puero ' + PORT);
});
