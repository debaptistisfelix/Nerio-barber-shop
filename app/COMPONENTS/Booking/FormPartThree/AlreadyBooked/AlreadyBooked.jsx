import styles from "./AlreadyBooked.module.css";

export default function AlreadyBooked({statusCode, returnToSecondForm, backToStart,}) {
    return (
       <>
       {statusCode === 400 &&  <section className={styles.alreadyBooked}>
            <h2 className={styles.errorTitle}>Errore di Prenotazione</h2>
            <p className={styles.errorMsg}>L'orario scelto non risulta più disponibile. E' necessario sceglierne uno diverso. </p>
            <p
            onClick={returnToSecondForm}
            className={styles.backBtn}>Scegli un altro Orario</p>
        </section>}

        {statusCode === 500 &&  <section className={styles.alreadyBooked}>
            <h2 className={styles.errorTitle}>Errore di Prenotazione</h2>
            <p className={styles.errorMsg}>Si è verificato un errore nel generare la prenotazione. Riprovare tra qualche minuto.</p>
            <p
            onClick={backToStart}
            className={styles.backBtn}>Riprova</p>
        </section>}
       </>
    )
};