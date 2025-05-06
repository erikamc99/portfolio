import './ProjectCard.css';

export const ProjectCard = ({name, description, url}) => {

    return (
        <article className="project-container">
        <h2 className="title">{name}</h2>
        <p className="description">{description}</p>
        <a className="url" href={url} target="_blank">Ver Proyecto</a>
      </article>
    )
}