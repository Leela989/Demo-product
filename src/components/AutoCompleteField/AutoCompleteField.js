import './AutoCompleteField.css';
import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';

const AutoCompleteField = ({ value, name, options, className, label, labelType, disabled, invalid, onChange, dropdown, forceSelection }) => {
    const [fieldValue, setFieldValue] = useState(value);
    const [filteredOptions, setFilteredOptions] = useState([]);

    const search = (event) => {
        const query = event.query;
        const _filteredOptions = options.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase())).map(item => item.name);
        setFilteredOptions(_filteredOptions);
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setFieldValue(value);
        onChange({ value });
    }

    const handleSelect = (event) => {
        const value = event.value;
        setFieldValue(value);
        onChange({ value });
    }

    const field = () => {
        return (
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
                forceSelection={forceSelection ? forceSelection : true}
            />
        );
    }

    let styleClass = (labelType === "left") ? "left-label" : "top-label";

    return (
        <div className={`${className}`}>
            {(labelType === "float") ?
                <span className="p-float-label">
                    {field()}
                    <label htmlFor={name}>{label}</label>
                </span>
                :
                <div className={styleClass}>
                    <label htmlFor={name}>{label}</label>
                    {field()}
                </div>
            }
        </div>
    );
}

export default AutoCompleteField;
