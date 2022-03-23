import React, {ReactElement, useEffect, useState} from 'react';
import Dashboard from "../../layouts/dashboard";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getModal} from "../../helpers/functions";
import {AnimatePresence, motion} from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import {PageTransition} from "../../motion";
import {closeModal, openModal} from "../../redux/reducers/ModalSlice";
import TableData from "../../components/TableData";
import {deleteStaff, fetchStaff, patchStaff, postStaff} from "../../redux/actions/StaffAction";
import {ToastContainer} from "react-toastify";
import ModalStaff from "../../blocks/modals/modalStaff";
import {IStaff} from "../../redux/types/IStaff";
import {clearStaff, getStaff, setStaffValue} from "../../redux/reducers/StaffSlice";
import Preloader from "../../components/Preloader";

const Staff = () => {


    const rows = ['id', 'Name', 'Phone'];


    const {modals} = useAppSelector(state => state.modalsReducer);
    const {staffs, staff, status} = useAppSelector(state => state.staffReducer);
    const dispatch = useAppDispatch();

    const [statusModal, setStatusModal] = useState<'ADD' | 'UPDATE'>('ADD');

    const modalStaff = getModal(modals, 'modalStaff');


    const handleOpenModal = (id: string) => {
        dispatch(openModal(id))
    }
    const handleCloseModal = (id: string) => {
        dispatch(closeModal(id))
        dispatch(clearStaff());
        setStatusModal('ADD');
    }

    const handleOnSubmit = (data: IStaff) => {
        const {id, name, phone} = data;
        switch (statusModal) {
            case "ADD": {
                dispatch(postStaff({name, phone}));
                break;
            }
            case "UPDATE": {
                dispatch(patchStaff({_id: id, data: {name, phone}}))
                break;
            }
            default : {
                break;
            }
        }
        setStatusModal('ADD');
    }

    const handleSetStaff = (value: string, name: string) => {
        dispatch(setStaffValue({value, name}))
    }

    const handleOnDeleteStaff = (id: number) => {
        dispatch(deleteStaff({id}))
    }

    const handleOnUpdateStaff = (data: any, id: string) => {
        setStatusModal('UPDATE');
        dispatch(openModal(id));
        dispatch(getStaff(data));
    }

    useEffect(() => {
        dispatch(fetchStaff())
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
                            Таблица сотрудников
                        </h2>
                    </div>
                    <div className={`col-auto`}>
                        <button
                            type={`button`}
                            className={`btn btn-primary`}
                            onClick={() => handleOpenModal(modalStaff.id)}>
                            Добавить нового сотрудника
                        </button>
                    </div>
                </div>
                <div className={`mt-5`}>
                    <TableData
                        rows={rows}
                        columns={staffs}
                        remove={{
                            onDelete: handleOnDeleteStaff,
                        }}
                        update={{
                            onUpdate: handleOnUpdateStaff,
                            modalId: modalStaff.id
                        }}
                    />
                </div>
            </motion.div>
            <ToastContainer
                autoClose={2500}
                theme={`colored`}
                pauseOnHover={false}/>
            <ModalStaff
                modal={modalStaff}
                data={staff}
                setValue={handleSetStaff}
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

Staff.getLayout = function getLayout(page: ReactElement) {
    return (
        <Dashboard title={`Сотрудники`}>
            {
                page
            }
        </Dashboard>
    )
}

export default Staff;