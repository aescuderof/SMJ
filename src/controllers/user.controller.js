const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
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
};



