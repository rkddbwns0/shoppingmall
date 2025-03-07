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
import MyPage from './pages/mypage';
import Cart from './pages/cart';
import { UserProvider } from './components/auth/useAuth';
import OrderList from './pages/orderList';

function App() {
    return (
        <DeviceIdProvider>
            <UserProvider>
                <BrowserRouter>
                    <div className="App">
                        <Header />
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/product/:product_id" element={<Product />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/mypage" element={<MyPage />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/orderList" element={<OrderList />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </UserProvider>
        </DeviceIdProvider>
    );
}

export default App;
