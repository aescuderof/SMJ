import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import UserState from "./context/User/UserState"
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import ProductState from "./context/Product/ProductState"
import ProductList from "./components/Product/List"
import SingleProduct from "./components/Product/Single"

const Router = () => {
    return (
        <UserState>

        <ProductState>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="registro" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:slug" element={<SingleProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </ProductState> 
        </UserState>
    )
}

export default Router