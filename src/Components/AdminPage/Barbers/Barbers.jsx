import styles from "./Barbers.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Barbers() {
  const [barbers, setBarbers] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8001/barbers");

        const filteredBarbers = response.data.data.barbers.filter((barber) => {
          return barber.name !== "Indifferente";
        });
        setBarbers(filteredBarbers);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchBarbers();
  }, []);

  return (
    <section className={styles.barbersContainer}>
      <h1 className={styles.title}>I TUOI BARBIERI</h1>
      <p className={styles.intro}>
        Seleziona un barbiere dalla tua lista per visualizzare tutti i suoi
        appuntamenti di oggi, oppure aggiungi o rimuovi un barbiere.
      </p>
      <main className={styles.main}>
        <section className={styles.infoDisplayer}></section>
        <section className={styles.formAndList}></section>
      </main>
    </section>
  );
}
