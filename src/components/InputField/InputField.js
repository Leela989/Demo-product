import './InputField.css';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from 'react';  
import mandatoryImg from '../../assets/star-red-512.webp' 

const InputField =({label,type,name,value,invalid,disabled,className,locale,currency,labelType,onChange, mandatory=false})=>{

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
                    <img src={mandatory} alt="imageTag" width='10px'/>
                </span>
                :
                <div className={styleClass}>
                    <div style={{display: 'flex'}}>
                    <label htmlFor={name} >{label}</label>
                 {mandatory && <img src={mandatoryImg} alt="imageTag" width='12px' className="mb-2 ml-1"/>}
                    </div>
                {fields()}
                </div>   
            }

        </div>
    )
}

export default InputField;