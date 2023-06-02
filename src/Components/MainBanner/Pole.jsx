import styles from "./Pole.module.css";

export default function Pole() {
  return (
    <>
      <div className={styles.poleBox}>
        <div className={styles.poleCircle}></div>
        <img
          src="/public/poleEmpty.png"
          className={styles.poleImg}
          alt="Pole-png-image"
        />
        <div className={styles.poleGlass}>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
          <div className={styles.poleLine}></div>
        </div>
      </div>
    </>
  );
}
