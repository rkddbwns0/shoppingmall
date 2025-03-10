import React from 'react';
import '../css/mypage.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/useAuth';

const MyPage = () => {
    const { user } = useAuth();
    return (
        <div className="container">
            <div>
                <h4>마이페이지</h4>
            </div>
            <div className="mypage_detail_container">
                <div className="mypage_user">
                    <p>{user?.name}님</p>
                    <Link>{'>'}</Link>
                </div>
                <div className="mypage_detail_view">
                    <ul className="mypage_detail">
                        <li>
                            <Link to="/orderList">주문내역</Link>
                        </li>
                        <li>
                            <Link to="/cart">장바구니</Link>
                        </li>
                        <li>
                            <Link>배송현황</Link>
                        </li>
                        <li>
                            <Link>리뷰</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mypage_user_info_container">
                <ul className="mypage_user_info">
                    <li>
                        <Link to="/">회원정보 관리</Link>
                    </li>
                    <li>
                        <Link>구매 내역</Link>
                    </li>
                    <li>
                        <Link>위시리스트</Link>
                    </li>
                    <li>
                        <Link to="/addressList">배송지 관리</Link>
                    </li>
                    <li>
                        <Link>문의 내역</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MyPage;
