import React from 'react';
import '../../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci';
import useAuth from '../auth/useAuth';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleMyPage = () => {
        if (!user) {
            navigate('/login');
        }
    };

    return (
        <header className="header">
            <div className="top-area">
                <div className="inner">
                    <div>
                        <a onClick={handleMyPage}>
                            <p>마이페이지</p>
                        </a>
                    </div>
                    <div className="loginTab">
                        {user ? (
                            <div className="loginUserTab">
                                <a onClick={logout}>
                                    <p>로그아웃</p>
                                </a>
                                <p>{user.name}님 환영합니다!</p>
                            </div>
                        ) : (
                            <Link to="/login">
                                <p>로그인</p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="main-area">
                <div className="main-column">
                    <div className="main-title">
                        <h2>
                            <Link to="/">종합쇼핑몰</Link>
                        </h2>
                    </div>
                    <div className="main-icon-view">
                        <div className="main-icon-column">
                            <CiSearch className="icon" />
                            <CiHeart className="icon" />
                            <CiShoppingCart className="icon" />
                        </div>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>상의</li>
                        <li>하의</li>
                        <li>신발</li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
