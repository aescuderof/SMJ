import React from "react";

const products = [
  {
    id: 1,
    name: "Leather Long Wallet",
    variant: "Natural",
    price: 75,
    image: "https://via.placeholder.com/600x600",
  },
  {
    id: 2,
    name: "Machined Pencil and Pen Set",
    variant: "Black",
    price: 70,
    image: "https://via.placeholder.com/600x600",
  },
  {
    id: 3,
    name: "Mini-Sketchbooks",
    variant: "Light Brown",
    price: 27,
    image: "https://via.placeholder.com/600x600",
  },
  {
    id: 4,
    name: "Organizer Set",
    variant: "Walnut",
    price: 149,
    image: "https://via.placeholder.com/600x600",
  },
];

export default function NewArrivals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Nuevos ingresos
          </h2>

          <a
            href="#"
            className="text-indigo-600 font-medium hover:text-indigo-800 transition"
          >
            Ir a la tienda →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Image container */}
              <div className="bg-gray-200 rounded-xl overflow-hidden aspect-square mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Info */}
              <h3 className="text-base font-medium text-gray-900">
                {product.name}
              </h3>

              <p className="text-gray-500">{product.variant}</p>

              <p className="mt-2 text-gray-900 font-semibold">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
