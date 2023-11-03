"use client"

import styles from "./BarberCard.module.css";

import { useBookingContext } from "@/app/COMPONENTS/Context/BookingContext";
import { useRef } from "react";

export default function BarberCard({ barber }) {
  const { addBookingBarber, booking, removeBookingBarber } =
    useBookingContext();
    const imageRef = useRef(null);

    const handleBarberClick = (barber) => {
      if(booking?.barber=== null || booking?.barber !== barber ){
        addBookingBarber(barber);
      } else if(booking?.barber === barber){
        removeBookingBarber();
        
      }
    }


  return (
    <section
      onClick={() => {handleBarberClick(barber)}}
      className={`${styles.barberCard} ${
        booking?.barber === barber && styles.active
      }`}
    >
      <img
        ref={imageRef}
        src="/anon.png"
        className={`${styles.barberImg} ${
          booking?.barber === barber && styles.active
        }`}
        alt="Barber-image"
      />
      <h3
        className={`${styles.barberName} ${
          booking?.barber === barber && styles.active
        }`}
      >
        {barber.name === "Any Barber" ? "Indifferente" : barber.name}
      </h3>
    </section>
  );
}