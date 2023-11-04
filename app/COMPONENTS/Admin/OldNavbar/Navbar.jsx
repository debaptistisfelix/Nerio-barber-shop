"use client"

import styles from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TimeDisplayer from './TimeDisplayer';
import { signOut } from 'next-auth/react';
import notify from '@/lib/toastNotify';




export default function Navbar({activeSidebar, toggleSidebar, changeDisplayedPage, displayedPage}){



const handleLinkClick = (nr) => {
    changeDisplayedPage(nr);
    toggleSidebar();
};




    return (
        <nav 

        className={`${styles.Navbar} ${
            activeSidebar === true && styles.active
          } ${activeSidebar === false && styles.notActive}`}>
            <div className={styles.logoBox}>
                <Link className={styles.homeLink} href="/">
                    <Image className={styles.logoImg} src="/logoS.png" alt="logo" width={160} height={100}/>
                </Link>
                <h1 className={styles.dashboardTitle}>DASHBOARD</h1>
            </div>

          <TimeDisplayer/> 

          <ul className={styles.navLinks}>
                <li className={`${styles.navLink} ${displayedPage === 1 && styles.active}`}
                onClick={() => {
                    handleLinkClick(1)
                }}
                >
                    <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon}/>
                    AGENDA
                </li>
                <li className={`${styles.navLink} ${displayedPage === 2 && styles.active}`}
                 onClick={() => {
                    handleLinkClick(2)
                }} >
                    <FontAwesomeIcon icon={faPlusCircle} className={styles.icon}/>
                    PRENOTA
                </li>
                <li  onClick={() => {
                   handleLinkClick(3)
                }} className={`${styles.navLink} ${displayedPage === 3 && styles.active}`} >
                    <FontAwesomeIcon icon={faScissors} className={styles.icon}/>
                    SERVIZI
                </li>
                <li className={`${styles.navLink} ${displayedPage === 4 && styles.active}`} onClick={() => {
                   handleLinkClick(4)
                }} >
                    <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                    BARBIERI
                </li>
                <button
           onClick={()=>{
                signOut()
                notify('Logout effettuato con successo', 'success')
           }}
                className={styles.logOutBtn}>LOG OUT</button>
            </ul>
        </nav>
    )
}