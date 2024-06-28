import React from 'react';

const Loading = ({ text = 'LOADING...' }) => {
    // Function to split the text into individual letters
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className={index % 2 === 0 ? "wave" : 'waveDown'}>{char}</span>
        ));
    };

    return (
        <div className="ldng">
            <div className="ldng-box">
                <h1>{splitText(text)}</h1>
            </div>
        </div>
    );
};

export default Loading;
