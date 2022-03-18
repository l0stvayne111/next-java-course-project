import React, {ReactElement} from 'react';
import Link from 'next/link';

import style from './index.module.scss';


const SideBar = () => {
    return (
        <div className={style.sidebar}>
            <div className={style.brand}>
                <a href="#">
                    TrashAdmin
                </a>
            </div>
            <div className={style.body}>
                <ul className={style.nav}>
                    <li>
                        <Link href={`/admin/clients`}>
                            <a>Клиенты</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/admin/staff`}>
                            <a>Сотрудники</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/admin/bicycles`}>
                            <a>Велосипеды</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/admin/bicycles-type`}>
                            <a>Типы велосипедов</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/admin/rent-type`}>
                            <a>Типы аренды</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};



export default SideBar;