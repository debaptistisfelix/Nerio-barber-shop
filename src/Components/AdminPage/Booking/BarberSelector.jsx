import styles from "./BarberSelector.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function BarberSelector({ chooseBarber }) {
  const [barbers, setBarbers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get(
          "https://barber-server.cyclic.app/barbers"
        );
        setBarbers(response.data.data.barbers);
        console.log(response);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Errore nel caricamento dei barbieri");
      }
    };
    fetchBarbers();
  }, []);

  return (
    <section className={styles.barberChoiceBox}>
      {/* <label className={styles.label}>Barbiere:</label> */}
      <div className={styles.barberOptions}>
        {barbers !== null &&
          barbers.map((barber) => {
            return (
              <h3
                onClick={() => chooseBarber(barber.value)}
                key={barber.name}
                className={styles.barber}
              >
                {barber.name}
              </h3>
            );
          })}
      </div>
    </section>
  );
}
