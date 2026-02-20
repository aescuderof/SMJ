import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { formatCLP } from "../../../utils/formatCLP";
import CartContext from "../../../context/Cart/CartContext";
import ProductContext from "../../../context/Product/ProductContext";

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-dust-grey-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-dust-grey-900">{title}</span>
        <span className="text-dust-grey-400">
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
          )}
        </span>
      </button>

      {open ? <div className="pb-6 text-sm text-dust-grey-600">{children}</div> : null}
    </div>
  );
}

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { slug } = useParams();
  const { product: stateProduct } = location.state || {};
  const { products, getProducts } = useContext(ProductContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useContext(CartContext);
  const product = stateProduct || products.find((item) => item.slug === slug);

  useEffect(() => {
    if (!stateProduct && products.length === 0) {
      getProducts();
    }
  }, [stateProduct, products.length, getProducts]);

  if (!product) {
    const statusMessage = products.length === 0 ? "Cargando producto..." : "Producto no encontrado";

    return (
      <main>
        <div className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-center text-dust-grey-500">{statusMessage}</p>
          <Link to="/products" className="mt-4 block text-center text-dust-grey-700 hover:underline">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  const images = (product.images?.length ? product.images : [product.img]).filter(Boolean);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <main className="bg-dust-grey-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Optional breadcrumb (simple + dynamic) */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/products" className="font-medium text-dust-grey-900 hover:text-dust-grey-700">
              Tienda
              </Link>
            </li>
            <li className="text-dust-grey-300">/</li>
            <li className="font-medium text-dust-grey-500">{product.nombre}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* LEFT: main image + thumbnails */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-dust-grey-100 ring-1 ring-dust-grey-200">
              <div className="aspect-square w-full">
                <img
                  src={activeImage}
                  alt={product.nombre}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((src, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={[
                      "overflow-hidden rounded-xl ring-1 transition",
                      active ? "ring-dust-grey-700" : "ring-dust-grey-200 hover:ring-dust-grey-300",
                    ].join(" ")}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <div className="aspect-square bg-dust-grey-100">
                      <img src={src} alt="" className="h-full w-full object-contain" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: title, price, rating, description, CTA */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-dust-grey-900 sm:text-3xl">
              {product.nombre}
            </h1>

            <p className="mt-3 text-3xl tracking-tight text-dust-grey-900">
              { new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'CLP',
              }
              ).format(product.precio)},
              
            </p>

            <p className="mt-6 text-sm leading-6 text-dust-grey-600">{product.descripcion}</p>

            
           

            {/* CTA row */}
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                className="w-full rounded-xl bg-dust-grey-700 px-8 py-3 text-base font-semibold text-dust-grey-50 shadow-sm transition hover:bg-dust-grey-800 focus:outline-none focus:ring-2 focus:ring-dust-grey-500/40"
                onClick={() => {
                  addToCart(product, 1);
                }}
              >
                Añadir al carrito
              </button>

              
            </div>

           
            <div className="mt-10">
              <AccordionItem title="Detalles" defaultOpen>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Piedras naturales</li>
                  <li>Broches & cierres de bronce bañado en oro o plata</li>
                  <li>Hechos a mano</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="Cuidados">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Evita el agua, quítatelo antes de nadar, ducharte o hacer deporte.</li>
                  <li>Guárdalos lejos de la luz solar, la exposición prolongada al sol puede desteñirlas.</li>
                  <li>No apliques perfumes o productos de cuidado personal sobre tus accesorios.</li>
                  <li><span className="font-bold">Tip extra: </span>Si estás pensando en limpiar tus joyas o accesorios, recuerda usar siempre un paño seco y suave para no rayar el material.</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="Envío">
                <p>Despacho estimado 2–7 días hábiles.</p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
