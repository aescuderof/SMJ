import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="fixed top-0 z-20 w-full border-b border-dust-grey-200 bg-dust-grey-50/95 backdrop-blur">
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
                    <Link to="/" className="text-xl font-semibold text-dust-grey-900">
                        Señorita María Joyas
                    </Link>

                    <div className="hidden items-center gap-6 md:flex">
                        <Link to="/" className="text-sm font-medium text-dust-grey-800 transition hover:text-dust-grey-600">
                            Home
                        </Link>
                        <Link to="/products" className="text-sm font-medium text-dust-grey-800 transition hover:text-dust-grey-600">
                            Tienda
                        </Link>
                        <span className="text-sm font-medium text-dust-grey-800">Contacto</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/registro" className="btn-nav">
                            Crear cuenta
                        </Link>
                        <Link to="/login" className="btn-nav">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;