import React, {ReactElement, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    deleteBicyclesTypes,
    fetchBicyclesTypes,
    patchBicyclesTypes,
    postBicyclesTypes
} from "../../redux/actions/TypesAction";
import {AnimatePresence, motion} from "framer-motion";
import {PageTransition} from "../../motion";
import TableData from "../../components/TableData";
import {ToastContainer} from "react-toastify";
import Dashboard from "../../layouts/dashboard";
import 'react-toastify/dist/ReactToastify.css';
import ModalType from "../../blocks/modals/modalType";
import {getModal} from "../../helpers/functions";
import {closeModal, openModal} from "../../redux/reducers/ModalSlice";
import {IType} from "../../redux/types/IType";
import {clearType, getType, setTypeValue} from "../../redux/reducers/TypesSlice";
import Preloader from "../../components/Preloader";

const rows = ['id', 'Название'];

const BicyclesType = () => {

    const {typeBicycles, typesBicycles, status} = useAppSelector(state => state.typesReducer);
    const {modals} = useAppSelector(state => state.modalsReducer);
    const dispatch = useAppDispatch();

    const [statusModal, setStatusModal] = useState<'ADD' | 'UPDATE'>('ADD');

    const modalType = getModal(modals, 'modalType');

    const handleOpenModal = (id: string) => {
        dispatch(openModal(id))
    }

    const handleCloseModal = (id: string) => {
        dispatch(closeModal(id));
        dispatch(clearType());
        setStatusModal('ADD');
    }

    const handleSetType = (value: string, name: string) => {
        dispatch(setTypeValue({value, name, key: 'typeBicycles'}))
    }

    const handleOnDeleteType = (id: number) => {
        dispatch(deleteBicyclesTypes({id}))
    }
    const handleOnSubmit = (data:IType) => {
        const {id, name} = data;
        switch (statusModal) {
            case "ADD": {
                dispatch(postBicyclesTypes({name}))
                break;
            }
            case "UPDATE": {
                dispatch(patchBicyclesTypes({_id: id, data: {name}}))
                break;
            }
            default : {
                break;
            }
        }
    }


    const handleOnUpdateType = (data:any, id: string) => {
        setStatusModal('UPDATE');
        dispatch(openModal(id));
        dispatch(getType({data, keys: {arr: 'typesBicycles', item: 'typeBicycles'}}))
    }

    useEffect(() => {
        dispatch(fetchBicyclesTypes());
    }, [dispatch])

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
                            Таблица типов велосипеда
                        </h2>
                    </div>
                    <div className={`col-auto`}>
                        <button
                            type={`button`}
                            onClick={() => handleOpenModal(modalType.id)}
                            className={`btn btn-primary`}
                        >
                            Добавить новый тип велосипеда
                        </button>
                    </div>
                </div>

                <div className={`mt-5`}>
                    <TableData
                        rows={rows}
                        columns={typesBicycles}
                        remove={{
                            onDelete: handleOnDeleteType
                        }}
                        update={{
                            onUpdate: handleOnUpdateType,
                            modalId: modalType.id
                        }}
                    />
                </div>

            </motion.div>
            <ToastContainer
                autoClose={2500}
                theme={`colored`}
                pauseOnHover={false}
            />
            <ModalType
                modal={modalType}
                data={typeBicycles}
                setValue={handleSetType}
                onClose={handleCloseModal}
                onSubmit={handleOnSubmit}
                status={statusModal}
            />
            <AnimatePresence>
                {
                    status && <Preloader/>
                }
            </AnimatePresence>
        </>
    );
};

BicyclesType.getLayout = function getLayout(page: ReactElement) {
    return (
        <Dashboard title={`Типы велосипедов`}>
            {
                page
            }
        </Dashboard>
    )
}

export default BicyclesType;