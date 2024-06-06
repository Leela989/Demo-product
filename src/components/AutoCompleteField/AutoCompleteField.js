import './AutoCompleteField.css';
import {AutoComplete} from 'primereact/autocomplete';
import { useState } from 'react';  

const AutoCompleteField = ({ value, name,options, className, label, labelType, disabled, invalid,onChange,dropdown,forceSelection }) => {

    let [fieldValue, setFieldValue] = useState(value);
    // const list = ["aaa","bbb","ccc","abc","c11","bew"]
    const [filteredOptions, setFilteredOptions] = useState([]);

    const search = (event) => {
        const query = event.query;
        const _filteredOptions = options.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase())).map(item => item.name);
        //const _filteredOptions = list.filter(item => item.toLowerCase().startsWith(query.toLowerCase()));
        setFilteredOptions(_filteredOptions);
    }

    const handleInputChange = (event) => {
        setFieldValue(event.target.value);
        onChange(name,event.value);

    }
    const handleSelect=(event)=>{
        onChange(name,event.value);
        setFieldValue(event.value)
    }
    const field = ()=>{
        return(
            <AutoComplete
                id={name}
                value={fieldValue}
                disabled={disabled}
                invalid={invalid}
                suggestions={filteredOptions}
                completeMethod={search}
                onChange={handleInputChange}
                onSelect={handleSelect}
                dropdown={dropdown}
                forceSelection={forceSelection?forceSelection:true}
            />
        )
    }
    let styleClass= (labelType === "left") ? "left-label" : "top-label";

    return (
        <div className={`${className}`}>
            {(labelType === "float") ? 
                <span className="p-float-label">
                    {field()}
                    <label htmlFor={name}>{label}</label>
                </span>
                :
                <div className={styleClass}>
                <label htmlFor={name} >{label}</label>
                {field()}
                </div>   
            }
        </div>
    );
}

export default AutoCompleteField;
