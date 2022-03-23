import React, {ReactElement, useEffect, useState} from 'react';
import Dashboard from "../../layouts/dashboard";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteRent, fetchRents, patchRent, postRent} from "../../redux/actions/RentAction";
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TableFullData from "../../components/TableFullData";
import {clearRent, getRent, removeRent, setRentValue} from "../../redux/reducers/RentSlice";
import {IStaff} from "../../redux/types/IStaff";
import {IBicycles} from "../../redux/types/IBicycles";
import {IClient} from "../../redux/types/IClient";
import {IType} from "../../redux/types/IType";
import {getModal} from "../../helpers/functions";
import {closeModal, openModal} from "../../redux/reducers/ModalSlice";
import ModalRent from "../../blocks/modals/modalRent";
import {IRent} from "../../redux/types/IRent";
import {fetchStaff} from "../../redux/actions/StaffAction";
import {fetchBicycles} from "../../redux/actions/BicyclesAction";
import {fetchBicyclesTypes, fetchRentsTypes} from "../../redux/actions/TypesAction";
import {fetchClients} from "../../redux/actions/ClientAction";

const rows:Array<string> = ['id', 'Сотруд.', 'Тел.сотр', 'Вел.', 'Цена', 'Тип', 'Клиент', 'Тел', 'Аренда', 'Цена', 'Период'];

const Rent = () => {

    const {modals} = useAppSelector(state => state.modalsReducer);
    const dispatch = useAppDispatch();
    const {rents, rent} = useAppSelector(state => state.rentReducer);
    const {typesRents, typesBicycles} = useAppSelector(state => state.typesReducer);
    const {staffs, staff} = useAppSelector(state => state.staffReducer);
    const {clients, client} = useAppSelector(state => state.clientReducer);
    const {bicycles, bicycle} = useAppSelector(state => state.bicyclesReducer);

    const [statusModal, setStatusModal] = useState<'ADD' | 'UPDATE'>('ADD')

    const handleOnDeleteRent = (id:number) => {
        dispatch(deleteRent(id))
    }

    const modalRent = getModal(modals, 'modalRent');

    const handleOpenModal = (id: string) => {
        dispatch(openModal(id))
    }

    const handleCloseModal = (id: string) => {
        dispatch(closeModal(id));
        dispatch(clearRent());
        setStatusModal('ADD');
    }

    const handleSetRent = (value: string | IStaff | IBicycles | IClient | IType, key: string) => {
        dispatch(setRentValue({value, key}))
    }

    const handleOnUpdateRent = (data:IRent, id: string) => {
        setStatusModal('UPDATE');
        dispatch(openModal(id));
        dispatch(getRent(data))
    }


    useEffect(() => {
        dispatch(fetchRents());
        dispatch(fetchStaff());
        dispatch(fetchBicycles());
        dispatch(fetchRentsTypes());
        dispatch(fetchClients());
        dispatch(fetchBicyclesTypes())
    }, [dispatch])


    const handleOnSubmit = (data:any) => {

        switch (statusModal) {
            case "ADD": {
                dispatch(postRent({payload: data}));
                break;
            }
            case "UPDATE": {
                dispatch(patchRent({id: data.id, payload: data}))
                break;
            }
            default : {
                break;
            }
        }

        setStatusModal('ADD');

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
                            Таблица аренд
                        </h2>
                    </div>
                    <div className={`col-auto`}>
                        <button
                            type={`button`}
                            onClick={() => handleOpenModal(modalRent.id)}
                            className={`btn btn-primary`}
                        >
                            Добавить аренду
                        </button>
                    </div>
                </div>

                <div className={`mt-5`}>
                    <TableFullData
                        rows={rows}
                        columns={rents}
                        remove={{
                            onDelete: handleOnDeleteRent
                        }}
                        update={{
                            onUpdate: handleOnUpdateRent,
                            modalId: modalRent.id
                        }}
                        />
                </div>

            </motion.div>
            <ToastContainer
                autoClose={2500}
                theme={`colored`}
                pauseOnHover={false}
            />
            <ModalRent
                onSubmit={handleOnSubmit}
                typesBicycles={typesBicycles}
                clients={clients}
                staffs={staffs}
                bicycles={bicycles}
                modal={modalRent}
                data={rent}
                typesRents={typesRents}
                onClose={handleCloseModal}
                status={statusModal}
                setValue={handleSetRent}
            />

        </>
    );
};

Rent.getLayout = function getLayout(page: ReactElement) {
    return (
        <Dashboard title={`Аренда`}>
            {
                page
            }
        </Dashboard>
    )
}
export default Rent;