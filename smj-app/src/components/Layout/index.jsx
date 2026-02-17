import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
       <div className="flex flex-col h-screen justify-between">
            <Header />
            <main className="mb-auto pt-24"> 
                <Outlet />
            </main>
            <Footer />
       </div>
    );
};

export default Layout;

