import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/auth/useAuth';
import '../css/cart.css';
import QuantityButton from '../components/button/quantityButton';

const Cart = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedStock, setSelectedStock] = useState(null);

    const deleteCart = async (cart_id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/cart/delete`, {
                data: {
                    user_id: user?.user_id,
                    cart_id: cart_id
            }, withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const userCart = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cart/select`, {
                    params: { user_id: user?.user_id },
                    withCredentials: true,
                });
                const data = response.data.result.result;
                setCart(data);
            } catch (error) {
                console.error(error);
            }
        };
        userCart();
    }, []);

    return (
        <div className="container">
            <div>
                <p>장바구니</p>
            </div>
            <div className="cartListView">
                {cart?.length > 0 ? (
                    <div>
                        {cart.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div className="chkbox_name_view">
                                        <input type={'checkbox'} />
                                        <p>{item.product_id.product_name}</p>
                                        <button onClick={() => {deleteCart(item.cart_id)}}>X</button>
                                    </div>
                                    <p className="price">{(item.product_id.price * quantity).toLocaleString()}원</p>
                                    <div className="qtt_buy_view">
                                        <QuantityButton
                                            className={'quantityButton'}
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            stock={item.product_id.stock}
                                        />
                                        <button>구매하기</button>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>장바구니 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
