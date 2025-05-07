import './FooterButton.css';
import { Icon } from '@iconify-icon/react';

export const FooterButton = () => {
    const handleButton = () => {
        window.open('https://github.com/erikamc99', '_blank');
    }
    return (
        <button className="footer-btn" onClick={handleButton}>
            <Icon icon="octicon:mark-github-24"   width="2em" height="2em" className='icon-footer-btn' />
        </button>
    )
}