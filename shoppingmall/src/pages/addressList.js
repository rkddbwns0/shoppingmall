import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/useAuth';
import axios from 'axios';

const AddressList = () => {
    const { user } = useAuth();
    const API_URL = process.env.REACT_APP_SERVER_ADDRESS;
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        const userAddressList = async () => {
            try {
                const response = await axios.get(`${API_URL}/address/select`, {
                    params: { user_id: user?.user_id },
                    withCredentials: true,
                });
                const data = response.data.result;
                setAddressList(data);
            } catch (error) {
                console.error(error);
            }
        };
        userAddressList();
    }, []);

    return (
        <div>
            <div>
                <p>배송지 관리</p>
            </div>
            <div>
                <div>
                    <button>배송지 추가하기</button>
                </div>
            </div>
            <div>
                {addressList?.length > 0 ? (
                    <div>
                        {addressList.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <p>{item.zip_code}</p>
                                </div>
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
    );
};

export default AddressList;
