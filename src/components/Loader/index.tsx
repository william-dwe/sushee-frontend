import React from 'react';
import './index.scss'

const Loader: React.FC = () => {
    return (
        <div className="loader-spinner-backdrop">
            <div className="loader-spinner">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
    )
}

export default Loader