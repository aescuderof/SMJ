import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import ProductState from "./context/Product/ProductState"

const Router = () => {
    return (
        <ProductState>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Layout />}>
                    <Route index element={<Home />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
        </ProductState> 
    )
}

export default Router