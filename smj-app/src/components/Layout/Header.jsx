import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
               <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
        <div className="flex items-center gap-8">
          {/* Logo - Simulado con un icono */}
          <div className="text-indigo-600">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                 <Link to="/" className="text-xl font-semibold text-dust-grey-900">
                        Señorita María Joyas
                    </Link>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          {/* Menu Desktop */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                <Link to="/" className="text-sm font-medium text-dust-grey-800 transition hover:text-dust-grey-600">
                            Inicio
                        </Link>
                        <Link to="/products" className="text-sm font-medium text-dust-grey-800 transition hover:text-dust-grey-600">
                            Tienda
                        </Link>
                  <Link to="/contacto" className="text-sm font-medium text-dust-grey-800 transition hover:text-dust-grey-600">
                    Contacto
                  </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button className="text-dust-grey-600"> <Link to="/registro" className="btn-nav-secundario">
                            Crear cuenta
                        </Link></button>
          <button className="text-dust-grey-600"> <Link to="/login" className="btn-nav">
                            Iniciar sesión
                        </Link></button>
          
          <button className="p-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-gray-400">0</span>
          </div>
        </div>
      </nav>

           
        </header>
    );
};

export default Header;