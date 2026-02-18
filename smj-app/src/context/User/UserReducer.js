const UserReducer = (globaState, action) => {
  switch (key) {
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
	default:
	  return globaState;
  }
};

export default UserReducer;