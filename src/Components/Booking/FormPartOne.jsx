import styles from "./FormPartOne.module.css";
import ServiceOptions from "./ServiceOptions";

export default function FormPartOne({ bookingSectionRef }) {
  return (
    <section className={styles.container}>
      <p className={styles.intro}>
        Seleziona i servizi che desideri prenotare, scegli il tuo barbiere di
        fiducia e premi avanti.
      </p>
      <ServiceOptions bookingSectionRef={bookingSectionRef} />
    </section>
  );
}
