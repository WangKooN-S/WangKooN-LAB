import React from 'react';

function ContentIntro( {themeData} ) {
    // console.log(themeData);
    const content = themeData.content[0];
    
	return (
		<>
		<section id={themeData.type} className={`theme theme-${themeData.type}`} data-theme-index={themeData.idx}>
            <div className="theme__inner">
                <header className="theme__header">{themeData.title}</header>
                { themeData.type === 'intro' ? (
                    <div className="introduce theme__content">
                        <div className="introduce__name">{content.name}</div>
                        <div className="introduce__position">{content.title}</div>
                        <ul className="introduce__tags">
                            {content.tags.map((item, index) => {
                                    return (
                                        <li key={index} className="introduce__tag-item">#{item}</li>
                                    );
                            })}
                        </ul>

                        <div className="introduce__bio">
                            <div className="introduce__bio--birthdate">{content.bio.birthdate}</div>
                            <div className="introduce__bio--email"><a href={`mailto:${content.bio.email}`}>{content.bio.email}</a></div>
                        </div>

                        <div className="introduce__education introduce__list">
                            <div className="introduce__list--title">학력</div>
                            <ul className="introduce__list--content">
                                {content.education.map((item, index) => {
                                    const gpa = item.gpa ? <span className="tx--sub">({item.gpa})</span> : '';
                                    return (
                                        <li key={index} className="introduce__list--item">
                                            <div className="introduce__list--item-year">{item.year}</div>
                                            <div className="introduce__list--item-title">{item.degree}</div>
                                            <div className="introduce__list--item-description">{item.type} {gpa}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        
                        <div className="introduce__experience introduce__list">
                            <div className="introduce__list--title">경력</div>
                            <ul className="introduce__list--content">
                                {content.experience.map((item, index) => {
                                    return (
                                        <li key={index} className="introduce__list--item">
                                            <div className="introduce__list--item-year">{item.year}</div>
                                            <div className="introduce__list--item-title">{item.company}</div>
                                            <ul className="introduce__list--item-position">
                                                {item.position.map((position, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {position.position} 
                                                            <div className="tx--tags">
                                                                {position.tag.map((tag, index) => {
                                                                    return (
                                                                        <span key={index}>#{tag} </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            {/* <div className="introduce__list--item-description">{item.type}</div> */}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="introduce__certifications introduce__list">
                            <div className="introduce__list--title">자격</div>
                            <ul className="introduce__list--content">
                                {content.certifications.map((item, index) => {
                                    return (
                                        <li key={index} className="introduce__list--item">
                                            <div className="introduce__list--item-year">{item.year}</div>
                                            <div className="introduce__list--item-title">{item.name}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                    </div>
                ) : null }
            </div>
		</section>		
		</>
	);
}

export default ContentIntro;