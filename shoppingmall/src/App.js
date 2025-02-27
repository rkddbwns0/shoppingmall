import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/app.css';
import Header from './components/header/header';
import Main from './pages/main';
import Footer from './components/footer/footer';
import Product from './pages/product';
import Login from './pages/login';
import Signup from './pages/signup';
import { DeviceIdProvider } from './components/auth/deviceContext';

function App() {
    return (
        <DeviceIdProvider>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/product/:product_id" element={<Product />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </DeviceIdProvider>
    );
}

export default App;
