import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/auth/useAuth';
import { useDeviceId } from '../components/auth/deviceContext';

const Login = () => {
    const navigate = useNavigate();
    const deviceId = useDeviceId();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [saveId, setSaveId] = useState(false);

    const login = async () => {
        try {
            if (!email || !password) {
                alert('아이디 혹은 비밀번호를 입력해 주세요.');
                return;
            }
            const response = await axios.post(
                `http://localhost:8080/user/login`,
                { email: email, password: password },
                { withCredentials: true, headers: { 'device-id': deviceId } }
            );

            window.location.replace('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginTitle">
                <h2>로그인</h2>
            </div>
            <div className="loginInputContainer">
                <div>
                    <div className="loginInputView">
                        <input
                            className="loginInput"
                            placeholder="이메일"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(text) => setEmail(text.target.value)}
                        />
                        <input
                            className="loginInput"
                            placeholder="비밀번호"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(text) => setPassword(text.target.value)}
                        />
                    </div>
                </div>
                <div className="loginBtnView">
                    <button className="loginBtn" onClick={login}>
                        로그인
                    </button>
                </div>
            </div>
            <div className="saveIdView">
                <input className="saveIdBox" type="checkbox" />
                <p>아이디 저장</p>
            </div>
            <div className="infoContainer">
                <div className="infoView">
                    <button>아이디 찾기</button>
                    <button>비밀번호 찾기</button>
                    <button onClick={() => navigate('/signup')}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
