import { useContext, useEffect } from "react";
import ProductContext from "../../../context/Product/ProductContext.js";
import { Link } from "react-router-dom";

const ProductList = () => {
  const ctx = useContext(ProductContext);
  const { products, getProducts } = ctx;

  useEffect(() => {
    console.log("Llamando a getProducts...");
    getProducts();
  }, [getProducts]);

  return (
    <>

    <section className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
  {products.length === 0 ? (
    <p className="col-span-full text-center text-gray-500">
      No hay productos disponibles.
    </p>
  ) : (
    products.map((product) => {
      const productImage = product.images?.[0] || product.img;

      return (
        <div key={product._id} className="group flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <Link to={`/products/${product.slug}`} state={{ product }}>
              <div className="aspect-4/3 w-full bg-gray-100">
                <img
                  src={productImage}
                  alt={product.descripcion}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* Gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent" />

              {/* Price */}
              <div className="absolute bottom-3 right-3 rounded-xl bg-black/55 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                ${product.precio}
              </div>
            </Link>
          </div>

          {/* Info */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-900">
              {product.nombre}
            </p>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.descripcion}
            </p>
          </div>

          {/* Button */}
          <Link
            to={`/products/${product.slug}`}
            state={{ product }}
            className="mt-4"
          >
            <button className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-200">
              Ver collar
            </button>
          </Link>
        </div>
      );
    })
  )}
</section>

 
    </>
  );
};

export default ProductList;
