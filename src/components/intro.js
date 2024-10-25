import React, { useEffect, useRef, useState } from 'react';
import './intro.css';

function Intro( { setIsLoading } ) {
	const wrapRef = useRef(null);
    const btnRef = useRef(null);
    const textPiecesRef = useRef([]);
    const [isIntroComplete, setIsIntroComplete] = useState(false);

	// 페이지 로딩이 끝나면, 애니메이션을 실행한다.
	useEffect(() => {
        const time = 100;
        const delay = 100;
        const arrText = [
            ["ㅇ", "오", "와", "왕"], ["ㅋ", "쿠", "쿤"], ["ㅇ", "우", "웨", "웹"], ["ㄱ", "고", "공"], ["ㅂ", "바", "방"]
        ];

        const typingText = (num) => {
            const span = textPiecesRef.current[num];
            let idx = 0;
            const timer = setInterval(() => {
                span.innerHTML = arrText[num][idx];
                idx++;
                if (idx === arrText[num].length) {
                    clearInterval(timer);
                }
            }, time);
        };

        typingText(0);
        setTimeout(() => typingText(1), time * 4 + delay * 1);
        setTimeout(() => typingText(2), time * 7 + delay * 3);
        setTimeout(() => typingText(3), time * 11 + delay * 4);
        setTimeout(() => typingText(4), time * 14 + delay * 5);
        setTimeout(() => {
            // 인트로 애니 끝 + 로딩 완료
            wrapRef.current.classList.add("is-complete");
            setIsIntroComplete(true);
        }, time * 18 + delay * 6);
    }, []);

    useEffect(() => {
        if (isIntroComplete && btnRef.current) {
            const btn = btnRef.current;
            const handleClick = () => {
                btn.classList.add("scroller")
                btn.innerHTML =''; // 버튼 텍스트 제거
                btn.classList.remove('btn-start');
                setIsLoading(true);
                // 버튼 이벤트를 제거
                btn.removeEventListener("click", handleClick);
            };
            btn.addEventListener("click", handleClick);

            return () => {
                btn.removeEventListener("click", handleClick);
            };
        }
    }, [isIntroComplete, setIsLoading]);

 	return (
		<>
		<header ref={wrapRef} className="intro">
			<div className="intro__inner">
				<h1 className="intro__title blind">왕쿤웹공방</h1>
				<div className="intro__symbol" aria-hidden="true"></div>
				<div className="intro__text intro__text--ko" aria-hidden="true">
					<span ref={(el) => textPiecesRef.current[0] = el} className="intro__text-piece1"></span>
					<span ref={(el) => textPiecesRef.current[1] = el} className="intro__text-piece1"></span>
					<span ref={(el) => textPiecesRef.current[2] = el} className="intro__text-piece2"></span>
					<span ref={(el) => textPiecesRef.current[3] = el} className="intro__text-piece2"></span>
					<span ref={(el) => textPiecesRef.current[4] = el} className="intro__text-piece2"></span>
                </div>
				<div className="intro__text intro__text--en">KOONIE's LAB 2019 (Rev.2024)</div>
                {isIntroComplete ? (
                    <button ref={btnRef} className="intro__text-loader btn-start">시작</button>
                ) : (
                    <div ref={btnRef} className="intro__text-loader">로딩중</div>
                )}
			</div>
		</header>
		</>
  	);
}

export default Intro;