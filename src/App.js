import React, { useEffect, useRef, useState } from 'react';
import './main.css';
import Intro from './components/intro';
import Navigation from './components/navigation';
import Content from './components/content';
import Footer from './components/footer';
import themeData from './data/theme.json';

function App() {
	const [isVisible, setIsVisible] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleScroll = () => {
		const content = document.querySelector('.content');
		const theme = document.querySelectorAll('.theme');
		const intro = document.querySelector('.intro');
		const contentMenu = document.querySelector('.content-title');
		const scrollTop = window.scrollY;
		const contentPosY = content.getBoundingClientRect().top + scrollTop;
		
		if ( scrollTop > contentPosY - window.innerHeight / 4 ) {
			intro.classList.add('hide');
			// theme[index]이 해당 스크린에 보이면 isVisible을 index로 변경
			// 마지막 theme를 지나면 isVisible을 0으로 변경
			theme.forEach((item, index) => {
					const themePosY = item.getBoundingClientRect().top + scrollTop;
					if ( scrollTop > themePosY - window.innerHeight / 2 ){
						setIsVisible(index+1);
					}
				}
			);

			const footer = document.querySelector('.footer');
			if (footer) {
				const footerPosY = footer.getBoundingClientRect().top + scrollTop;
				if (scrollTop > footerPosY - window.innerHeight / 2) {
					setIsVisible(0);
				}
			}
		}else{
			intro.classList.remove('hide');
			setIsVisible(0);
		}

		if (scrollTop > contentPosY ){
			contentMenu.classList.add('fixed');
		}else{
			contentMenu.classList.remove('fixed');
		}
	};

	useEffect(() => {
		if (isLoading) {
			window.addEventListener('scroll', handleScroll);
		}
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isLoading]);

	return (
		<main className="wrap">
		<Intro setIsLoading={setIsLoading}/>
		{isLoading ? (
			<>
			<Navigation themeData={themeData} isVisible={isVisible}/>
			<Content themeData={themeData} isVisible={isVisible}/>
			<Footer isVisible={isVisible}/>
			</>
		) : null}
		</main>
	);
}

export default App;
