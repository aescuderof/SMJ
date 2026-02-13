import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import { useReducer } from 'react';

const ProductState = (props) => {
 const initialState = {
        products: [
            {
                id: 1,
                name: 'Product de prueba 1',
                description: 'Description del producto',
                price: 10.99,
                image: 'https://via.placeholder.com/150'
            },
        ]

}

const [globalState, dispatch] = useReducer(ProductReducer, initialState);

return (
    <ProductContext.Provider value={{ 
        products: globalState.products }}>
        {props.children}
    </ProductContext.Provider>
)
}

export default ProductState;
