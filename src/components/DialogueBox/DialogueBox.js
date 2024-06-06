import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './DialogueBox.css';

export default function DialogueBox({ data, header, setAdd, yesButtonText, noButtonText, onSave }) {
    const [visible, setVisible] = useState(true);

    const hideDialogueBox = () => {
        setAdd(false);
        setVisible(false);
    };

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
        hideDialogueBox();
    };

    const footerContent = (
        <div className="dialogueBoxbtns">
            <Button label={yesButtonText} onClick={handleSave} autoFocus className="yesButton"/>
            <Button label={noButtonText} onClick={hideDialogueBox} className="noButton"/>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={hideDialogueBox} footer={footerContent}>
                {data}
            </Dialog>
        </div>
    )
}
