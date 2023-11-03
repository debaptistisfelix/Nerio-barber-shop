"use client"
import styles from "./Navbar.module.css";
import { useState } from "react";
import Link from "next/link";




export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <nav className={styles.navbar}>
      
      <ul className={`${styles.navLinkContainer} ${isNavOpen && styles.active}`}
      >
        <li className={styles.listElement}>
          <Link
           onClick={toggleNav}
            href="#priceList"
            className={styles.navLink}
          >
            Listino Prezzi
          </Link>
        </li>
        <li className={styles.listElement}>
          <Link
         onClick={toggleNav}
            href="#contacts"
            className={styles.navLink}
          >
            Contatti
          </Link>
        </li>
        <li className={styles.listElement}>
          <Link
         onClick={toggleNav}
            href="#aboutUs"
            className={styles.navLink}
          >
            About Us
          </Link>
        </li>
      </ul>

      <div onClick={toggleNav} className={styles.hamburgerIcon}>
        <div className={` ${styles.bar} ${isNavOpen && styles.bar1}`}></div>
        <div className={` ${styles.bar} ${isNavOpen && styles.bar2}`}></div>
        <div className={` ${styles.bar} ${isNavOpen && styles.bar3}`}></div>
      </div>
      {isNavOpen === true && <div className={styles.screenShader}></div>}
    </nav>
  );
}