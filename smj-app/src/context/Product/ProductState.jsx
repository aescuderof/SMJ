import { useCallback, useMemo, useReducer } from "react";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import axiosClient from "../../config/axiosClient";
import mockProducts from "../../data/mockProducts";

const ProductState = (props) => {
 const initialState = {
        products: []

}

const [globalState, dispatch] = useReducer(ProductReducer, initialState);  

const useMockProducts = import.meta.env.VITE_USE_MOCK_PRODUCTS === 'true';

const getProducts = useCallback(async () => {
    if (useMockProducts) {
        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: mockProducts
        });
        return;
    }

    try {
        console.log('axiosClient baseURL:', axiosClient.defaults.baseURL);
        console.log('Haciendo petición GET a /products');
        const response = await axiosClient.get('/products');
        console.log('Respuesta completa:', response);
        console.log('Datos recibidos:', response.data);
        console.log('Productos:', response.data.products);

        const apiProducts = response?.data?.products;

        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: Array.isArray(apiProducts) ? apiProducts : mockProducts
        })
    } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error completo:', error.response);

        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: mockProducts
        })
    }
}, [useMockProducts]);

const providerValue = useMemo(() => ({
    products: globalState.products,
    getProducts
}), [globalState.products, getProducts]);

return (
    <ProductContext.Provider value={providerValue}>
        {props.children}
    </ProductContext.Provider>
)
}

export default ProductState;
