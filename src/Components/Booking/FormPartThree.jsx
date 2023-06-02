import styles from "./FormPartThree.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import { BookingContext } from "../Contexts/BookingContext";
import moment from "moment";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import timeConverter from "../HelperFunctions/timeConverter";

export default function FormPartThree({ bookingSectionRef }) {
  const {
    name,
    email,
    date,
    time,
    services,
    totalPrice,
    totalDuration,
    temporaryBarber,
    showSecondForm,
    setIsLoading,
    isLoading,
    setError,
    resetEverything,
  } = useContext(BookingContext);

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const timeVariableToSendToDB = `${moment(date).format(
    "YYYY-MM-DD"
  )}T${time}:00.000Z`;

  const italianTimeVariable = moment(date)
    .utc()
    .set({
      hour: time.split(":")[0],
      minute: time.split(":")[1],
    });

  console.log("date:", date);
  console.log("timeVariableToSendToDB", timeVariableToSendToDB);
  console.log("italianTimeVariable", italianTimeVariable._d);

  const localTime = timeConverter(date, time);

  const servicesToShowToCustomer = services.map((service) => {
    return service.service;
  });

  const submitBookingRequest = async () => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/appointment", {
        name: name,
        email: email,
        date: moment(date).format("YYYY-MM-DD"),
        duration: totalDuration,
        services: services,
        barber: temporaryBarber,
        time: timeVariableToSendToDB,
      });
      setError(null);
      setIsLoading(false);
      setIsBookingConfirmed(true);
      bookingSectionRef.current &&
        bookingSectionRef.current.scrollIntoView({
          behavior: "smooth",
        });
      console.log(response.data.data.newAppointment);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
      setIsBookingConfirmed(false);
    }
  };

  return (
    <section className={styles.container}>
      <p className={styles.intro}>
        Dai un'occhiata al riepilogo del tuo appuntamento e conferma la
        prenotazione!
      </p>

      {isBookingConfirmed ? (
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
              resetEverything();
              setIsBookingConfirmed(false);
            }}
            className={styles.backToBeginningBtn}
          >
            Torna al menù delle Prenotazioni
          </button>
        </main>
      ) : (
        <main className={styles.summaryBox}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={styles.leftArrow}
            onClick={showSecondForm}
          />
          <div onClick={showSecondForm} className={styles.mobileBackBtn}>
            <FontAwesomeIcon
              title="Torna Indietro"
              icon={faChevronLeft}
              className={styles.leftArrowMobile}
            />
            INDIETRO
          </div>
          <div className={styles.bookingInfo}>
            <h2 className={styles.bookingInfoTitle}>IL TUO APPUNTAMENTO</h2>

            <div className={styles.bookingBox}>
              <h4 className={styles.label}>Servizi:</h4>
              <ul className={styles.labelContent}>
                {servicesToShowToCustomer.map((service) => {
                  return (
                    <li key={uuidv4()} className={styles.service}>
                      {service}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.bookingBox}>
              <h4 className={styles.label}>Data</h4>
              <h4 className={styles.labelContent}>
                {localTime} - {moment(date).format("YYYY-MM-DD")}
              </h4>
            </div>

            <div className={styles.bookingBox}>
              <h4 className={styles.label}>Barbiere:</h4>
              <h4 className={styles.labelContent}>{temporaryBarber}</h4>
            </div>
            <div className={styles.bookingBox}>
              <h4 className={styles.label}>Prezzo</h4>
              <h4 className={styles.labelContent}>€{totalPrice}</h4>
            </div>

            <div className={styles.bookingBox}>
              <h4 className={styles.label}>Nome:</h4>
              <h4 className={styles.labelContent}>{name}</h4>
            </div>
            <div className={styles.bookingBox}>
              <h4 className={styles.label}>Email:</h4>
              <h4 className={styles.labelContent}>{email}</h4>
            </div>
          </div>

          <div className={styles.customerInfo}>
            <h2 className={styles.bookingInfoTitle}>ULTIMO STEP</h2>
            <p className={styles.btnIntro}>
              Dai un'ulitma occhiata alla tua prenotazione e conferma premendo
              il tasto sottostante. Appena la prenotazione sarà inserita nella
              nostra Agenda riceverai una mail di conferma.
            </p>

            <button
              onClick={() => {
                submitBookingRequest();
              }}
              className={styles.confirmBtn}
            >
              {isLoading === true ? <Loader /> : "CONFERMA PRENOTAZIONE"}
            </button>
          </div>
        </main>
      )}
    </section>
  );
}
