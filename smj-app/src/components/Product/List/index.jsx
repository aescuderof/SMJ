import { useContext, useEffect } from "react";
import ProductContext from "../../../context/Product/ProductContext.js";
import { Link } from "react-router-dom";

const ProductList = () => {
  const ctx = useContext(ProductContext);
  const { products, getProducts, addToCart } = ctx;

  useEffect(() => {
    console.log("Llamando a getProducts...");
    getProducts();
  }, [getProducts]);

  return (
    <>

    <section className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-5">
  {products.length === 0 ? (
    <p className="col-span-full text-center text-dust-grey-500">
      No hay productos disponibles.
    </p>
  ) : (
    products.map((product) => {
      const productImage = product.images?.[0] || product.img;

      return (
        <div key={product._id} className="group flex flex-col">
          
          <div className="relative overflow-hidden rounded-2xl bg-dust-grey-50 shadow-sm ring-1 ring-dust-grey-200">
            <Link to={`/products/${product.slug}`} state={{ product }}>
              <div className="aspect-4/3 w-full bg-dust-grey-50">
                <img
                  src={productImage}
                  alt={product.descripcion}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent" />

              
              <div className="absolute bottom-3 right-3 rounded-xl bg-dust-grey-800/55 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                ${product.precio}
              </div>
            </Link>
          </div>

         
          <div className="mt-4">
            <p className="text-sm font-semibold text-dust-grey-800">
              {product.nombre}
            </p>
            
          </div>

         
          <Link
            to={`/products/${product.slug}`}
            state={{ product }}
            className="mt-4"
          >
            <button className="w-full btn-product mb-5">
              Ver collar
            </button>

            <button
                type="button"
                className="w-full btn-product-secundario mb-5"
                onClick={() => {
                  addToCart(product, 1);
                }}
              >
                Añadir al carrito
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
