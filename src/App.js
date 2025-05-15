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

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/store" index element={<Store />} />
            <Route path="/brands/:BrandID" index element={<BrandProducts />} />
            <Route path="/search/:ModelID/:BrandID/:YearID" index element={<SearchProducts />} />
            <Route path="/about" index element={<About />} />
            <Route path="/contact" index element={<Contact />} />
            <Route path="/sign-up" index element={<SignUpPage />} />
            <Route path="/login" index element={<LoginPage />} />
            <Route path="/account" index element={<MyAccountPage />} />
            <Route path="/cart" index element={<CartIndex />} />
            <Route path="/checkout" index element={<Checkout />} />
            <Route path="/orders" index element={<MyOrders />} />
            <Route path="/orders/:orderID" index element={<OrderDetails />} />
            <Route path="/items/:itemID" index element={<ProductView />} />
          </Routes>
          <Footer />
        </Router>
      </ParallaxProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
