import React, {ReactElement, useEffect} from 'react';
import {motion} from "framer-motion";
import {fadeUp} from './../../motion';

import style from './index.module.scss';


type ITableData = {
    rows: Array<string>
    columns: Array<{}>
    remove?: {
        onDelete: (id: number) => void
    }
    update?: {
        onUpdate: (data: any, id: string) => void,
        modalId: string,
    }
}

const TableData: React.FC<ITableData> = (
    {
        rows,
        columns,
        update,
        remove
    }) => {


    const convertObjectKeys = (state: any) => {
        let array: Array<ReactElement> = [];
        for (let key in state) {
            if (state.hasOwnProperty(key)) {
                if (typeof state[key] === 'object') {
                    array.push(<td>{state[key].name}</td>)
                } else {
                    array.push(<td>{state[key]}</td>)
                }

            }
        }

        return array;

    }


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
                    <th style={{'width': '100px'}}/>
                    <th style={{'width': '100px'}}/>

                </tr>
                </thead>
                <tbody>
                {
                    columns.map((item: any, index: number) => (
                        <motion.tr
                            variants={fadeUp}
                            initial={`initial`}
                            animate={`animate`}
                            custom={index}
                            key={index}>
                            {
                                convertObjectKeys(item)
                            }
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

export default TableData;