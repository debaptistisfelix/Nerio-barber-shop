"use client"

import styles from "./SingleSlot.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import ConvertDBTimeToOnlyTime from "@/lib/TimeDateConverters/ConvertDBTimeToOnlyTime";
import ConvertUTCToItalianTime from "@/lib/TimeDateConverters/ConvertUTCtoItalianTime";

export default function SingleSlot({ slot, chooseTimeSlot }) {
  const { addBookingBarber, date, time } = useAdminBookingContext()



  // Format the time as "HH:mm"
  const timePart = ConvertUTCToItalianTime(slot?.slot)
 


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