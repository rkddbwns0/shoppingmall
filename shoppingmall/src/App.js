import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Main from './pages/main';
import Footer from './components/footer/footer';
import Product from './pages/product';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/product/:product_id" element={<Product />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
