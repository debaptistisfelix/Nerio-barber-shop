import styles from "./Modal.module.css"

import React from 'react'

export default function Modal({parag, btn1Text, btn2Text, btn1Func, btn2Func}) {
  return (
    <div className={styles.modalContainer}>
    <div className={styles.modal}>
      <p className={styles.modalParag}>
        {parag}
      </p>
      <div className={styles.btnBox}>
        <div onClick={btn1Func} className={styles.btn}>{btn1Text}</div>
        <div onClick={btn2Func} className={styles.btn}>{btn2Text}</div>
      </div>
    </div>
  </div>
  )
}
