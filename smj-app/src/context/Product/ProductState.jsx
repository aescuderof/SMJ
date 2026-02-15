import { useReducer } from "react";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import axiosClient from "../../config/axiosClient";

const ProductState = (props) => {
 const initialState = {
        products: []

}

const [globalState, dispatch] = useReducer(ProductReducer, initialState);   

const getProducts = async () => {
    try {
        console.log('axiosClient baseURL:', axiosClient.defaults.baseURL);
        console.log('Haciendo petición GET a /products');
        const response = await axiosClient.get('/products');
        console.log('Respuesta completa:', response);
        console.log('Datos recibidos:', response.data);
        console.log('Productos:', response.data.products);

        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: response.data.products
        })
    } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error completo:', error.response);
    }
};

return (
    <ProductContext.Provider value={{ 
        products: globalState.products,
        getProducts}}>
        {props.children}
    </ProductContext.Provider>
)
}

export default ProductState;
