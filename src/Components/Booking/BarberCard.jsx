import styles from "./BarberCard.module.css";
import { useContext } from "react";
import { BookingContext } from "../Contexts/BookingContext";

export default function BarberCard({ barber }) {
  const { chooseBarber, chosenBarber, chooseYourBarber } =
    useContext(BookingContext);

  return (
    <section
      onClick={() => {
        /* chooseBarber(barber.name); */
        chooseYourBarber(barber);
      }}
      className={`${styles.barberCard} ${
        chosenBarber?.value === barber.value && styles.active
      }`}
    >
      <img
        src={barber.img}
        className={`${styles.barberImg} ${
          chosenBarber?.value === barber.value && styles.active
        }`}
        alt="Barber-image"
      />
      <h3
        className={`${styles.barberName} ${
          chosenBarber?.value === barber.value && styles.active
        }`}
      >
        {barber.name}
      </h3>
    </section>
  );
}
