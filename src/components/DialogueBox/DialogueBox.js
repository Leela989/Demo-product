import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './DialogueBox.css';

export default function DialogueBox({
    data,
    header,
    onClose,
    yesButtonText = "Yes",
    noButtonText = "No",
    onSave,
    showFooter = true,
    showCloseIcon = true,
    visible,
    width='50vw'
}) {
    const hideDialogueBox = () => {
        if (onClose) {
            onClose(false);
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
        hideDialogueBox();
    };

    const footerContent = showFooter && (
        <div className="dialogueBoxbtns">
            <Button label={yesButtonText} onClick={handleSave} autoFocus className="yesButton"/>
            <Button label={noButtonText} onClick={hideDialogueBox} className="noButton"/>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header={header}
                visible={visible}
                style={{ width: width}}
                onHide={hideDialogueBox}
                footer={footerContent}
                closable={showCloseIcon}
                maximizable
            >
                {data}
            </Dialog>
        </div>
    );
}
