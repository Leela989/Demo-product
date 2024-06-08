import React from 'react';
import { Button } from 'primereact/button';
import './Button.css';

export default function CustomButton({ label, type, icon, textRaised, outlined, className, onClick, disabled, width, height }) {
    const buttonStyles = {
        width: width || '100%',
        height: height || '32px'
    };

    return (
        <div className={`customizedBtn ${className}`}>
            <Button label={label} className="customBtn" disabled={disabled} onClick={onClick} style={buttonStyles} outlined={outlined}/>
        </div>
    );
}
