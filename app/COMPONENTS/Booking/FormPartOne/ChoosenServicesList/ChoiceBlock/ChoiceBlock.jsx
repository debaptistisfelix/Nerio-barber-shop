"use client"


import styles from "./ChoiceBlock.module.css";
import { useBookingContext } from "@/app/COMPONENTS/Context/BookingContext";

export default function ChoiceBlock({ service }) {

  return (
    <section className={styles.choiceBlock}>
      <h3 className={styles.service}>{service.name}</h3>
    </section>
  );
}