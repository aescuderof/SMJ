import { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../context/User/UserContext";

export default function Header() {
  const {
    currentUser,
    cart,
    authStatus,
    verifyUser,
    logout,
    getCart,
    setLoading,
  } = useContext(UserContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    verifyUser();
    getCart();
    setLoading(false);
  }, [getCart, setLoading, verifyUser]);

  useEffect(() => {
    getCart();
  }, [currentUser, getCart]);

  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(totalItems);
  }, [cart]);

  return (
    <header className="relative z-50 bg-dust-grey-50">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
        <ul className="flex items-center gap-8">
          <li className="ml-10 flex items-center gap-3 text-xl font-semibold text-dust-grey-900">
            <Link to="/" className="font-medium">
              <span>Señorita María Joyas</span>
            </Link>
            <Link
              to="/"
              className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500"
            >
              Tienda
            </Link>
            <Link
              to="/contacto"
              className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500"
            >
              Contacto
            </Link>
          </li>
        </ul>

        <section className="flex items-center justify-end gap-4">
          {authStatus ? (
            <>
              <Link to="/perfil" className="px-6 py-3 h-12 min-w-20 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="#A3A3A3"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.313 3.134-6 8-6s8 2.687 8 6" />
                </svg>
                Perfil
              </Link>

              <Link to="/carrito" className="px-6 py-3 h-12 min-w-20 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="#A3A3A3"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 7V6a6 6 0 1 1 12 0v1" />
                  <rect x="4" y="7" width="16" height="13" rx="2" />
                  <path d="M9 11v2m6-2v2" />
                </svg>
                <span className="btn-cart-quantity">{total}</span>
              </Link>

              <Link to="/" className=" px-6 py-3 h-12 min-w-20 flex items-center gap-2" onClick={logout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                Salir
              </Link>
            </>
          ) : (
            <>
              <Link to="/registro" className="btn-nav-secundario px-6 py-3 h-12 min-w-20 flex items-center gap-2">
                Crear cuenta
              </Link>
              <Link to="/login" className="btn-nav px-6 py-3 h-12 min-w-20 flex items-center gap-2">
                Iniciar sesión
              </Link>
            </>
          )}
        </section>
      </nav>
    </header>
  );
}
