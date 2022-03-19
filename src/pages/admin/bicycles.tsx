import React, {ReactElement, useEffect, useState} from 'react';
import Dashboard from "../../layouts/dashboard";
import {motion} from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {PageTransition} from "../../motion";
import TableData from "../../components/TableData";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteBicycles, fetchBicycles, patchBicycles, postBicycles} from "../../redux/actions/BicyclesAction";
import ModalBicycles from "../../blocks/modals/modalBicycles/ModalBicycles";
import {getModal} from "../../helpers/functions";
import {clearBicycles, getBicycles, setBicyclesValue} from "../../redux/reducers/BicyclesSlice";
import {closeModal, openModal} from "../../redux/reducers/ModalSlice";
import {IBicycles} from "../../redux/types/IBicycles";
import {fetchBicyclesTypes} from "../../redux/actions/TypesAction";
import {IType} from "../../redux/types/IType";

const rows = ['id', 'Модель', 'Цена', 'Тип'];

const Bicycles = () => {

    const {modals} = useAppSelector(state => state.modalsReducer);
    const {bicycles, bicycle} = useAppSelector(state => state.bicyclesReducer);
    const {typesBicycles} = useAppSelector(state => state.typesReducer);
    const dispatch = useAppDispatch();

    const [statusModal, setStatusModal] = useState<'ADD' | 'UPDATE'>('ADD');

    const modalBicycles = getModal(modals, 'modalBicycles');

    useEffect(() => {
        dispatch(fetchBicycles())
        dispatch(fetchBicyclesTypes())
    }, [dispatch])


    const handleOpenModal = (id: string) => {
        dispatch(openModal(id))
    }

    const handleCloseModal = (id: string) => {
        dispatch(closeModal(id));
        dispatch(clearBicycles());
        setStatusModal('ADD');
    }

    const handleOnDeleteBicycle = (id: number) => {
        dispatch(deleteBicycles({id}))
    }

    const handleSetBicycles = (value: string | IType, name: string) => {
        dispatch(setBicyclesValue({value, name}))
    }

    const handleOnSubmit = (data:IBicycles) => {

        const {id, model, bicycle_type, rental_price} = data;

        switch (statusModal){
            case "ADD": {
                dispatch(postBicycles({model, rental_price: +rental_price, bicycle_type}))
                break;
            }
            case "UPDATE": {
                dispatch(patchBicycles({_id: id, data: {model, bicycle_type, rental_price: +rental_price}}))
                break;
            }
            default : {
                break;
            }
        }

        setStatusModal('ADD');

    }

    const handleOnUpdate = (data:any, id: string) => {
        setStatusModal('UPDATE');
        dispatch(openModal(id));
        dispatch(getBicycles(data))
    }

    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={`animate`}
                exit={`initial`}
                className={`card`}>
                <div className={`row justify-content-between align-items-center`}>
                    <div className={`col-auto`}>
                        <h2>
                            Таблица велосипедов
                        </h2>
                    </div>
                    <div className={`col-auto`}>
                        <button
                            type={`button`}
                            onClick={() => handleOpenModal(modalBicycles.id)}
                            className={`btn btn-primary`}
                        >
                            Добавить новый велосипед
                        </button>
                    </div>
                </div>

                <div className={`mt-5`}>
                    <TableData
                        rows={rows}
                        columns={bicycles}
                        remove={{
                            onDelete: handleOnDeleteBicycle,
                        }}
                        update={{
                            onUpdate: handleOnUpdate,
                            modalId: modalBicycles.id
                        }}
                    />
                </div>

            </motion.div>
            <ToastContainer
                autoClose={2500}
                theme={`colored`}
                pauseOnHover={false}
            />
            <ModalBicycles
                modal={modalBicycles}
                data={bicycle}
                types={typesBicycles}
                setValue={handleSetBicycles}
                onClose={handleCloseModal}
                onSubmit={handleOnSubmit}
                status={statusModal}
            />
        </>
    );
};

Bicycles.getLayout = function getLayout(page: ReactElement) {
    return (
        <Dashboard title={`Велосипеды`}>
            {
                page
            }
        </Dashboard>
    )
}

export default Bicycles;