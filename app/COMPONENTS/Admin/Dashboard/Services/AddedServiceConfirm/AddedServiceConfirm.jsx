"use client"

import styles from "./AddedServiceConfirm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function AddedServiceConfirm() {
  return (
    <section className={styles.confirmationBox}>
      <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
      <h1 className={styles.title}>SERVIZIO AGGIUNTO</h1>
      <p className={styles.parag}>
        Il servizio è stato aggiunto correttamente al database.
      </p>
    </section>
  );
}