import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

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

    if (!product) {
        return <div>Loding...</div>;
    }

    return (
        <div>
            <div>
                <h3>상품 정보</h3>
            </div>
            <div>
                <p>{product.product_name}</p>
                <div
                    id="circle"
                    style={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: product.color,
                    }}
                ></div>
                <p>{product.price}원</p>
            </div>
            <div>
                <p>{product.product_content}</p>
            </div>
        </div>
    );
};

export default Product;
