import styles from "./TimeSlot.module.css";
import moment from "moment";
import { useContext } from "react";
import { BookingContext } from "../Contexts/BookingContext";
import timeConverter from "../HelperFunctions/timeConverter";

export default function TimeSlot({ slot, chooseTimeSlot, time, date }) {
  const { setTemporaryBarber } = useContext(BookingContext);

  const localTimeSlot = timeConverter(date, slot.slot);

  return (
    <h4
      onClick={() => {
        chooseTimeSlot(slot.slot);
        setTemporaryBarber(slot.barber);
      }}
      className={`${styles.timeSlot} ${time === slot.slot && styles.active}`}
    >
      {localTimeSlot}
    </h4>
  );
}
