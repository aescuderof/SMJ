import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function StarRow({ value = 4 }) {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i < value), [value]);
  return (
    <div className="flex items-center gap-1">
      {stars.map((filled, idx) => (
        <svg
          key={idx}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${filled ? "text-indigo-600" : "text-gray-300"}`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.366 2.447a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.447a1 1 0 00-1.176 0l-3.366 2.447c-.783.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L1.09 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <span className="text-gray-400">
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
          )}
        </span>
      </button>
      {open ? <div className="pb-6 text-sm text-gray-600">{children}</div> : null}
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { state } = useLocation();

  // 1) Use Link state immediately if available (fast)
  const [product, setProduct] = useState(state?.product ?? null);
  const [loading, setLoading] = useState(!state?.product);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // 2) Fetch by slug so refresh/share works
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        // 🔧 CHANGE THIS to your real endpoint:
        // examples:
        // `/api/products/${slug}`
        // `/api/products/slug/${slug}`
        const res = await fetch(`/api/products/${slug}`);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!ignore) setProduct(data);
      } catch {
        if (!ignore) setError("No se pudo cargar el producto.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    // Only fetch if we don't have product yet OR slug changed
    load();

    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="animate-pulse grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-7 w-2/3 rounded bg-gray-100" />
            <div className="h-7 w-1/3 rounded bg-gray-100" />
            <div className="h-4 w-1/2 rounded bg-gray-100" />
            <div className="h-24 w-full rounded bg-gray-100" />
            <div className="h-12 w-full rounded-xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-gray-600">{error || "Producto no encontrado."}</p>
        <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  // Your exact object shape fields:
  const images = (product.images?.length ? product.images : [product.img]).filter(Boolean);

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-black/5">
              <div className="aspect-square w-full">
                <img
                  src={activeImage}
                  alt={product.nombre}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={[
                    "overflow-hidden rounded-xl ring-1 transition",
                    idx === activeIndex ? "ring-indigo-600" : "ring-black/10 hover:ring-black/20",
                  ].join(" ")}
                >
                  <div className="aspect-square bg-gray-50">
                    <img src={src} alt="" className="h-full w-full object-contain" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{product.nombre}</h1>

            <p className="mt-2 text-2xl text-gray-900">
              {product.currency ? `${product.currency} ` : "$"}
              {product.precio}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <StarRow value={4} />
              <span className="text-sm text-gray-500">(rating demo)</span>
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-600">{product.descripcion}</p>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                onClick={() => console.log("Add to bag:", product.idProd, product.priceID)}
              >
                Add to bag
              </button>

              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-xl ring-1 ring-black/10 transition hover:bg-gray-50"
                aria-label="Favorite"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <div className="mt-10">
              <AccordionItem title="Features" defaultOpen>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Hecho con materiales de alta calidad</li>
                  <li>Diseño cómodo y resistente</li>
                  <li>Ideal para uso diario</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="Care">
                <p>Limpia con un paño húmedo y evita químicos abrasivos.</p>
              </AccordionItem>

              <AccordionItem title="Shipping">
                <p>Despacho estimado 2–7 días hábiles según ubicación.</p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
