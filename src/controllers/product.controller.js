const Product = require('../models/Product');
const stripe = process.env.STRIPE_KEY
  ? require('stripe')(process.env.STRIPE_KEY)
  : null;


exports.getAllProducts = async (req, res) => {
  try {
    // Obtener parámetros de paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Obtener total de productos
    const total = await Product.countDocuments();

    // Obtener productos paginados
    const products = await Product.find({})
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al obtener los productos',
      error: error.message
    });
  }
}

exports.createProduct = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        message: 'Falta configurar STRIPE_KEY en variables de entorno'
      });
    }

    const { nombre, precio, descripcion, img, images, currency, slug } = req.body;
    const normalizedImages = Array.isArray(images)
      ? images
          .filter((url) => typeof url === 'string' && url.trim() !== '')
          .map((url) => url.trim())
      : typeof img === 'string' && img.trim() !== ''
      ? [img.trim()]
      : [];

    if (normalizedImages.length === 0) {
      return res.status(400).json({
        message: 'Debes enviar al menos una imagen en "images" o "img"'
      });
    }

    const product = await stripe.products.create({
      name: nombre,
      description: descripcion,
      images: normalizedImages,
      metadata: { 
        productDescription: descripcion,
         slug: slug }
    });

    const price = await stripe.prices.create({
      unit_amount: precio,
      currency: currency,
      product: product.id,
    });

    const nuevoProduct = await Product.create({ 
      idProd: product.id,
      priceID: price.id,
      nombre,
       precio,
        descripcion,
         images: normalizedImages,
         img: normalizedImages[0],
          currency,
           slug
    });

    if (!nuevoProduct) return res.status(400).json({ message: 'No se pudo crear el producto' });
 
    return res.status(201).json({datos: nuevoProduct })

  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al crear el producto',
      error: error.message  
    })
  }
}
  
exports.updateProductById = async (req, res) => {
    try {
            const { nombre, precio, descripcion } = req.body;
            const collarActualizado = await Product.findByIdAndUpdate(
              req.params.id, { nombre, precio, descripcion }, 
              { new: true, runValidators: true }
            );
        
            if (!collarActualizado) return res.status(404).json({ message: 'Producto no encontrado' });
        
            return res.status(200).json({ datos: collarActualizado });
          } catch (error) {
            return res.status(500).json({
              message: 'Hubo un error al actualizar el producto',
              error: error.message
            })
          }
}

exports.deleteProductById = async (req, res) => {
  try {
    const productEliminado = await Product.findByIdAndDelete(req.params.id);

    if (!productEliminado) return res.status(404).json({ message: 'Producto no encontrado' });

    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al eliminar el producto',
      error: error.message
    })
  }
}

