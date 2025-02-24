import React, { useState } from 'react';
import '../css/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const checkDuplicate = async () => {
        try {
            await axios.post(`http://localhost:8080/user/duplicate_user`, {
                email: email,
                phone: phone,
                nickname: nickname,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const successSignup = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/user/signup`, {
                name: name,
                phone: phone,
                email: email,
                password: password,
                nickname: nickname,
            });

            alert(response.data.message);
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="contentContainer">
                <div className="titleView">
                    <h3>회원가입</h3>
                </div>
                <div className="inputContainer">
                    <div className="inputView">
                        <h4>이름</h4>
                        <input className="signupInput" value={name} onChange={(text) => setName(text.target.value)} />
                    </div>
                    <div className="inputView">
                        <h4>휴대폰 번호</h4>
                        <input
                            className="signupInput"
                            maxLength={11}
                            value={phone}
                            onChange={(text) => setPhone(text.target.value)}
                        />
                    </div>
                    <div className="inputView">
                        <h4>이메일</h4>
                        <input
                            className="signupInput"
                            maxLength={40}
                            value={email}
                            onChange={(text) => setEmail(text.target.value)}
                        />
                    </div>
                    <div className="inputView">
                        <h4>비밀번호</h4>
                        <input
                            className="signupInput"
                            type="password"
                            maxLength={20}
                            minLength={8}
                            value={password}
                            onChange={(text) => setPassword(text.target.value)}
                        />
                    </div>
                    <div className="inputView">
                        <h4>비밀번호 확인</h4>
                        <input className="signupInput" maxLength={20} minLength={8} />
                    </div>
                    <div className="inputView">
                        <h4>닉네임</h4>
                        <input
                            className="signupInput"
                            maxLength={20}
                            minLength={3}
                            value={nickname}
                            onChange={(text) => setNickname(text.target.value)}
                        />
                    </div>
                </div>
                <div className="signupBtnView">
                    <button onClick={successSignup}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
