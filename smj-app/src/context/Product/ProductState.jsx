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
        const response = await axiosClient.get('/products');
        console.log(response.data);

        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: response.data.products
        })
    } catch (error) {
        console.error('Error fetching products:', error);
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
