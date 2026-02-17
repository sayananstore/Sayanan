import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import AuthPage from "./pages/AuthPage";
import { useLocation } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import WishList from "./pages/WishList";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage"; 
import "./App.css"

const App = () => {
	const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
    <>
	<div className="app">	
	<CartProvider>
	<WishlistProvider>
      {!hideNavbar && <Navbar />}
	  <main className="page-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
		<Route path="/signup" element={<AuthPage />} />
        {/* <Route path="/products" element={<ProductList />} /> */}
		<Route path="/products" element={<ProductsPage />} />
		<Route path="/products/:id" element={<ProductDetail />} />
		<Route path="/wishlist" element={<WishList />} />
		<Route path="/cart" element={<CartPage />} />
      </Routes>
	  </main>
	</WishlistProvider>
	</CartProvider>
      <Footer />
	</div>

    </>
  );
};

export default App;
