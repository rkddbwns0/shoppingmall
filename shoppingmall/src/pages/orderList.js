import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/useAuth';
import axios from 'axios';
import '../css/orderList.css';

const OrderList = () => {
    const API_URL = process.env.REACT_APP_SERVER_ADDRESS;
    const { user } = useAuth();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const userOrderList = async () => {
            try {
                const response = await axios.get(`${API_URL}/order/select`, {
                    params: { user_id: user?.user_id },
                    withCredentials: true,
                });
                const data = response.data.result;
                setOrderList(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        userOrderList();
    }, [user]);

    return (
        <div className="container">
            <div>
                <p>주문 내역</p>
            </div>
            <div className="orderListView">
                {orderList?.length > 0 ? (
                    <div>
                        {orderList.map((item, index) => (
                            <div key={index}>{item.order_state}</div>
                        ))}
                    </div>
                ) : (
                    <div className="noOrderList">
                        <p>주문한 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;
