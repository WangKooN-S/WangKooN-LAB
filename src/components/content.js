import React, { useEffect, useRef, useState } from 'react';
import ContentMenu from './content_menu';
import ContentIntro from './content_intro';
import './content.css';

function Content( {themeData, isVisible} ) {
	return (
		<>
		<section className="content">
			<ContentMenu themeData={themeData} isVisible={isVisible}/>
			<ContentIntro themeData={themeData[0]}/>
			<ContentIntro themeData={themeData[1]}/>
			<ContentIntro themeData={themeData[2]}/>
		</section>
		<div className="background-area" role="presentation" aria-hidden="true" data-theme-index={isVisible}></div>
		</>
	);
}

export default Content;