import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/main.css';
import { Link } from 'react-router-dom';
import { IoMdHeart } from 'react-icons/io';

const Main = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const product_data = async () => {
            try {
                await axios
                    .get(`http://localhost:8080/product/random_product`)
                    .then((res) => {
                        const data = res.data;
                        console.log(res);
                        setProducts(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        product_data();
    }, []);

    return (
        <div className="main_container">
            <div className="main_top">
                <h1>메인페이지</h1>
            </div>
            <div className="main_middle">
                {products.map((item, index) => {
                    return (
                        <div key={index} className="main_random_products">
                            <Link to={`/product/${item.product_id}`}>
                                <div>
                                    <h4>{item.brand}</h4>
                                    <p>{item.product_name}</p>
                                    <h4>{item.price.toLocaleString()}</h4>
                                </div>
                                <div className="likeCount">
                                    <IoMdHeart />
                                    <p>{item.like_product}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Main;
