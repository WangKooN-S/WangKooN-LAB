import React, { useEffect, useRef } from 'react';
import './footer.css';

function Footer( { isVisible } ) {
    const footerRef = useRef(null);

    // 푸터 활성화, 비활성화
    useEffect(() => {
        const footer = footerRef.current;
        if (isVisible !== 0) {
            footer.classList.add('hide');
        } else {
            footer.classList.remove('hide');
        }
    }, [isVisible]);

    // 맨위로 버튼 클릭 이벤트
    useEffect(() => {
        const btnTop = footerRef.current.querySelector('.footer__btn-top');
        const handleClick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        btnTop.addEventListener('click', handleClick);

        return () => {
            btnTop.removeEventListener('click', handleClick);
        };
    }, []);

	return (
		<>
		<footer className="footer" id="footer" ref={footerRef}>
            <div className="footer__inner">
                <div className="content__symbol" role="presentation" aria-hidden="true"></div>
                <div className="content__group--ko">
                    <div className="content__title--ko">감사합니다</div>
                </div>
                <div className="content__group--en">
                    <div className="content__title--en">Thank You</div>
                </div>
                <button className="footer__btn-top" aria-label="맨 위로 이동">TOP</button>
            </div>
		</footer>
		</>
	);
}

export default Footer;