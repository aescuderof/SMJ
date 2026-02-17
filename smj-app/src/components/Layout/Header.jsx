import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <header className="relative z-50 bg-dust-grey-50">
               <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-xl font-semibold text-dust-grey-900">
            
            <span>Señorita María Joyas</span>
          </Link>
          {/* Menu Desktop */}
          <div className="hidden md:flex gap-6 text-sm font-regular text-gray-600">
                <Link to="/" className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500">
                            Inicio
                        </Link>
                        <Link to="/products" className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500">
                            Tienda
                        </Link>
                  <Link to="/contacto" className="text-lg font-light text-dust-grey-700 transition hover:text-dust-grey-500">
                    Contacto
                  </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/registro" className="btn-nav-secundario">
            Crear cuenta
          </Link>
          <Link to="/login" className="btn-nav">
            Iniciar sesión
          </Link>
          
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