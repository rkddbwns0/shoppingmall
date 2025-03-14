import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/auth/useAuth";
import axios from "axios";
import DaumPostcodeEmbed from "react-daum-postcode";
import PostCodeModal from "../components/modal/postCode";

const RegAddress = () => {
    const API_URL = process.env.REACT_APP_SERVER_ADDRESS;
    const navigate = useNavigate();
    const {user} = useAuth();
    const [name, setName] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [deliveryMsg, setDeliveryMsg] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [isOpen,setIsOpen] = useState(false);

    const onChangeOpenPost = () => {
        setIsOpen(!isOpen);
    }

    const saveAddress = async () => {
        try {
        const response = await axios.post(`${API_URL}/address/insert`, {
            user_id: user?.user_id,
            name: name,
            zip_code: zipcode,
            address: address,
            detail_addr: detailAddress,
            defaultAddress: defaultAddress,
            deliveryMsg: deliveryMsg,
        }, {withCredentials: true})
            alert('배송지가 저장되었습니다.')
            window.location.pop()
        } catch (error) {
            console.error(error)
        }
    }

    return (
            <div>
                <div>
                    <p>배송자명</p>
                    <input value={name} onChange={(text) => setName(text.target.value)} />
                </div>
                <div>
                    <p>주소</p>
                    <div>
                        <input value={zipcode}/>
                        <p>우편번호</p>
                        <button onClick={onChangeOpenPost}>우편번호 찾기</button>
                    </div>
                    <div>
                        <input value={address}/>
                        <input value={detailAddress} onChange={(text) => setDetailAddress(text.target.value)}/>
                    </div>
                </div>
                <div>
                    <p>휴대전화</p>
                    <input type={'tel'} />
                </div>
                <div>
                    <p>배송메시지</p>
                    <input type={"text"} maxLength={300} />
                </div>
                <div>
                    <p>기본 배송지로 설정</p>
                    <input type={'checkbox'} value={defaultAddress} onChange={() => setDefaultAddress(!defaultAddress)}/>
                </div>
                <div>
                    <button onClick={saveAddress}>저장하기</button>
                </div>
                <PostCodeModal
                    setAddress={setAddress}
                    setDetailAddress={setDetailAddress}
                    setZipcode={setZipcode}
                    open={isOpen}
                    close={() => setIsOpen(false)}
                />
            </div>
    )
}

export default RegAddress;