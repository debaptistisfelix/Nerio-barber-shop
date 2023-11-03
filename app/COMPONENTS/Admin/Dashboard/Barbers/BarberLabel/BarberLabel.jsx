"use client"


import styles from "./BarberLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faX } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../../Modal/Modal";

export default function BarberLabel({barber, showBarbersBookings, toggleModal, removeBarber, isModalOpen, }) {
  return(
   <>
    <div onClick={()=>{showBarbersBookings(barber.name)}} className={styles.barberBlock}>
      <h3 className={styles.barberName}>{barber.name}</h3>
      <FontAwesomeIcon onClick={toggleModal} icon={faX} className={styles.deleteIcon}/>
    </div>
    {isModalOpen === true && <Modal parag="Sicuro di voler cancellare questo barbiere?" btn1Text="Annulla" btn2Text="Conferma" btn1Func={toggleModal} btn2Func={()=>{
      toggleModal();
      removeBarber(barber.id)}}/>}
    </>
  )
}