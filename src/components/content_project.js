import React, { useEffect, useRef, useState } from 'react';

function ContentProject( {themeData} ) {
    
    const content = themeData.content[0];
    const combinedProjects = [].concat(content.personalProj || [], content.teamProj || []);

    console.log(content.personalProj);
	return (
		<>
		<section id={themeData.type} className={`theme theme-${themeData.type}`} data-theme-index={themeData.idx}>
            <h2 className="sr-only">{themeData.title}</h2>
            {themeData.type === 'project' && combinedProjects.length > 0 && (
                combinedProjects.map((project, index) => (
                    <div className="project theme__inner">
                        <header key={index} className="theme__header">
                            <h3 className="theme__title">{project.title}</h3>
                            <p className="theme__description">{project.description}</p>
                        </header>
                        <div className="theme__content">
                            <ul className="project__list">
                            { project.projects.map((item, index) => (
                                <li key={index} className="project__list--item">
                                    <h4 className="project__list--title">{item.title}</h4>
                                    <p className="project__list--description">
                                        {item.description.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <div className="project__list--years">{item.year}</div>
                                    <ul className="project__list--tag">
                                        {item.tags.map((tag, index) => (
                                            <li key={index} className="project__list--tag-item">{tag}</li>
                                        ))}
                                    </ul>
                                    { item.url && (
                                        <a className="project__link" href={item.url} target="_blank">
                                            <div className="project__link--title">{item.title}</div>
                                            <div className="project__link--participation">참여도 : {item.participation}</div>
                                            <div className="project__link--techStack">
                                                {item.techStack.map((item, index) => (
                                                    <span key={index} className="project__link--tag-item">{item}</span>
                                                ))}
                                            </div>
                                            <ul className="project__link--content">
                                                {item.image.map((item, index) => (
                                                    <li key={index} className="project__link--item">
                                                        <img src={require(`../images/${item}`)} alt={item} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </a>
                                    )}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                ))
            )}
            </section>	
		</>
	);
}

export default ContentProject;