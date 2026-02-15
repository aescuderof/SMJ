import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import ProductState from "./context/Product/ProductState"
import ProductList from "./components/Product/List"

const Router = () => {
    return (
        <ProductState>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="registro" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="products" element={<ProductList />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
        </ProductState> 
    )
}

export default Router