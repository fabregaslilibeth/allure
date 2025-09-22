'use client';
import styles from './style.module.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from './anim';
import Body from '../Body/page';
import Footer from '../Footer/page';
import Image from '../Image/page';

const links = [
  {
    title: "Home",
    href: "/",
    src: "home.svg"
  },
  {
    title: "Shop",
    href: "/shop",
    src: "shop.svg"
  },
  {
    title: "About Us",
    href: "/about",
    src: "home.svg"
  },
  {
    title: "Lookbook",
    href: "/lookbook",
    src: "lookbook.svg"
  },
  {
    title: "Contact",
    href: "/contact",
    src: "contact.svg"
  }
]

export default function Nav() {

  const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink}/>
          <Footer />
        </div>
        <Image src={links[selectedLink.index].src} selectedLink={selectedLink}/>
      </div>
    </motion.div>
  )
}