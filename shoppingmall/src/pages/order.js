import React, {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../components/auth/useAuth";
import axios from "axios";

const Order = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = process.env.REACT_APP_SERVER_ADDRESS;
    const {user} = useAuth()
    const {product_id} = useParams();
    const quantity = location?.state.quantity;
    const price = location?.state.price
    const product = location?.state.product;

    useEffect(() => {
        console.log(quantity)
        console.log(product)
    }, [])

    const product_order = async () => {
        try {
            const response = await axios.post(`${API_URL}/order/insert`, {
                user_id: user?.user_id,
                product_no: product_id
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div>주문하기</div>
            <p>{quantity}</p>
            <p>{price}</p>
        </div>
    )
}

export default Order;