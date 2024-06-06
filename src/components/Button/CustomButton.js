
import React from 'react'; 
import { Button } from 'primereact/button';
import './Button.css';

export default function CustomButton({label,type,icon,textRaised,outlined,className, onClick}) {
    const handleClick = () => {
        onClick();
    }
    return (
        <div className={`customizedBtn ${className}`}>
            <Button label={label} onClick={handleClick} className="customBtn"/>
        </div>
    )
}