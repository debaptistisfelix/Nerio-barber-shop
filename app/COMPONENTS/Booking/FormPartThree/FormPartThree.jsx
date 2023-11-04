"use client"


import styles from "./FormPartThree.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import notify from "@/lib/toastNotify";
import { useBookingContext } from "../../Context/BookingContext";

import PointLoader from "../../Loader/PointLoader/PointLoader";
import { useState } from "react";

import AlreadyBooked from "./AlreadyBooked/AlreadyBooked";
import Link from "next/link";
import ConvertDBTimeToOnlyTime from "@/lib/TimeDateConverters/ConvertDBTimeToOnlyTime";
import BookingConfirmation from "./BookingConfirmation/BookingConfirmation";
import Recap from "./Recap/Recap";

export default function FormPartThree({ bookingSectionRef }) {
  const {
  confirmationStatus, setConfirmationStatus,
    backToStart ,
    booking,
    bookingTotals,
    returnToSecondForm
  } = useBookingContext();

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [timeSlotNoMoreAvailable, setTimeSlotNoMoreAvailable] = useState(false);

  const handleAccepTerms = () => {
    setAcceptedTerms(!acceptedTerms);
  };


  const resetBookingConfirmationState = () => {
    setIsBookingConfirmed(false);
    setAcceptedTerms(false);
    setTimeSlotNoMoreAvailable(false);
  }



  // Format the time as "HH:mm"
  const timePart = ConvertDBTimeToOnlyTime(booking?.time)

  const servicesToShowToCustomer = booking?.services.map((service) => {
    return service.name;
  });

  const submitBookingRequest = async () => {
    setConfirmationStatus({ isLoading: true, isError: false, errorStatusCode: null });
    event.preventDefault();
    const serviceIds = booking?.services.map((service) => {return service.id})
    try {
      const response = await fetch(
        "/api/appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: booking?.name,
            email: booking?.email,
            date: booking?.date,
            duration: bookingTotals?.totalDuration,
            serviceIds: serviceIds,
            barberId: booking?.barber.id,
            time: booking?.time,
          }),
        }
      );
      if(response.status === 400) {
        setConfirmationStatus({ isLoading: false, isError: true,  errorStatusCode: 400  });
        setTimeSlotNoMoreAvailable(true);
        return;
      }
      setConfirmationStatus({ isLoading: false, isError: false, errorStatusCode: null  });
      setIsBookingConfirmed(true);
      bookingSectionRef.current &&
        bookingSectionRef.current.scrollIntoView({
          behavior: "smooth",
        });
  
    } catch (error) {
      console.log(error.response);
      setConfirmationStatus({ isLoading: false, isError: true, errorStatusCode: 500  });
      setIsBookingConfirmed(false);
    }
  };

 

  return (
    <section className={styles.container}>
      {confirmationStatus.isLoading && <main className={styles.confirmationContainer}><PointLoader pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"30px"} loaderWidth={"100px"} loaderMargin={"50px 0"} /></main>}

      {confirmationStatus.isError && confirmationStatus.errorStatusCode !== null  && <AlreadyBooked statusCode={confirmationStatus?.errorStatusCode} returnToSecondForm={returnToSecondForm} backToStart={backToStart} />}

      {confirmationStatus.isLoading === false && isBookingConfirmed === true && <BookingConfirmation backToStart={backToStart} resetBookingConfirmationState={resetBookingConfirmationState} />
        }
        {confirmationStatus.isLoading === false && isBookingConfirmed === false && 
        <>
        <p className={styles.intro}>
        Dai un'occhiata al <b>riepilogo</b> del tuo appuntamento e <b>conferma</b> la
        prenotazione!
       </p>
        <main className={styles.summaryBox}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={styles.leftArrow}
            onClick={returnToSecondForm}
          />
          <div onClick={returnToSecondForm} className={styles.mobileBackBtn}>
            <FontAwesomeIcon
              title="Torna Indietro"
              icon={faChevronLeft}
              className={styles.leftArrowMobile}
            />
            INDIETRO
          </div>
          
          <Recap booking={booking} bookingTotals={bookingTotals} timePart={timePart} servicesToShowToCustomer={servicesToShowToCustomer} />

          <div className={styles.customerInfo}>
            <h2 className={styles.bookingInfoTitle}>ULTIMO STEP</h2>
            <p className={styles.btnIntro}>
             Appena la prenotazione sarà inserita nella
              nostra Agenda riceverai una mail di conferma.
            </p>

            <section className={styles.TermsBox}>
              <input
                onChange={handleAccepTerms}
                id="check"
                type="checkbox"
                value={acceptedTerms}
                className={styles.checkbox}
              />
              <label htmlFor="check" className={styles.terms}>
                Accetto{" "}
                <Link className={styles.termsLink} target="_blank" href="/terms">
                  Termini e Condizioni d'uso dei Dati personali
                </Link>
              </label>
            </section>

            <button
              disabled={!acceptedTerms}
              onClick={() => {
                if (acceptedTerms === false) {
                  notify("Accettare Termini e condizione per confermare la prenotazione", "error");
                  return;
                }
                bookingSectionRef.current &&
                bookingSectionRef.current.scrollIntoView({
                  behavior: "smooth",
                });
                submitBookingRequest();
              }}
              className={styles.confirmBtn}
            >
            CONFERMA PRENOTAZIONE
            </button>
          </div>
        </main>
        </>
      }
    </section>
  );
}