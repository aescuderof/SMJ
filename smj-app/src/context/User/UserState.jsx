import React, { useEffect, useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import axiosClient from '../../config/axiosClient';

const UserState = (props) => {
    const initialState = {
        currentUser: {
            username: '',
            email: '',
            country: '',
            address: '',
            zipCode: 0,
        },

        cart: [],
        authStatus: false,
        sessionURL: null,
        globalLoading: false,
    };

    const [globalState, dispatch] = useReducer(UserReducer, initialState);

    const registerUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/register', form);
            console.log('Respuesta del registro:', response);

            dispatch({
                type: 'REGISTRO_EXITOSO',
                payload: response.data.user
            })
            return true;
        }
        catch (error) {
            console.error(error);
            return error.response?.data?.message || 'Error al registrar';
        }
    }

    const loginUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/login', form);
            const token = response.data.token;

            localStorage.setItem('token', token);
            axiosClient.defaults.headers.common['authorization'] = `Bearer ${token}`;

            console.log('Respuesta del login:', response);
            
            dispatch({
                type: 'LOGIN_EXITOSO',
                payload: token
            })
            return true;
        }
        catch (error) { 
            console.error(error);
            return error.response?.data?.message || 'Error al iniciar sesión';
        }
    }

    const verifyUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            delete axiosClient.defaults.headers.common['authorization'];
            dispatch({ type: 'CERRAR_SESION' });
            return;
        }
        
        axiosClient.defaults.headers.common['authorization'] = `Bearer ${token}`;
        
        try {
            const response = await axiosClient.get('/users/verify-user');

            dispatch({
                type: 'OBETENER_USUARIO',
                payload: response.data.user
            })
         }
        catch (error) {
           console.error('Error verificando usuario:', error);
           return;
        }   
    }

    const updateUser = async (form) => {
        const token = localStorage.getItem('token');
        
        if (token)  {
           axiosClient.defaults.headers.common['authorization'] = token
        }
        else {
            delete axiosClient.defaults.headers.common['authorization'];
        }
        await axiosClient.put('/users/update', form);
    }

    const logout = async () => {
        localStorage.removeItem('token');
        delete axiosClient.defaults.headers.common['authorization'];
        
        dispatch({
            type: 'CERRAR_SESION',
        })
    }

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <UserContext.Provider value={{
            currentUser: globalState.currentUser,
            cart: globalState.cart,
            authStatus: globalState.authStatus,
            globalLoading: globalState.globalLoading,
            sessionURL: globalState.sessionURL,
            registerUser,
            loginUser,
            verifyUser,
            updateUser,
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}   

export default UserState;
