import React, {FormEvent, ReactElement} from 'react';

import style from './index.module.scss'


type IFormInput = {
    value: string,
    placeholder: string,
    setValue: (value: string, name: string) => void,
    name: string,
    label: string,
}

const FormInput:React.FC<IFormInput> = (
    {
        value,
        placeholder,
        name,
        setValue,
        label
    }) => {

    const handleOnChange = (event:React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value, name);
    }

    return (
        <div className={style.form_control}>
            <input
                type="text"
                value={value}
                name={name}
                onChange={(event) => handleOnChange(event)}
                placeholder={placeholder}
                className={style.form_input}/>
            <label className={style.form_label}>
                {label}
            </label>
        </div>
    );
};

export default FormInput;