import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti';
import '../css/product.css';

const Product = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const product_detail = async () => {
            try {
                await axios
                    .get(`http://localhost:8080/product/select_product/${product_id}`)
                    .then((res) => {
                        const data = res.data;
                        console.log(data);
                        setProduct(data);
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

    const handleClickColor = () => {};

    if (!product) {
        return <div>Loding...</div>;
    }

    return (
        <div className="product_detail_container">
            <div>
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
                            <div key={index} className="circleView">
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
            </div>
            <div>
                <p>{product[0]?.product_content}</p>
            </div>
        </div>
    );
};

export default Product;
