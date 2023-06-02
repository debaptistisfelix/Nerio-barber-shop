import styles from "./PriceLine.module.css";

export default function PriceLine({ service }) {
  return (
    <section className={styles.line}>
      <h3 className={styles.label}>{service.service}</h3>
      <h3 className={styles.price}>€ {service.price}</h3>
    </section>
  );
}
