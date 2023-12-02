import styles from "./AboutUs.module.css";
import Openings from "./OpeningTime/Openings";


export default function AboutUs() {
  return (
    <section id="aboutUs" className={styles.aboutUsContainer}>
      <main className={styles.aboutUs}>
        <h1 className={styles.title}>IL TUO BARBIERE DI FIDUCIA</h1>
        <p className={styles.intro}>
        Benvenuti al nostro barber shop, un luogo dove la tradizione della barberia si fonde con l'innovazione moderna. Con anni di esperienza alle spalle, ci dedichiamo a fornire tagli personalizzati e trattamenti di alta qualità che rispecchiano le esigenze individuali di ogni cliente.
        </p>
        <p className={styles.intro}>
        La nostra missione è quella di offrirvi un'esperienza che vi faccia sentire al meglio, in un ambiente che è allo stesso tempo accogliente e rilassante. Affidatevi alla nostra competenza per il vostro prossimo look e scoprite il piacere di un servizio su misura.
        </p>
      </main>
      <Openings />
    </section>
  );
}
