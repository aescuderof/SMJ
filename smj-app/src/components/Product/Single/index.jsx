import { useLocation } from 'react-router-dom';

const SingleProduct = () => {
    const location = useLocation();
    const { product } = location.state || {};
    
    if (!product) {
        return (
            <main>
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-gray-500">Producto no encontrado</p>
                </div>
            </main>
        );
    }
    
    return (
        <main>
            <section>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{product.nombre}</h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <img src={product.img} alt={product.nombre} className="w-full" />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-lg text-gray-700 mb-4">{product.descripcion}</p>
                            <p className="text-2xl font-bold text-green-800 mb-4">
                                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: product.currency }).format(product.precio)}
                                </p>
                            
                            <button className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SingleProduct;
