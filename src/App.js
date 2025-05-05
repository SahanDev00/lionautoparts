import Navbar from "./components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </ParallaxProvider>
    </div>
  );
}

export default App;
