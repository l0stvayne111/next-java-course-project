import React, {ReactElement, useEffect} from 'react';
import Dashboard from "../../layouts/dashboard";
import {motion} from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {PageTransition} from "../../motion";
import TableData from "../../components/TableData";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteBicycles, fetchBicycles} from "../../redux/actions/BicyclesAction";

const rows = ['id', 'Модель', 'Цена', 'Тип'];

const Bicycles = () => {

    const {modals} = useAppSelector(state => state.modalsReducer);
    const {bicycles, bicycle} = useAppSelector(state => state.bicyclesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBicycles())
    }, [dispatch])



    const handleOnDeleteBicycle = (id: number) => {
        dispatch(deleteBicycles({id}))
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
                    />
                </div>

            </motion.div>
            <ToastContainer
                autoClose={2500}
                theme={`colored`}
                pauseOnHover={false}
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