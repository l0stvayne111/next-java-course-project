import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../redux/types/IModal";
import {IBicycles} from "../../../redux/types/IBicycles";
import FormInput from "../../../components/FormInput";
import {IType} from "../../../redux/types/IType";
import FormSelect from "../../../components/FormSelect";



type IModalBicycles = {
    modal: IModal,
    data: IBicycles,
    types: Array<IType>
    setValue: (value: string | IType, name: string) => void,
    onClose: (id: string) => void,
    onSubmit: (data: IBicycles) => void,
    status: 'ADD' | 'UPDATE',
}

const ModalBicycles:React.FC<IModalBicycles> = (
    {
        modal,
        types,
        data,
        setValue,
        onClose,
        onSubmit,
        status= 'ADD',
    }) => {


    const [isValid, setIsValid] = useState({
        modelValid: false,
        rental_priceValid: false,
        formValid: false,
    })


    const {id, model, rental_price, bicycle_type} = data;

    const handleCloseModal = (id: string) => {
        onClose(id);
    }

    const handleOnSubmit = (event:FormEvent) => {
        event.preventDefault();
        onSubmit(data);
        onClose(modal.id);
    }
    useEffect(() => {
        let modelValid: boolean = model.length > 0,
            rental_priceValid: boolean = rental_price.toString().length > 0;

        setIsValid(state => ({
            ...state,
            modelValid,
            rental_priceValid,
            formValid: modelValid && rental_priceValid
        }));

    }, [data])


    return (
        <Modal
            modal={modal}
            closeModal={handleCloseModal}
            title={`Велосипеды`}
        >
            <>
                <form onSubmit={event => handleOnSubmit(event)}>
                    <div className={`row`}>
                        <div className={`col-12`}>
                            <FormInput
                                value={model}
                                placeholder={`Введите имя модели`}
                                setValue={setValue}
                                name={`model`}
                                label={`Модель велосипеда`}
                            />
                        </div>
                        <div className={`col-12`}>
                            <FormSelect
                                name={`bicycle_type`}
                                label={`Тип велосипеда`}
                                patch={`name`}
                                value={bicycle_type.id}
                                setValue={setValue}
                                options={types}
                            />
                        </div>
                        <div className={`col-12`}>
                            <FormInput
                                value={rental_price as string}
                                placeholder={`Введите цену аренды`}
                                setValue={setValue}
                                name={`rental_price`}
                                label={`Стоимость аренды`}
                            />
                        </div>
                        <div className={`col-12`}>
                            <button
                                type={`submit`}
                                className={`btn btn-primary ${!isValid.formValid ? 'disabled' : ''}`}>
                                {
                                    status === 'ADD' && (<>Добавить клиента</>)
                                }
                                {
                                    status === 'UPDATE' && (<>Обновить клиента</>)
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </>
        </Modal>
    );
};

export default ModalBicycles;