import { useState, useEffect } from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import '../Styles/DetailLoginPage.css';
import jsonData from '../MockData/Attribute.json';
import claimsData from '../MockData/Claim.json';
import RiData from '../MockData/Ri.json';
import InputField from '../../../components/InputField/InputField';


export default function AttrubutesTab() {
    const renderAttributeBox = (data) => {
        return (
            <div className="attributeBox" key={data.label}>
                <p className="attributeText">{data.label}</p>
                {data.type === 'checkbox' ? (
                    <div className="attributeCheckBox">
                        <input type="checkbox"/>
                    </div>
                ) : (
                    <div>
                    <InputField type="text" className="attributeCheckBox"/>
                    </div>
                )}
            </div>
        );
    };

    const addRow = () => {

    }

    return (
        <div className="card">
            <div className="attributeContainer">
                <p className="attributeName">Attributes</p>
                <button className="addButton" onClick={addRow}>ADD</button>
            </div>
            <div className="attributes-container">
            <TabView>
                <TabPanel header="UW">
                    <div className="attributesListing">
                        <div className="attributeListing">
                            {claimsData.map((item) => renderAttributeBox(item))}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Claim">
                <div className="attributesListing">
                        <div className="attributeListing">
                            {jsonData.map((item) => renderAttributeBox(item))}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="RI">
                <div className="attributesListing">
                        <div className="attributeListing">
                            {RiData.map((item) => renderAttributeBox(item))}
                        </div>
                    </div>

                </TabPanel>
            </TabView>

          
            </div>
          
        </div>
    );
}
