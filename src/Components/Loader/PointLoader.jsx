import styles from "./PointLoader.module.css";

export default function PointLoader({ color, width, height }) {
  return (
    <section className={styles.loader}>
      <div
        style={{ backgroundColor: color, width: width, height: height }}
        className={styles.point}
      ></div>
      <div
        style={{ backgroundColor: color, width: width, height: height }}
        className={styles.point}
      ></div>
      <div
        style={{ backgroundColor: color, width: width, height: height }}
        className={styles.point}
      ></div>
    </section>
  );
}
