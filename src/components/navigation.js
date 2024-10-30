import React, { useEffect, useRef } from 'react';
import './navigation.css';

function Navigation( {themeData, isVisible} ) {
	const navRef = useRef(null);
	
	// isVisible 상태에 따라 활성/비활성
	useEffect(() => {
		const nav = navRef.current;
		if (nav) {
			if (isVisible !== 0) {
				nav.classList.remove('hide');
			} else {
				nav.classList.add('hide');
			}
		}
	}, [isVisible]);

	// 버튼 클릭 시 스크롤 이동
	const handleButtonClick = (index) => {
		const scrollTop = window.scrollY;
		const themeInner = document.querySelectorAll('.theme__inner')[index];
		if (themeInner) {
			window.scrollTo({
				top: themeInner.getBoundingClientRect().top + scrollTop - 60,
				behavior: 'smooth'
			});
		}
	};

	let globalIndex = 0;

	return (
		<>
		<nav className="navigation" ref={navRef}>
			<ul className="navigation__list">
				{ themeData.map((theme, themeIndex) => (					
					theme.content.map((content, contentIndex) => {
						const combinedIndex = globalIndex++;
						return (
						<li key={contentIndex} className="navigation__item">
							<button className="navigation__button" onClick={() => handleButtonClick(combinedIndex)}>
								<span className="sr-only">{content.title}</span>
							</button>
						</li>
						)
					})					
				))}
			</ul>
		</nav>
		</>
	);
}

export default Navigation;