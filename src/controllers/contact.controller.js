const ContactMessage = require('../models/ContactMessage');

exports.getAllContactMessages = async (req, res) => {
  try {
    const { correo, from, to } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const query = {};

    if (correo) {
      query.correo = { $regex: correo, $options: 'i' };
    }

    if (from || to) {
      query.createdAt = {};

      if (from) {
        const fromDate = new Date(from);
        if (Number.isNaN(fromDate.getTime())) {
          return res.status(400).json({ message: 'Parámetro "from" inválido. Usa formato de fecha válido.' });
        }
        query.createdAt.$gte = fromDate;
      }

      if (to) {
        const toDate = new Date(to);
        if (Number.isNaN(toDate.getTime())) {
          return res.status(400).json({ message: 'Parámetro "to" inválido. Usa formato de fecha válido.' });
        }
        query.createdAt.$lte = toDate;
      }
    }

    const [messages, total] = await Promise.all([
      ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ContactMessage.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      messages,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al obtener los mensajes',
      error: error.message,
    });
  }
};

exports.createContactMessage = async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({
        message: 'Nombre, correo y mensaje son obligatorios'
      });
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
      return res.status(400).json({
        message: 'Debes ingresar un correo válido'
      });
    }

    const newMessage = await ContactMessage.create({
      nombre,
      correo,
      mensaje
    });

    return res.status(201).json({
      message: 'Mensaje enviado correctamente',
      data: {
        id: newMessage._id
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al enviar el mensaje',
      error: error.message
    });
  }
};
