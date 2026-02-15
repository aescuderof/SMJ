import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header className="bg-green-800">
            <nav className="flex justify-between items-center mx-8 py-4">
                <ul className="flex items-center space-x-4">
                    <li className="hidden ml-10 text-neutral-50 md:block">
                        <Link to="/products" className="font-medium">Menu</Link>
                    </li>
                </ul>

                <section className="flex items-center justify-end">
                    <Link to="/registro" className="btn-nav">
                    Crear cuenta
                    </Link>
                    <Link to="/login" className="btn-nav">
                    Iniciar sesión
                    </Link>
                </section>
                 
                  
            </nav>

            </header>
      
    );
};

export default Header;