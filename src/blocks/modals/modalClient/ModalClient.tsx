import React, {FormEvent, useEffect, useState} from 'react';
import {IModal} from "../../../redux/types/IModal";
import {IClient} from "../../../redux/types/IClient";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/FormInput";


type IModalClient = {
    modal: IModal,
    data: IClient,
    setValue: (value: string, name: string) => void,
    onClose: (id: string) => void,
    onSubmit: (data: IClient) => void,
    status: 'ADD' | 'UPDATE'
}

const ModalClient: React.FC<IModalClient> = (
    {
        modal,
        data,
        setValue,
        onClose,
        onSubmit,
        status= 'ADD'
    }) => {
    
    
    
    const [isValid, setIsValid] = useState({
        nameValid: false,
        phoneValid: false,
        formValid: false,
    })


    const {id, name, phone} = data;

    const handleCloseModal = (id: string) => {
        onClose(id);
    }

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(data);
        onClose(modal.id);
    }
    
    
    useEffect(() => {
        let nameValid: boolean = name.length > 0,
            phoneValid: boolean = phone.length > 0;
        
        setIsValid(state => ({
            ...state,
            nameValid,
            phoneValid,
            formValid: nameValid && phoneValid
        }));
        
    }, [data])

    return (
        <Modal
            modal={modal}
            closeModal={handleCloseModal}
            title={`Пользователь`}>
            <>
                <form onSubmit={event => handleOnSubmit(event)}>
                    <div className={`row`}>
                        <div className={`col-12`}>
                            <FormInput
                                value={name}
                                placeholder={`Введите имя`}
                                setValue={setValue}
                                name={'name'}
                                label={`Имя`}
                            />
                        </div>
                        <div className={`col-12`}>
                            <FormInput
                                value={phone}
                                placeholder={`Введите телефон`}
                                setValue={setValue}
                                name={`phone`}
                                label={`Телефон`}
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

export default ModalClient;