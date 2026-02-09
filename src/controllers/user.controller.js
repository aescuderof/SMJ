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

exports.login = async (req, res) => {
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
};

exports.verifyUser = async (req, res) => {
    try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al verificar el usuario', 
      error});
  }
};

exports.updateUserById = async (req, res) => {
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
}



