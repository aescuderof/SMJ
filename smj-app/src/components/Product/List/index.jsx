import { useContext } from "react";
import ProductContext from "../../../context/Product/ProductContext.js";

const ProductList = () => {
    const ctx = useContext(ProductContext);
    const { products } = ctx;
    return (
        <div>
            <h1>Product List</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <img src={product.image} alt={product.name} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;