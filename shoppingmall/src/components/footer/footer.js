import React from 'react';
import '../../css/footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="info">
                <div>
                    <h3>무통장 입금 계좌</h3>
                    <div>
                        <p>카카오뱅크</p>
                        <p>111-1111-1111-11</p>
                        <p>예금주 : 홍길동</p>
                    </div>
                </div>
                <div>
                    <h3>고객센터</h3>
                    <div>
                        <p>영업 시간 : 09:00 ~ 17:30</p>
                        <p style={{ lineHeight: 1.5 }}>
                            영업 시간 외의 문의 사항은 문의 게시판에 작성해 주시면
                            <br />
                            빠르게 확인 후 답변드리도록 하겠습니다.
                        </p>
                        <p>1234-1234</p>
                    </div>
                </div>
                <div>
                    <h3>공지사항</h3>
                    <div>
                        <p>솰라솰라</p>
                    </div>
                </div>
            </div>
            <div className="footer_menu">
                <div>
                    <p>홈</p>
                    <p>매장안내</p>
                    <p>이용약관</p>
                    <p>개인정보처리방침</p>
                </div>
            </div>
            <div className="footer_address">
                <div>
                    <div>
                        <p>주소 : 어딘가에 있습니다</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
