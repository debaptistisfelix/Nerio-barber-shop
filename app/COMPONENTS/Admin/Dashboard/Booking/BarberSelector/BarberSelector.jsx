"use client"

import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import styles from "./BarberSelector.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function BarberSelector() {
  const [barbers, setBarbers] = useState(null);
  const [error, setError] = useState(null);
  const {addBookingBarber, booking, date, setDate, setTime, setName, setEmail} = useAdminBookingContext();



  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get(
          "/api/barber"
        );
        setBarbers(response.data);
       
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Errore nel caricamento dei barbieri");
      }
    };
    fetchBarbers();
  }, []);



  return (
    <section className={styles.barberChoiceBox}>
      <div className={styles.barberOptions}>
        {barbers !== null &&
          barbers.map((barber) => {
            return (
              <h3
           
                onClick={() => {
                  if(date === null){
                    addBookingBarber(barber)
                  } else {
                    addBookingBarber(barber)
                    setDate(null)
                    setTime(null)
                    setEmail("")
                    setName("")
                  }

                }}
                key={barber.name}
                className={`${styles.barber} ${booking?.barber?.id === barber.id && styles.active}`}
              >
                {barber.name === "Any Barber" ? "Indifferente" : barber.name}
              </h3>
            );
          })}
      </div>
    </section>
  );
}