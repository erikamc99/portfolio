import './ProjectCardButton.css';
import { Icon } from '@iconify-icon/react';

export const ProjectCardButton = ({action, icon, url}) => {
    return (
        <button className="card-btn" onClick={action}>
            <Icon icon={icon}   width="1.5em" height="1.5em" className='icon-card-btn' />
        </button>
    )
}