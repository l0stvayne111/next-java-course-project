import React, {FormEvent, useEffect, useState} from 'react';
import {IModal} from "../../../redux/types/IModal";
import {IType} from "../../../redux/types/IType";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/FormInput";


type IModalType = {
    modal: IModal,
    data: IType,
    setValue: (value: string, name: string) => void,
    onClose: (id: string) => void,
    onSubmit: (data: IType) => void,
    status: 'ADD' | 'UPDATE'
}

const ModalType:React.FC<IModalType> = (
    {
        modal,
        data,
        setValue,
        onClose,
        onSubmit,
        status
    }) => {

    const [isValid, setIsValid] = useState({
        nameValid: false,
        formValid: false,
    })

    const {id, name} = data;

    const handleCloseModal = (id: string) => {
        onClose(id);
    }

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(data);
        onClose(modal.id);
    }

    useEffect(() => {
        let nameValid: boolean = name.length > 0;

        setIsValid(state => ({
            ...state,
            nameValid,
            formValid: nameValid,
        }));

    }, [data])

    return (
        <Modal modal={modal} closeModal={handleCloseModal} title={'Тип'}>
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

export default ModalType;