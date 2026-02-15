import { useContext, useEffect } from "react";
import ProductContext from "../../../context/Product/ProductContext.js";
import { Link } from "react-router-dom";

const ProductList = () => {
    const ctx = useContext(ProductContext);
    const { products, getProducts } = ctx;

    useEffect(() => {
        console.log('Llamando a getProducts...');
        getProducts();
    }, []);
    
    
    
    return (
        <>
            <section className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 gap-y-4 gap-x-12 sm:gap-y-12 lg:grid-cols-2 flex-column">
                {products.length === 0 ? (
                    <p className="text-center text-gray-500">No hay productos disponibles.</p>
                ) : (
                    products.map(product => {
                        return (
                            <div key={product._id} className="border flex flex-col">
                                
                                <div className="bg-gray-200">
                                    <Link to={`/products/${product.slug}`} state={{ product }}>
                                     <img 
                                     src={product.img}
                                     alt={product.descripcion} 
                                     className="w-full h-96 object-center object-cover"
                                     />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
        </>
    );
}

export default ProductList;