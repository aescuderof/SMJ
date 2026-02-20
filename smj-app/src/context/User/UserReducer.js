const UserReducer = (globaState, action) => {
  switch (action.type) {
    case 'REGISTRO_EXITOSO':
      return {
        ...globaState,
        mensaje: 'Usuario registrado exitosamente',
      }

      case 'LOGIN_EXITOSO':
        localStorage.setItem('token', action.payload);
        return {
          ...globaState,
          authStatus: true,
          
        }

      case 'OBTENER_USUARIO':
        return {
          ...globaState,
          currentUser: action.payload,
          authStatus: true,
        }

      case 'CERRAR_SESION':
        return {
          ...globaState,
          currentUser: {
            username: '',
            email: '',
            country: '',
            address: '',
            zipCode: 0,
          },
          authStatus: false,
        }

        case 'CHANGE_STATUS_LOADING':
          return {
            ...globaState,
            globalLoading: action.dispatch,
          }

          case "GET_CHECKOUT_SESSION":
            return {
              ...globaState,
              sessionURL: action.payload,
            }

            case "GET_CART":
              return {
                ...globaState,
                cart: action.payload,
              } 

	default:
	  return globaState;
  }
};

export default UserReducer;