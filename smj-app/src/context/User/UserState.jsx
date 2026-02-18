import React, { useReducer } from 'react';
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
        authState: false,
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
            return;
        }
        catch (error) {
            console.error(error);
            return error.response.data.msg;
        }
    }

    const loginUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/login', form);
            const token = response.data.token;


            console.log('Respuesta del login:', response);
            
            dispatch({
                type: 'LOGIN_EXITOSO',
                payload: token
            })
            return;
        }
        catch (error) { 
            console.error(error);
            return error.response.data.msg;
        }
    }

    const verifyUser = async () => {
        const token = localStorage.getItem('token');
        if (token)  {
           axiosClient.defaults.headers.common['authorization'] = token
        } else {
            delete axiosClient.defaults.headers.common['authorization'];
        } 
        try {
            const response = await axiosClient.get('/users/verify');

            dispatch({
                type: 'OBETENER_USUARIO',
                payload: response.data.user
            })
         }
        catch (error) {
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
        
        dispatch({
            type: 'CERRAR_SESION',
        })
    }

    return (
        <UserContext.Provider value={{
            currentUser: globalState.currentUser,
            cart: globalState.cart,
            authState: globalState.authState,
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
