import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { data, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            await axios
                .post(`http://localhost:8080/user/login`, {
                    data: {
                        id: id,
                        password: password,
                    },
                })
                .then((res) => {
                    if (res) {
                        navigate('/');
                    }
                });
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
                        <input className="loginInput" placeholder="아이디" id="id" name="id" />
                        <input
                            className="loginInput"
                            placeholder="비밀번호"
                            id="password"
                            name="password"
                            type="password"
                        />
                    </div>
                </div>
                <div className="loginBtnView">
                    <button className="loginBtn">로그인</button>
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
