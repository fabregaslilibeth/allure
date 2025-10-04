"use client";
import styles from "./style.module.css";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { background, color } from "@/anim/index";
import { AnimatePresence } from "framer-motion";
import Nav from "../Nav/page";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      variants={background}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={`${styles.header}`}
    >
      <div className="flex justify-between items-start w-full">
        <div className={styles.bar}>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={styles.el}
          >
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
            <div className={styles.label}>
              <motion.p variants={color} animate={isActive ? "dark" : "light"}>
                Menu
              </motion.p>
            </div>
          </div>
        </div>
        <motion.div
          variants={color}
          animate={isActive ? "dark" : "light"}
          className="order-1"
        >
          <Link
            href="/appointment"
            className="text-lg uppercase cursor-pointer"
          >
            Make an appointment
          </Link>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>
    </motion.div>
  );
}
