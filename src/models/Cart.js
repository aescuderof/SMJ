const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        products: [
            {
                quantity: { type: Number, required: true },
                priceID: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                image: { type: String, required: true },
                slug: { type: String, required: true },
            },
        ],
        userID: { type: String, required: true },
}
)

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
