import { useCallback, useReducer } from "react";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import axiosClient from "../../config/axios";
import mockProducts from "../../data/mockProducts";
import { ShelvingUnit } from "lucide-react";


const ProductState = (props) => {
 const initialState = {
        products: [],
        currentProduct: {
            _id: null,
            nombre: '',
            descripcion: '',
            precio: '',
            images: [],
            slug: '',
        }
        }



const [globalState, dispatch] = useReducer(ProductReducer, initialState);  

const setCurrentProduct = (product) => {
    dispatch({
        type: 'OBTENER_PRODUCTO',
        payload: product
    })
}

const useMockProducts = import.meta.env.VITE_USE_MOCK_PRODUCTS === 'true';

const getProducts = useCallback(async (page = 1, limit = 12) => {
    if (useMockProducts) {
        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: mockProducts
        });
        return;
    }

    try {
        const response = await axiosClient.get(`/products?page=${page}&limit=${limit}`);
        const apiProducts = response?.data?.products;
        // Puedes guardar info de paginación en el estado global si lo necesitas
        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: Array.isArray(apiProducts) ? apiProducts : mockProducts
        })
    } catch {
        dispatch({
            type: 'OBTENER_PRODUCTOS',
            payload: mockProducts
        })
    }
}, [useMockProducts]);

return (
    <ProductContext.Provider value={{
        products: globalState.products,
        currentProduct: globalState.currentProduct,
        getProducts, setCurrentProduct,
        }}>
        {props.children}
    </ProductContext.Provider>
)
}

export default ProductState;
