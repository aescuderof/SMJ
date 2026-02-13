import React from "react";
import ProductContext from "./ProductContext";

const ProductReducer = (globalState, action) => {
    switch (action.type) {
        case 'ACTUALIZAR_PRODUCTOS':
           break;

           case 'AGREGAR_PRODUCTO':
            break;

            case 'ELIMINAR_PRODUCTO':

            break;

        default:
            return globalState;
    }

}

export default ProductReducer;