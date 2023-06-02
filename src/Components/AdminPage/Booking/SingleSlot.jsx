import styles from "./SingleSlot.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { AdminBookingContext } from "../../Contexts/AdminBookingContext";
import moment from "moment";
import timeConverter from "../../HelperFunctions/timeConverter";

export default function SingleSlot({ slot, chooseTimeSlot }) {
  const { chooseBarber, date } = useContext(AdminBookingContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const slotRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const localTimeSlot = timeConverter(date, slot.slot);

  return (
    <section
      ref={slotRef}
      onClick={() => {
        chooseTimeSlot(slot.slot);
        chooseBarber(slot.barber);
        isMobile && slotRef.current.classList.toggle(styles.active);
      }}
      className={styles.slot}
    >
      {" "}
      {localTimeSlot}
    </section>
  );
}
