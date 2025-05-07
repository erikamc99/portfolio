import { ProjectCardButton } from './button/ProjectCardButton';
import './ProjectCard.css';

export const ProjectCard = ({name, description, imageProject, url}) => {
  const handleCardButton = () => {
    window.open(url, '_blank');
  }
    return (
      <article className="project-container">
        <header className='card-header'>
          <img className='card-img' src={imageProject} alt="project image" />
        </header>
        <main className="card">
          <h2 className="title">{name}</h2>
          <p className="description">{description}</p>
        </main>
        <footer className='card-footer'>
          <ProjectCardButton icon="octicon:mark-github-24" action={handleCardButton} />
        </footer>
      </article>
    )
}