import React from 'react';

function ContentHobby( {themeData} ) {
    // console.log(themeData);
	return (
		<>
		<section id={themeData.type} className={`theme theme-${themeData.type}`} data-theme-index={themeData.idx}>
            <h2 className="sr-only">{themeData.title}</h2>
                {themeData.type === 'hobby' ? (
                    themeData.content.map((content, index) => (
                        <div key={index} className="theme__inner">
                            <header className="theme__header">
                                <h3 className="theme__title">{content.title}</h3>
                                <p className="theme__description">{content.description}</p>
                            </header>
                            <div className="hobby theme__content">
                                <div className="hobby__list">
                                    <h4 className="hobby__list--title">테마</h4>
                                    <ul className="hobby__list--content">
                                        {content.theme.map((item, index) => (
                                            <li key={index} className="hobby__list--item">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                { content.photos ? (
                                    <div className="hobby__photos">
                                        <h4 className="hobby__photos--title">이미지</h4>
                                        <ul className="hobby__photos--content">
                                            {content.photos.map((item, index) => (
                                                <li key={index} className="hobby__photos--item">
                                                    <img src={require(`../images/${item.image}`)} alt={item.description} />
                                                    <p className="hobby__photos--description">{item.title}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null }

                                { content.link ? (
                                    <a href={content.link.url} target="_blank" rel="noreferrer" className="hobby__link">
                                        <h4 className="hobby__link--title">{content.link.title}</h4>
                                        <p className="hobby__link--description">{content.link.description}</p>
                                        <ul className="hobby__link--content">
                                            {content.link.image.map((item, index) => (
                                                <li key={index} className="hobby__link--item">
                                                    <img src={require(`../images/${item}`)} alt={content.link.title} />
                                                </li>
                                            ))}
                                        </ul>
                                    </a>
                                ) : null }

                                { content.tags ? (
                                    <ul className="hobby__tags">
                                        {content.tags.map((item, index) => (
                                            <li key={index} className="hobby__tags--item">{item}</li>
                                        ))}
                                    </ul>
                                ) : null }
                            </div>
                        </div>
                    ))
                ) : null}
            </section>	
		</>
	);
}

export default ContentHobby;