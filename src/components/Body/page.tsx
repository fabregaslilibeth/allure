import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.css";
import { blur } from "@/anim/index";
import { Link as LinkType, SelectedLink } from "@/types/index";

export default function Body({ links, selectedLink, setSelectedLink }: { links: LinkType[], selectedLink: SelectedLink, setSelectedLink: (link: SelectedLink) => void }) {
  return (
    <div className={styles.body}>
      {links.map((link: LinkType, index: number) => {
        const { id, title, href, brand, src } = link;
        return (
          <Link key={`l_${index}`} href={href}>
            <motion.p
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index, src });
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index, src });
              }}
              variants={blur}
              animate={
                selectedLink?.isActive && selectedLink?.index != index
                  ? "open"
                  : "closed"
              }
            >
              {id && <span>{id}</span>} <span>{title}</span>{" "}
              {brand && <span>{brand}</span>}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
