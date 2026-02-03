import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import AuthPage from "./pages/AuthPage";
import { useLocation } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
const App = () => {
	const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
		<Route path="/signup" element={<AuthPage />} />
        {/* <Route path="/products" element={<ProductList />} /> */}
		<Route path="/products" element={<ProductsPage />} />
		<Route path="/products/:id" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
