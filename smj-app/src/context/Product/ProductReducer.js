import React from "react";
import ProductContext from "./ProductContext";

const ProductReducer = (globalState, action) => {
    console.log('ProductReducer - Estado actual:', globalState);
    console.log('ProductReducer - Action:', action);
    
    switch (action.type) {
        case 'OBTENER_PRODUCTOS': {
            const newState = {
                ...globalState,
                products: action.payload
            };
            console.log('ProductReducer - Nuevo estado:', newState);
            return newState;
        }

       

        default:
            return globalState;
    }

}

export default ProductReducer;