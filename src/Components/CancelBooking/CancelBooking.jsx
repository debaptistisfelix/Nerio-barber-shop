import styles from "./CancelBooking.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CancelBooking() {
  const [cancellationConfirmed, setCancellationConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleCancellationRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://barber-server.cyclic.app/appointment/${id}`
      );
      console.log(response);
      setIsLoading(false);
      setCancellationConfirmed(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error);
      setCancellationConfirmed(false);
    }
  };

  return (
    <section className={styles.cancelBooking}>
      <main className={styles.main}>
        <div className={styles.shader}></div>
        {cancellationConfirmed ? (
          <div className={styles.confirmation}>
            <FontAwesomeIcon
              data-aos="fade-down"
              icon={faCircleCheck}
              className={styles.icon}
            />
            <h1 data-aos="fade-right" className={styles.confirmationTitle}>
              APPUNTAMENTO CANCELLATO
            </h1>
          </div>
        ) : (
          <div className={styles.cancelContainer}>
            <h1 data-aos="fade-down" className={styles.title}>
              CANCELLA APPUNTAMENTO
            </h1>
            <p data-aos="fade-right" className={styles.parag}>
              Premi il pulsante per cancellare il tuo appuntamento presso il
              nostro Barber-shop
            </p>
            <button
              onClick={handleCancellationRequest}
              data-aos="flip-down"
              data-aos-delay="400"
              className={styles.btn}
            >
              {isLoading === true ? (
                <p className={styles.btnLoading}>ATTENDI</p>
              ) : (
                "ANNULLA"
              )}
            </button>
          </div>
        )}
      </main>
    </section>
  );
}
