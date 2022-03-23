import React, {FormEvent, useEffect, useState} from 'react';
import {IModal} from "../../../redux/types/IModal";
import {IRent} from "../../../redux/types/IRent";
import {IType} from "../../../redux/types/IType";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/FormInput";
import {IStaff} from "../../../redux/types/IStaff";
import {IBicycles} from "../../../redux/types/IBicycles";
import {IClient} from "../../../redux/types/IClient";
import FormSelect from "../../../components/FormSelect";

type IModalRent = {
    modal: IModal,
    data: IRent,
    staffs: Array<IStaff>,
    clients: Array<IClient>,
    typesBicycles: Array<IType>
    bicycles: Array<IBicycles>,
    typesRents: Array<IType>,
    onClose: (id: string) => void,
    status: 'ADD' | 'UPDATE',
    setValue: (value: string | IStaff | IBicycles | IClient | IType, name: string) => void,
    onSubmit: (data: any) => void
}

const ModalRent: React.FC<IModalRent> = (
    {
        modal,
        typesRents,
        clients,
        bicycles,
        onClose,
        data,
        status,
        setValue,
        staffs,
        typesBicycles,
        onSubmit
    }) => {

    const [isValid, setIsValid] = useState({
        modelValid: false,
        rental_priceValid: false,
        formValid: true,
    })

    const handleCloseModal = (id: string) => {
        onClose(id);
    }
    const {
        id,
        client,
        bicycle,
        employ,
        rent_type,
    } = data;


    const [house, setHouse] = useState<string | number>(1);


    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (house) {
            const data: any = {
                id: id,
                employ: employ,
                bicycle: bicycle,
                client: client,
                rent_type: rent_type,
                hours: +house,
            }
            onSubmit(data)
        }
        onClose(modal.id)


    }


    return (
        <Modal modal={modal} closeModal={handleCloseModal} title={`Аренда`}>
            <form onSubmit={event => handleOnSubmit(event)}>
                <div className={`row mt-4`}>

                    <div className={`col-6`}>
                        <FormSelect
                            name={'employ'}
                            label={'Сотрудник'}
                            value={employ.id}
                            setValue={setValue}
                            options={staffs}
                        />
                    </div>
                    <div className={`col-6`}>
                        <FormSelect
                            name={'client'}
                            label={'Клиент'}
                            value={client.id}
                            setValue={setValue}
                            options={clients}
                        />
                    </div>
                    <div className={`col-6`}>
                        <FormSelect
                            name={'bicycle'}
                            label={'Велосипед'}
                            value={bicycle.id}
                            patch={`model`}
                            setValue={setValue}
                            options={bicycles}
                        />
                    </div>
                    <div className={`col-6`}>
                        <FormSelect
                            name={'rent_type'}
                            label={'Тип аренды'}
                            value={rent_type.id}
                            setValue={setValue}
                            options={typesRents}
                        />
                    </div>
                    <div className={`col-12`}>


                        <FormInput
                            value={house as string}
                            placeholder={'Введите время аренды'}
                            setValue={setHouse}
                            name={`house`}
                            label={'Время аренды (час)'}
                        />


                    </div>

                    <div className={`col-12`}>
                        <button
                            type={`submit`}
                            className={`btn btn-primary ${!isValid.formValid ? 'disabled' : ''}`}>
                            {
                                status === 'ADD' && (<>Добавить аренду</>)
                            }
                            {
                                status === 'UPDATE' && (<>Обновить аренду</>)
                            }
                        </button>
                    </div>

                </div>
            </form>
        </Modal>
    );
};

export default ModalRent;