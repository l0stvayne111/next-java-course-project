import React, {useEffect, useState} from 'react';
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
    setValue: (value: string | IStaff | IBicycles | IClient | IType, name: string) => void
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
        typesBicycles
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
        start_of_rental,
        end_of_rental,
        price,
        house,
        model,
        rental_price,
        bicycle_type
    } = data;


    return (
        <Modal modal={modal} closeModal={handleCloseModal} title={`Аренда`}>
            <form>
                <div className={`row`}>

                    {

                        (status === 'UPDATE') && (
                            <>
                                <div className={`col-12`}>
                                    <FormSelect
                                        name={`bicycle`}
                                        label={`Велосипед`}
                                        value={bicycle.id}
                                        patch={`bicycle_type`}
                                        setValue={setValue}
                                        options={bicycles}
                                    />
                                </div>
                                <div className={`col-12`}>
                                    <FormInput
                                        value={rental_price as string}
                                        placeholder={`Введите стоимость`}
                                        setValue={setValue}
                                        name={'rental_price'}
                                        label={`Стоимость`}
                                    />
                                </div>
                                <div className={`col-6`}>
                                    <FormSelect
                                        name={`bicycle_type`}
                                        patch={`name`}
                                        label={`Тип велосипеда`}
                                        value={bicycle.bicycle_type.id}
                                        setValue={setValue}
                                        options={typesBicycles}
                                    />
                                </div>

                            </>

                        )

                    }
                    {/*<div className={`col-6`}>*/}
                    {/*    <FormSelect*/}
                    {/*        name={`employ`}*/}
                    {/*        patch={`name`}*/}
                    {/*        label={`Сотрудник`}*/}
                    {/*        value={employ.id}*/}
                    {/*        setValue={setValue}*/}
                    {/*        options={staffs}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className={`col-6`}>*/}
                    {/*    <FormSelect*/}
                    {/*        name={`bicycle`}*/}
                    {/*        label={`Велосипед`}*/}
                    {/*        value={bicycle.id}*/}
                    {/*        patch={`model`}*/}
                    {/*        setValue={setValue}*/}
                    {/*        options={bicycles}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className={`col-6`}>*/}
                    {/*    <FormSelect*/}
                    {/*        name={`rent_type`}*/}
                    {/*        label={`Тип аренды`}*/}
                    {/*        value={rent_type.id}*/}
                    {/*        patch={`name`}*/}
                    {/*        setValue={setValue}*/}
                    {/*        options={typesRents}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className={`col-6`}>*/}
                    {/*    <FormSelect*/}
                    {/*        name={`client`}*/}
                    {/*        label={`Клиент`}*/}
                    {/*        value={client.id}*/}
                    {/*        patch={`name`}*/}
                    {/*        setValue={setValue}*/}
                    {/*        options={clients}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className={`col-12`}>*/}
                    {/*    <FormInput*/}
                    {/*        value={price as string}*/}
                    {/*        placeholder={`Введите цену`}*/}
                    {/*        setValue={setValue}*/}
                    {/*        name={'price'}*/}
                    {/*        label={`Цена`}*/}
                    {/*    />*/}
                    {/*</div>*/}
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
        </Modal>
    );
};

export default ModalRent;