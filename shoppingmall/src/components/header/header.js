import React from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <h2>
                <Link to="/">종합쇼핑몰</Link>
            </h2>
            <ul>
                <li>상의</li>
                <li>하의</li>
                <li>신발</li>
            </ul>
            <div className="loginTab">
                <p>
                    <a>로그인</a>
                </p>
            </div>
        </div>
    );
};

export default Header;
