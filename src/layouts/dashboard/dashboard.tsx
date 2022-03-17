import React from 'react';
import Head from "next/head";
import SideBar from "../../components/SideBar";
import {AnimatePresence, motion} from "framer-motion";

import style from './index.module.scss';
import {fadeUp} from "../../motion";



type IDashboard = {
    title: string,
}

const Dashboard: React.FC<IDashboard> = ({title, children}) => {
    return (
        <>
            <Head>
                <title>
                    {title}
                </title>
            </Head>
            <div>
                <SideBar/>
                <main className={style.main}>
                    <div className={style.header}>
                        <div className={style.title}>
                            <div className={`card`}>
                                <AnimatePresence>
                                    <motion.span
                                        variants={fadeUp}
                                        initial={`initial`}
                                        custom={2}
                                        animate={`animate`}>
                                        Страница
                                    </motion.span>
                                    <motion.h2
                                        variants={fadeUp}
                                        initial={`initial`}
                                        custom={3}
                                        animate={`animate`}>
                                        {title}
                                    </motion.h2>
                                    <motion.span
                                        variants={fadeUp}
                                        initial={`initial`}
                                        custom={4}
                                        animate={`animate`}>
                                        Добро пожаловать в мир редактирования
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className={style.header__inner}>
                            <img src="/bg.jpg" alt="header-banner"/>
                        </div>
                    </div>
                    <div className={style.content}>
                        {
                            children
                        }
                    </div>
                </main>
            </div>
        </>
    );
};

export default Dashboard;