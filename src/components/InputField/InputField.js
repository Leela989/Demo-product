import './InputField.css';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from 'react';   

const InputField =({label,type,name,value,invalid,disabled,className,locale,currency,labelType,onChange})=>{

    const [fieldValue,setFieldValue] = useState(value);
    const handleChange=(event)=>{
        let _value;
        if(type==="number"){
            _value = event.value;
        }else{
            _value = event.target.value;
        }
        setFieldValue(_value);
        onChange(name,_value)
    }

    const fields = ()=>{
        return(
            <>
            {type === "number" ? 

            <InputNumber
                value={fieldValue}
                disabled={disabled}
                invalid={invalid}
                currency={currency}
                locale={locale}
                onChange={handleChange}
            /> 
            :
            <InputText 
                value={fieldValue}
                disabled={disabled}
                invalid={invalid}
                onChange={handleChange}
            />
            }
            </>
        )
    }

    let styleClass= (labelType === "left") ? "left-label" : "top-label";

    return(
        <div className={`input-field  ${className}`}>
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

export default InputField;