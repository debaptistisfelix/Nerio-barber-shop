import styles from "./BookingConfirmation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";


export default function BookingConfirmation({backToStart, resetBookingConfirmationState}) {
  return (
    <main className={styles.confirmationContainer}>
    <FontAwesomeIcon
      icon={faEnvelopeCircleCheck}
      className={styles.iconEmail}
    />
    <h1 className={styles.confirmationTitle}>PRENOTAZIONE CONFERMATA</h1>
    <p className={styles.confirmationIntro}>
      Ti abbiamo inviato un' email come prememoria. In caso di problemi
      puoi disdire la prenotazione tramite la mail di conferma o
      chiamandoci in Negozio.
    </p>
    <button
      onClick={() => {
        backToStart();
        resetBookingConfirmationState();
      }}
      className={styles.backToBeginningBtn}
    >
      Torna al menù delle Prenotazioni
    </button>
  </main>
  )
}
