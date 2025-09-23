'use client';
import styles from './style.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, background } from './anim';
import { AnimatePresence } from 'framer-motion';
import Nav from '../Nav/page';

export default function Header() {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.header}>
            <div className="flex justify-between items-start w-full">
                <div className={styles.bar}>
                    <div onClick={() => {setIsActive(!isActive)}} className={styles.el}>
                        <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                        <div className={styles.label}>
                            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                        </div>
                    </div>
                </div>
                <motion.div variants={opacity} className="order-1">
                    <Link href="/appointment" className="text-lg uppercase text-gray-700 cursor-pointer">Make an appointment</Link>
                </motion.div>
            </div>
           
            <AnimatePresence mode="wait">
                {isActive && <Nav/>}
            </AnimatePresence>

            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
        </div>
    )
}