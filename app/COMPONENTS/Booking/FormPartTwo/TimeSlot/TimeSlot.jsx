"use client"
import styles from "./TimeSlot.module.css";
import { useBookingContext } from "@/app/COMPONENTS/Context/BookingContext";
import ConvertDBTimeToOnlyTime from "@/lib/TimeDateConverters/ConvertDBTimeToOnlyTime";
import ConvertDBTimeToItalianTime from "@/lib/TimeDateConverters/ConvertTimeToItalianTimeZOne";

export default function TimeSlot({ slot, handleTimeChange, time, date }) {
  const { setTemporaryBarber } = useBookingContext();   

  // Format the time as "HH:mm"
  const timePart = ConvertDBTimeToItalianTime(slot?.slot)

  return (
    <h4
      onClick={() => {
        handleTimeChange(slot.slot);
        setTemporaryBarber(slot.barber);
      }}
      className={`${styles.timeSlot} ${time === slot.slot && styles.active}`}
    >
      {timePart}
    </h4>
  );
}