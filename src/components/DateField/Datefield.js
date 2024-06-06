import './DateField.css';
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
        
const DateField = ({label,name,value,invalid,disabled,className,labelType,onChange})=>{
    
    let styleClass= (labelType === "left") ? "left-label w-full" : "top-label w-full";

    const [fieldValue,setFieldValue] = useState(value);
    const handleChange=(event)=>{
        // console.log(event)
        let _value;
        // _value = event.value;
        _value = event.target.value;
        setFieldValue(_value);
        onChange(name,_value)
    }

    const fields=()=>{
        return(
            <Calendar showIcon
                className="w-full"
                disabled={disabled}
                invalid={invalid}
                value={fieldValue}
                name={name}
                showTime
                hourFormat='24'
                onChange={handleChange}
                dateFormat='dd/mm/yy'
            />
        )
    }

    return(
        <div className={`input-field ${className}`}>
            {(labelType === "float") ? 
                <span className="p-float-label">
                    {fields()}
                    <label htmlFor={name}>{label}</label>
                </span>
                :
                <div className={styleClass}>
                <label htmlFor={name} >{label}</label>
                    {fields()}
                </div>   
            }

        </div>
    )
}

export default DateField;