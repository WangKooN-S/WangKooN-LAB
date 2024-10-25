import React from 'react';

function ContentMenu( {themeData, isVisible} ) {
	return (
		<>
		<section className="content-title" aria-label="Main Title" data-theme-index={isVisible}>
            <div className="content__inner">
                <div className="content__symbol" role="presentation" aria-hidden="true"></div>
                <ul className="content__group--ko">
                    {themeData.map((theme, index) => {
                        return (
                            <li key={index} className="content__title--ko">
                                {theme.title}
                            </li>
                        );
                    })}
                </ul>
                <ul className="content__group--en">
                    {themeData.map((theme, index) => {
                        return (
                            <li key={index} className="content__title--en">
                                {theme.titleEn}
                            </li>
                        );
                    })}
                </ul>
            </div>
		</section>		
		</>
	);
}

export default ContentMenu;