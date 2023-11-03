"use client"

import styles from './Hamburger.module.css'

export default function Hamburger({activeSidebar, toggleSidebar}){
    return (
        <div
        onClick={() => toggleSidebar()}
        className={styles.container}
      >
        <div
          
          className={`${styles.bar1} ${
            activeSidebar === true && styles.active
          }`}
        ></div>
        <div
          
          className={`${styles.bar2} ${
            activeSidebar === true && styles.active
          }`}
        ></div>
        <div
          
          className={`${styles.bar3} ${
            activeSidebar === true && styles.active
          }`}
        ></div>
      </div>
    )
}