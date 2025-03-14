import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/useAuth';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import '../css/addressList.css'

const AddressList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_SERVER_ADDRESS;
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        const userAddressList = async () => {
            try {
                const response = await axios.get(`${API_URL}/address/select`, {
                    params: { user_id: user?.user_id },
                    withCredentials: true,
                });
                const data = response.data;
                console.log(data)
                setAddressList(data);
            } catch (error) {
                console.error(error);
            }
        };
        userAddressList();
    }, []);

    return (
        <div className="container">
            <div className='mainContainer'>
                <div className="topView">
                    <div className='title'>
                        <p>배송지 목록</p>
                    </div>
                    <div className='addBtnView'>
                        <button onClick={() => navigate('/regAddress')}>+ 배송지 추가하기</button>
                    </div>
                </div>
                <div>
                    {addressList?.length > 0 ? (
                        <div className="adressContainer">
                            {addressList.map((item, index) => (
                                <div key={index} className="addressView">
                                        <div className='user_info'>
                                            <p>배송자명: {item.name}</p>
                                        </div>
                                        <div className='address_info'>
                                            <p>우편번호 : {item.zip_code}</p>
                                            <p>주소 : {item.address}</p>
                                            <p>상세 주소 : {item.detail_addr}</p>
                                        </div>
                                        {item.default_addr === 'Y' ? (
                                            <p>기본배송지</p>
                                        ): null}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h4>현재 저장된 배송지가 없습니다</h4>
                            <p>배송지를 추가해 주세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressList;
