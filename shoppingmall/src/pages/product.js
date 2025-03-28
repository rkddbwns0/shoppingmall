import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti';
import '../css/product.css';
import QuantityButton from '../components/button/quantityButton';
import { useAuth } from '../components/auth/useAuth';

const Product = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedStock, setSelectedStock] = useState(null);

    const handleInsertCart = async () => {
        if (user) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/cart/insert`,
                    {
                        user_id: user?.user_id,
                        product_id: product_id,
                        quantity: quantity,
                    },
                    { withCredentials: true }
                );
                alert('장바구니에 등록되었습니다.');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('로그인을 해 주세요.');
            navigate('/login');
        }
    };

    useEffect(() => {
        const product_detail = async () => {
            try {
                await axios
                    .get(`http://localhost:8080/product/select_product/${product_id}`)
                    .then((res) => {
                        const data = res.data;
                        setProduct(data);
                        setSelectedStock(data[0]?.stock);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        product_detail();
    }, [product_id]);

    const handleColorClick = (stock) => {
        setSelectedStock(stock);
        setQuantity(1);
    };

    const total_price = () => {
        return (product[0]?.price * quantity).toLocaleString()

    }

    if (!product) {
        return <div>Loding...</div>;
    }

    return (
        <div className="product_detail_container">
            <div>
                <p></p>
            </div>
            <div className="product_info">
                <div className="imgView">
                    <img
                        src="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/23/06/29/GM0023062999548_0_THNAIL_ORGINL_20230712173322934.jpg"
                        style={{ width: '450px', height: '500px' }}
                    />
                </div>

                <div className="product_info_view">
                    <div>
                        <h3>
                            <a>{product[0]?.brand}</a>
                        </h3>
                    </div>
                    <p>{product[0]?.product_name}</p>
                    <p>{product[0]?.price}원</p>
                    <div className="middleView">
                        <div className="scopeView">
                            <TiStarFullOutline />
                            <p>{product[0]?.review_scope}</p>
                        </div>
                        <a className="review">리뷰{product[0]?.review_count}건</a>
                    </div>

                    <div className="colorView">
                        <h4>색상</h4>
                        {product.map((item, index) => {
                            return (
                                <div key={index} className="circleView" onClick={() => handleColorClick(item.stock)}>
                                    <div
                                        id="circle"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            backgroundColor: item.color,
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <h4>사이즈</h4>
                    </div>
                    <div></div>
                    <div className="quantityView">
                        <QuantityButton
                            className={'quantityButton'}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            stock={selectedStock}
                        />

                        <div className="totalPrice">
                            <h3 style={{ fontSize: '18px' }}>{total_price()}원</h3>
                           
                        </div>
                    </div>
                    <div className="productBtnView">
                        <button className="productBtn_cart" onClick={handleInsertCart}>
                            장바구니
                        </button>
                        <button
                            className="productBtn_order"
                            onClick={() => {navigate(`/order/:${product_id}`, {state: {quantity: quantity, price: total_price()}})}}>
                            구매하기
                        </button>
                    </div>
                </div>
            </div>
            <div className="content_view">
                <p>{product[0]?.product_content}</p>
            </div>
        </div>
    );
};

export default Product;
