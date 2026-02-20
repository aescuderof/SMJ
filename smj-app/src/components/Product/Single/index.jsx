import { Link, useLocation, useParams } from "react-router-dom";
import { formatCLP } from "../../../utils/formatCLP";
import UserContext from "../../../context/User/UserContext";
import ProductContext from "../../../context/Product/ProductContext";
import { useContext, useEffect, useState, useMemo } from "react";

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

  const userCtx = useContext(UserContext);
  const { authStatus, cart, editCart, getCart } = userCtx;

  const productCtx = useContext(ProductContext);
  const { products, getProducts, setCurrentProduct } = productCtx;

  // Calcular el producto de forma derivada y reactiva
  const product = useMemo(() => {
    return location?.state?.product || products.find((p) => p.slug === slug);
  }, [location?.state?.product, products, slug]);

  useEffect(() => {
    // Si no hay productos cargados, cargarlos
    if (!location?.state?.product && products.length === 0) {
      getProducts();
    }
  }, [location?.state?.product, products.length, getProducts]);

  const currentProductCtx = productCtx.currentProduct;
  useEffect(() => {
    if (
      product &&
      (
        !currentProductCtx ||
        !currentProductCtx._id ||
        product._id !== currentProductCtx._id
      )
    ) {
      setCurrentProduct(product);
    }
  }, [product, setCurrentProduct, currentProductCtx]);

  useEffect(() => {
    if (product && authStatus) {
      getCart();
    }
  }, [product, authStatus, getCart]);

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity === 0) return;

    const item = {
      priceID: product.priceID || product._id,
      name: product.nombre || product.name,
      quantity,
      price: product.precio || product.price,
      img: product.images?.[0] || product.img,
      slug: product.slug,
    };

    const existingItemIndex = cart.findIndex(
      (el) => el.priceID === item.priceID
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      // Si ya existe, actualiza la cantidad
      updatedCart = cart.map((el, i) =>
        i === existingItemIndex ? { ...el, quantity: item.quantity } : el
      );
    } else {
      // Si no existe, agrega el nuevo ítem
      updatedCart = [...cart, item];
    }

    await editCart(updatedCart);
  };

  if (!product) {
    return (
      <main className="max-w-5xl mx-auto pt-8 pb-24 px-6">
        <p className="text-center text-dust-grey-500">Cargando producto...</p>
      </main>
    );
  }
  
  const nombre = product.nombre || product.name;
  const descripcion = product.descripcion || product.description;
  const imagen = product.images?.[0] || product.img;
  const precio = product.precio || product.price;
  const quantityOptions = [0, 1, 2, 3, 4, 5];

  return (
    <main className="max-w-5xl mx-auto pt-2 pb-24 px-6">
      <nav aria-label="Breadcrumb" className="mb-4">
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
              
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-dust-grey-800 sm:text-3xl">{nombre}</h1>
          <p className="text-mt-6 text-sm leading-6 text-dust-grey-600">{descripcion}</p>
          <p className="mt-3 text-3xl tracking-tight text-dust-grey-900">
            Precio: {formatCLP(precio)}
          </p>

          {/* Select cantidad */}
          {authStatus && (
            <form onSubmit={handleSubmit} className="mt-8">
              <label className="block mb-2 font-medium text-gray-700">
                Cantidad
              </label>
              <select
                className="w-32 border border-gray-300 rounded-md p-2"
                value={quantity}
                onChange={handleChange}
              >
                {quantityOptions.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="btn-product mt-6"
                disabled={quantity === 0}
              >
                {cart.length ? "Modificar carrito" : "Agregar al carrito"}
              </button>
            </form>
          )}

          {!authStatus && (
            <Link to="/registro">
              <button className="mt-10 w-full rounded-xl bg-dust-grey-700 px-8 py-3 text-base font-semibold text-dust-grey-50 shadow-sm transition hover:bg-dust-grey-800 focus:outline-none focus:ring-2 focus:ring-dust-grey-500/40"
>
                Regístrate para comprar
              </button>
            </Link>
          )}

          {/* Accordion Items debajo del botón */}
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
        </section>

        {/* Imagen */}
        <figure>
          <img
            src={imagen}
            alt={descripcion}
            className="h-full w-full object-contain rounded-lg shadow-md"
          />
        </figure>
      </div>
    </main>
  );
};

export default SingleProduct;
