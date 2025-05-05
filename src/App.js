import Navbar from "./components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer from "./components/shared/Footer";
import Store from "./pages/store/Store";
import BrandProducts from "./components/store/BrandProducts";
import SearchProducts from "./components/store/SearchProducts";

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
          </Routes>
          <Footer />
        </Router>
      </ParallaxProvider>
    </div>
  );
}

export default App;
