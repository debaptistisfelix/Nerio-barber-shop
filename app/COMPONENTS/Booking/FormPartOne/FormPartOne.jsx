import styles from "./FormPartOne.module.css";
import ServiceOptions from "./ServiceOptions/ServiceOptions";

export default function FormPartOne({ bookingSectionRef }) {
  return (
    <section className={styles.container}>
      <p className={styles.intro}>
        Seleziona i <b>servizi</b> che desideri prenotare, scegli il tuo <b>barbiere</b> di
        fiducia e premi <b>avanti</b>.
      </p>
      <p className={` ${styles.mobileIntro}` }>Seleziona i <b>servizi</b> che desideri prenotare.</p>
      <ServiceOptions bookingSectionRef={bookingSectionRef} />
    </section>
  );
}