import styles from "./Banner.module.css";
import Pole from "./Pole";
import "../CSS/variables.css";
export default function Banner() {
  return (
    <>
      <main className={styles.banner}>
        <div className={styles.shader}></div>
        <div className={styles.bannerContent}>
          <Pole />
          <h3 className={styles.motto}>Your Personal Barbershop Oasis</h3>
          <div className={styles.capBox}>
            <span className={styles.line}></span>
            <h4 className={styles.cap}>40138</h4>
            <span className={styles.line}></span>
          </div>
          <a href="#bookingSection" className={styles.bookBtn}>
            PRENOTA
          </a>
        </div>
      </main>
    </>
  );
}
