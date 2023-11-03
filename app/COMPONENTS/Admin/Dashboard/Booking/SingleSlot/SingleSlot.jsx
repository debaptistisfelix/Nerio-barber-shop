"use client"

import styles from "./SingleSlot.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import ConvertDBTimeToOnlyTime from "@/lib/TimeDateConverters/ConvertDBTimeToOnlyTime";


export default function SingleSlot({ slot, chooseTimeSlot }) {
  const { addBookingBarber, date, time } = useAdminBookingContext()



  // Format the time as "HH:mm"
  const timePart = ConvertDBTimeToOnlyTime(slot?.slot)
 


  return (
    <section
      onClick={() => {
        chooseTimeSlot(slot.slot);
        addBookingBarber(slot.barber);
      
      }}
      className={`${styles.slot} ${slot.slot === time && styles.active}`}
    >
      {timePart}
    </section>
  );
}