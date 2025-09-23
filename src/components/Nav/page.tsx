"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "./anim";
import Body from "../Body/page";
import Footer from "../Footer/page";
import NavImage from "../Image/page";
import Link from "next/link";
import { services } from "@/data/services";
import { links } from "@/data/links";

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
    src: "home.png",
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row mb-80 lg:mb-0">
        <div className="w-full lg:w-5/12 order-1 md:order-0">
          <div className="flex flex-col mt-12 lg:mt-24">
            {links.map((link, index) => (
              <Link href={link.href} key={index}>
                <p className="text-[1.5vw] sm:text-[16px] md:text-[26px] uppercase text-gray-700">{link.title}</p>
              </Link>
            ))}
          </div>
          <NavImage
            selectedLink={selectedLink}
            className="w-full h-full"
          />
        </div>
        <div className="w-full md:w-8/12">
          <Body
            links={services}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
