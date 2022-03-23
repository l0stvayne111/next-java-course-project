import type {ReactElement} from 'react'
import React, {useEffect, useState} from 'react';

import 'react-toastify/dist/ReactToastify.css';
import {AnimatePresence, motion} from "framer-motion";
import Dashboard from "../../layouts/dashboard";
import TableData from "../../components/TableData";
import {PageTransition} from "../../motion";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getModal} from "../../helpers/functions";
import {closeModal, openModal} from "../../redux/reducers/ModalSlice";
import ModalClient from "../../blocks/modals/modalClient";
import {IClient} from "../../redux/types/IClient";
import {clearClient, getItem, setClientValue} from "../../redux/reducers/ClientSlice";
import {ToastContainer} from "react-toastify";
import {deleteClient, fetchClients, patchClient, postClient} from "../../redux/actions/ClientAction";
import Preloader from "../../components/Preloader";



const rows = ['id', 'Name', 'Phone'];


const Clients = () => {

    const {modals} = useAppSelector(state => state.modalsReducer);
    const {clients, client, status} = useAppSelector(state => state.clientReducer);
    const dispatch = useAppDispatch();

    const [statusModal, setStatusModal] = useState<'ADD' | 'UPDATE'>('ADD');

    const modalClient = getModal(modals, 'modalClient');


    const handleOpenModal = (id: string) => {
        dispatch(openModal(id))
    }

    const handleCloseModal = (id: string) => {
        dispatch(closeModal(id));
        dispatch(clearClient());
        setStatusModal('ADD');
    }

    const handleAddClient = (data: IClient) => {

        const {id, name, phone} = data;

        switch (statusModal) {
            case 'ADD' : {
                //dispatch(addItem(data));
                dispatch(postClient({name, phone}))
                break;
            }
            case "UPDATE": {
                //dispatch(patchItem(data))
                dispatch(patchClient({_id: id, data: {name, phone}}))
                break;
            }
            default : {
                break;
            }
        }


        setStatusModal('ADD');

    }

    const handleSetClient = (value: string, name: string) => {
        dispatch(setClientValue({value, name}));
    }

    const handleOnDeleteClient = (id: number) => {
        dispatch(deleteClient({id}))
    }

    const handleOnUpdateClient = (data:any, id: string) => {
        setStatusModal('UPDATE');
        dispatch(openModal(id));
        dispatch(getItem(data))
    }


    useEffect(() => {
       dispatch(fetchClients())
    }, [dispatch])


    // useEffect(() => {
    //     if (status === 'FULFILLED') {
    //         dispatch(fetchClients())
    //     }
    // }, [dispatch, status])


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
                            Таблица клиентов
                        </h2>
                    </div>
                    <div className={`col-auto`}>
                        <button
                            type={`button`}
                            onClick={() => handleOpenModal(modalClient.id)}
                            className={`btn btn-primary`}
                        >
                            Добавить нового клиента
                        </button>
                    </div>
                </div>

                <div className={`mt-5`}>
                    <TableData
                        rows={rows}
                        columns={clients}
                        remove={{
                        onDelete: handleOnDeleteClient,
                    }}
                        update={{
                        onUpdate: handleOnUpdateClient,
                        modalId: modalClient.id,
                    }}/>
                </div>

            </motion.div>
            <ToastContainer
                autoClose={2500}
                theme={`colored`}
                pauseOnHover={false}/>
            <ModalClient
                modal={modalClient}
                data={client}
                setValue={handleSetClient}
                onClose={handleCloseModal}
                onSubmit={handleAddClient}
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

Clients.getLayout = function getLayout(page: ReactElement) {
    return (
        <Dashboard title={`Клиенты`}>
            {
                page
            }
        </Dashboard>
    )
}

export default Clients;