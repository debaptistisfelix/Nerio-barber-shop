import styles from "./CustomerForm.module.css";
import notify from "@/lib/toastNotify";
import React from 'react'
import { useState } from "react";

export default function CustomerForm({booking, handleNext, date, time}) {

    const [data, setData] = useState({
        name: "",
        email: ""
    });

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      }
    

  return (
    <div className={styles.customerInfosBox}>
    <h3 className={styles.customerTitle}>I TUOI DATI</h3>
    <p className={styles.intro}>Inserisci il tuo nome e la tua email</p>
    <input
      onChange={handleInputChange}
      type="text"
      name="name"
      value={data?.name}
      placeholder="Nome e Cognome"
      className={styles.customerInput}
    />
    <input
      onChange={handleInputChange}
      type="email"
      name="email"
      value={data?.email}
      placeholder="Email"
      className={styles.customerInput}
    />
   <div className={styles.buttonContainer}>


   <button
      onClick={() => {
        event.preventDefault();
       if(booking.services.length === 0 || booking.barber === null || date === null || time === null || data?.name === "" || data?.email === "" || !data?.email.includes("@")) {
        notify("Per continuare seleziona: data, orario, nome e email", "error");
        } else {
          handleNext(data.name, data.email);
        }
      }}
   
      className={styles.customerBtn}
    >
      AVANTI
    </button>
   </div>
  </div>
  )
}
