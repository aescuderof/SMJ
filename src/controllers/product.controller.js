const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_KEY);


exports.getAllProducts = async (req, res) => {
      try {
    const products = await Product.find({});
    return res.status(200).json({ products })
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error al obtener los productos',
      error: error.message
    })
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, img, currency, slug } = req.body;
    const product = await stripe.products.create({
      name: nombre,
      description: descripcion,
      images: [img],
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
      priceID: stripePrice.id,
      nombre,
       precio,
        descripcion,
         img,
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

