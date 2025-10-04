import React from 'react'
import { motion } from 'framer-motion';
import styles from './style.module.css';
import { opacity } from '@/anim/index';

interface SelectedLink {
  isActive: boolean;
  index: number;
  src: string;
}

export default function NavImage({selectedLink, className}: {selectedLink: SelectedLink, className: string}) {
  return (
    <motion.div variants={opacity} initial="initial" animate={selectedLink?.isActive ? "open" : "closed"} className={styles.imageContainer}>
        <img 
          src={selectedLink?.src}
          className={className}
          alt="image"
        />
    </motion.div>
  )
}