import React, {ReactElement, useEffect} from 'react';
import {motion} from "framer-motion";
import {fadeUp} from './../../motion';
import style from './index.module.scss';
import {IRent} from "../../redux/types/IRent";

type ITableData = {
    rows: Array<string>
    columns: Array<IRent>
    remove?: {
        onDelete: (id: number) => void
    }
    update?: {
        onUpdate: (data: any, id: string) => void,
        modalId: string,
    }
}

const TableFullData:React.FC<ITableData> = ({rows, columns, remove, update}) => {



    return (
        <div className={style.table}>
            <table>
                <thead>
                <tr>
                    {
                        rows.map((item: string, index: number) => (
                            <motion.th
                                variants={fadeUp}
                                initial={`initial`}
                                animate={`animate`}
                                custom={index}
                                key={index}>
                                {
                                    item
                                }
                            </motion.th>
                        ))
                    }
                    <th style={{'width': '50px'}}/>
                    <th style={{'width': '50px'}}/>

                </tr>
                </thead>
                <tbody>
                {
                    columns.map((item: IRent, index: number) => (
                        <motion.tr
                            variants={fadeUp}
                            initial={`initial`}
                            animate={`animate`}
                            custom={index}
                            key={index}>
                            <td>{item.id}</td>
                            <td>{item.employ.name}</td>
                            <td>{item.employ.phone}</td>
                            <td>{item.bicycle.model}</td>
                            <td>{item.bicycle.rental_price}</td>
                            <td>{item.bicycle.bicycle_type.name}</td>
                            <td>{item.client.name}</td>
                            <td>{item.client.phone}</td>
                            <td>{item.rent_type.name}</td>
                            <td>{item.price}</td>
                            <td>{item.start_of_rental} - {item.end_of_rental}</td>
                            {
                                update && (
                                    <td>
                                        <button
                                            className={`btn btn-info btn-sm`}
                                            onClick={() => update.onUpdate(item, update.modalId)}
                                            type={`button`}
                                        >
                                            Редактировать
                                        </button>
                                    </td>
                                )
                            }
                            {
                                remove && (
                                    <td>
                                        <button
                                            className={`btn btn-danger btn-sm`}
                                            onClick={() => remove.onDelete(item.id)}
                                            type={`button`}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                )
                            }
                        </motion.tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default TableFullData;