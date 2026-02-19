import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import UserState from "./context/User/UserState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProductState from "./context/Product/ProductState";
import ProductList from "./components/Product/List";
import SingleProduct from "./components/Product/Single";
import Contact from "./components/Contact";
import CartState from "./context/Cart/CartState";
import AuthRoute from "./routes/Auth";
import { Component } from "react";  

const Router = () => {
    return (
        <UserState>

        <ProductState>
        <CartState>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="registro" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="contacto" element={<Contact />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:slug" element={<SingleProduct />} />

                    <Route
                path="/iniciar-sesion"
                element={<AuthRoute component={Login} />}
              />
              

                </Route>
            </Routes>
        </BrowserRouter>
        </CartState>
        </ProductState> 
        </UserState>
    )
}

export default Router