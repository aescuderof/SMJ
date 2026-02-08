require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('./middleware/authorization');

const connectDB = require('./config/db');

const User = require('./models/User');
const collarRouter = require('./routes/collar.routes');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());

app.use('/collares', collarRouter);

app.get('/', (req, res) => {
  res.status(200).send('ok');
}
);


app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'Usuario no existe' });
    }

    if (!foundUser.password) {
      return res.status(400).json({ message: 'Usuario sin contraseña registrada' });
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);
    
    if (!correctPassword) {
      return res.status(400).json({ message: 'El email o contraseña no coincide' });
    }

    const payload = {
        user: foundUser._id,
        email: foundUser.email
      };


    jwt.sign(
      payload,
      process.env.SECRET,
       { expiresIn: '1h' }, 
       (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
    );
  } catch (error) {
    res.json({ message: 'Error al obtener el token', 
      error: error.message });
  }
});
      
app.get('/users/verify-user', auth, async (req, res) => { 
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al verificar el usuario', 
      error});
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

app.put('/users/update', async (req, res) => {
  try {
    const { id, nombre, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuarioActualizado = await User.findByIdAndUpdate(
      req.user.id, 
      { nombre, email, password: hashedPassword },
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
