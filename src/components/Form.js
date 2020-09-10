import React from 'react';

const Form = (props) => {
    return (
        <div>
            <label htmlFor={props.label + 'Input'} style={{marginBottom:'5px', display:'block'}}>{props.label}</label>
            <div className="field ui input focus" style={{display:'flex'}}>
                <input className={props.label + 'Input'}
                    type="text" 
                    placeholder={props.label}
                    value={props.value} 
                    onChange={event => props.onChange(event, "username")}
                    style={{marginBottom: '5px'}}/>
            </div>
        </div>
    );
}

export default Form;