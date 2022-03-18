import React, {useEffect} from 'react';

import style from './index.module.scss';
import {IType} from "../../redux/types/IType";

type IFormSelect = {
    name: string,
    label: string,
    value: number,
    setValue: (value: string | IType, name: string) => void,
    options: Array<IType>
}

const FormSelect: React.FC<IFormSelect> = (
    {
        name,
        value,
        setValue,
        label,
        options
    }) => {

    useEffect(() => {
        if (value === 0) {
           setValue(options[0], name)
        }
    }, [])

    const handleOnSelect = (event: React.FormEvent<HTMLSelectElement>) => {
        const id = +event.currentTarget.value;
        let clone:Array<IType> = options.concat();
        // @ts-ignore
        const option:IType = clone.find((i:IType) => i.id === id);
        setValue(option, name);
    }


    return (
        <>
            <div className={style.form_control}>
                <select
                    name={name}
                    value={value}
                    className={style.form_input}
                    onChange={event => handleOnSelect(event)}
                >
                    {
                        options.map((item: IType, index: number) => (
                            <option value={item.id} key={index}>{item.name}</option>
                        ))
                    }
                </select>
                <label className={style.form_label}>
                    {label}
                </label>
            </div>
        </>
    );
};

export default FormSelect;