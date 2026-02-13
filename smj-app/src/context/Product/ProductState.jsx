import { useReducer } from "react";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";

const ProductState = (props) => {
 const initialState = {
        products: [
            {
                id: 1,
                name: 'Product 1',
                description: 'Description of Product 1',
                price: 10.99,
                image: 'https://via.placeholder.com/150'
            },
        ]

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
    }

return (
    <ProductContext.Provider value={{ 
        products: globalState.products,}}>
        {props.children}
    </ProductContext.Provider>
)
}

export default ProductState;
