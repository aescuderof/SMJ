const Collar = require('../models/Collar');


exports.getAllCollares = async (req, res) => {
      try {
    const collares = await Collar.find({});
    return res.status(200).json({ collares })
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al obtener los collares',
      error: error.message
    })
  }
}

exports.createCollar = async (req, res) => {
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
}
  
exports.updateCollarById = async (req, res) => {
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
}

exports.deleteCollarById = async (req, res) => {
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
}

