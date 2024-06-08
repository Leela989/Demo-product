
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import SideBarComponent from '../pages/Sidebar/Sidebar';
import linksData from './Sidebar/LinksData';

export default function SibeBarHide() {
    const [visible, setVisible] = useState(false);

    return (
        <div >
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <SideBarComponent linksData={linksData}/>
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} className="sibeBarButton" />
        </div>
    )
}
        