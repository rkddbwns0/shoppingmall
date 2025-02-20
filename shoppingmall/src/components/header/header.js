import React from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';
import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci';

const Header = () => {
    return (
        <header className="header">
            <div className="top-area">
                <div className="inner">
                    <div className="loginTab">
                        <p>
                            <a>로그인</a>
                        </p>
                    </div>
                    <div>
                        <p>마이페이지</p>
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
