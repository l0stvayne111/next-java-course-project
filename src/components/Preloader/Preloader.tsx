import React from 'react';
import style from './preloader.module.scss';
import {AnimatePresence, motion} from "framer-motion";

const Preloader = () => {
    return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className={style.preloader}>
                <svg className={style.loader} width="240" height="240" viewBox="0 0 240 240">
                    <circle className={`${style.loader__ring} ${style.loader__ring_a}`} cx="120" cy="120" r="105"
                            fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"/>
                    <circle className={`${style.loader__ring} ${style.loader__ring_b}`} cx="120" cy="120" r="35"
                            fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"/>
                    <circle className={`${style.loader__ring} ${style.loader__ring_c}`} cx="85" cy="120" r="70"
                            fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"/>
                    <circle className={`${style.loader__ring} ${style.loader__ring_d}`} cx="155" cy="120" r="70"
                            fill="none" stroke="#000"
                            strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"/>
                </svg>
            </motion.div>
    );
};

export default Preloader;