import styles from "./BookingSection.module.css";
import FormPartOne from "./FormPartOne";
import { useContext, useRef } from "react";
import FormPartThree from "./FormPartThree";
import FormPartTwo from "./FormPartTwo";
import { BookingContext } from "../Contexts/BookingContext";

export default function BookingSection() {
  const { displayedForm } = useContext(BookingContext);
  const bookingSectionRef = useRef(null);
  return (
    <section id="bookingSection" className={styles.bookingSection}>
      <h1 ref={bookingSectionRef} className={styles.title}>
        PRENOTA IL TUO APPUNTAMENTO
      </h1>

      <main className={styles.form}>
        {displayedForm === 1 && (
          <FormPartOne bookingSectionRef={bookingSectionRef} />
        )}
        {displayedForm === 2 && (
          <FormPartTwo bookingSectionRef={bookingSectionRef} />
        )}
        {displayedForm === 3 && (
          <FormPartThree bookingSectionRef={bookingSectionRef} />
        )}
      </main>
    </section>
  );
}
