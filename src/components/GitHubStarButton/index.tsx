import React from 'react';
import './index.css';

type StarButtonProps = {
    owner: string
    repo: string
}

const STARS = '34k+';

const StarButton: React.FC<StarButtonProps> = ({owner, repo}) => {
    return (
        <span className="github-btn github-stargazers github-btn-large">
            <a className="gh-btn" href={`https://github.com/${owner}/${repo}`} rel="noopener noreferrer" target="_blank"
                aria-label={`Star ${owner}/${repo} on GitHub`}>
                <span className="gh-ico" aria-hidden="true"></span>
                <span className="gh-text">Star</span>
            </a>
            <a className="gh-count" href={`https://github.com/${owner}/${repo}/stargazers`} rel="noopener noreferrer"
                target="_blank" aria-label={`${STARS} stargazers on GitHub`} style={{display: 'block'}}>
                {STARS}
            </a>
        </span>
    )
}

export default StarButton;