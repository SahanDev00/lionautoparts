import Navbar from "./components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer from "./components/shared/Footer";
import Store from "./pages/store/Store";
import BrandProducts from "./components/store/BrandProducts";
import SearchProducts from "./components/store/SearchProducts";
import About from "./pages/about/About";
import Contact from "./pages/Contact/Contact";
import SignUpPage from "./pages/Account/SignUpPage";
import LoginPage from "./pages/Account/LoginPage";
import MyAccountPage from "./pages/Account/MyAccountPage";
import CartIndex from "./components/Cart/CartIndex";
import { ToastContainer } from "react-toastify";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import ProductView from "./components/store/ProductView";
import Checkout from "./components/Cart/Checkout";
import SearchQueryProducts from "./components/store/SearchQueryProducts";
import CategoryProducts from "./components/store/CategoryProducts";

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/brands/:BrandID" element={<BrandProducts />} />
            <Route path="/search/:ModelID/:BrandID/:YearID/:query" element={<SearchProducts />} />
            <Route path="/search/:q" element={<SearchQueryProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<MyAccountPage />} />
            <Route path="/cart" element={<CartIndex />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:orderID" element={<OrderDetails />} />
            <Route path="/items/:itemID" element={<ProductView />} />
            <Route path="/items/categories/:CategoryID" element={<CategoryProducts />} />
          </Routes>
          <Footer />
        </Router>
      </ParallaxProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
