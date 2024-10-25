import React, { useEffect, useRef, useState } from 'react';
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

	return (
		<>
		<nav className="navigation" ref={navRef}>
			<ul className="navigation__list">

			</ul>
		</nav>
		</>
	);
}

export default Navigation;