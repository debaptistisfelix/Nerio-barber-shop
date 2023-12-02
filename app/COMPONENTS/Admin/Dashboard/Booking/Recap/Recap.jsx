"use client"

import styles from "./Recap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import ConvertDBTimeToOnlyTime from "@/lib/TimeDateConverters/ConvertDBTimeToOnlyTime";
import { v4 as uuidv4 } from "uuid";
import notify from "@/lib/toastNotify";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import ConvertToDateUTC from "@/lib/TimeDateConverters/ConvertToDateUTC";
import ConvertDBTimeToItalianTime from "@/lib/TimeDateConverters/ConvertTimeToItalianTimeZOne";

export default function Recap() {
  const {
    formattedDate,
    time,
    removeTime,
    name,
    removeName,
    email,
    removeEmail,
    date,
    removeDate,

    resetAll,
    handleBookingConfirmation,

    booking,
    setBooking,
    bookingTotals,
    removeServiceFromBooking,
    removeBookingBarber,
    isFullscreenLoading, setIsFullscreenLoading
  } = useAdminBookingContext()



  const submitBookingRequest = async () => {
    setIsFullscreenLoading(true);
    const DateUTC = ConvertToDateUTC(booking?.date);
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
            date: DateUTC,
            duration: bookingTotals.totalDuration,
            serviceIds: booking?.services.map((service) => service.id),
            barberId: booking?.barber.id,
            time: booking.time
          }),
        }
      );

      setIsFullscreenLoading(false);
      resetAll();
      notify("Prenotazione effettuata con successo", "success");
    } catch (error) {
     setIsFullscreenLoading(false);
      console.log(error);
      notify("Errore durante la prenotazione", "error");
    }
  };

  

  // Format the time as "HH:mm"
  const timePart = ConvertDBTimeToItalianTime(time);

  useEffect(() => {
    if(booking.name!== "" && booking.email !== "" && booking.services.length !== 0 && booking.barber !== null && booking.date !== null && booking.time !== null){
      submitBookingRequest();
    }
  },[
    booking
  ])

  return (
    <section className={styles.recap}>
      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Servizi:</h3>
        <div className={styles.servicesBox}>
          {booking?.services.length !== 0 &&
            booking?.services.map((service) => {
              return (
                <div key={uuidv4()} className={styles.block}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <FontAwesomeIcon
                    onClick={() =>removeServiceFromBooking(service.id)}
                    icon={faX}
                    className={styles.icon}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Barbiere:</h3>
        {booking?.barber !== null && (
          <div className={styles.block}>
            <h3 className={styles.recapBarber}>{booking?.barber.name === "Any Barber" ? "Indifferente" : booking?.barber?.name}</h3>
            <FontAwesomeIcon
              onClick={() => removeBookingBarber()}
              icon={faX}
              className={styles.icon}
            />
          </div>
        )}
      </div>
      <div className={`${styles.recapLine} ${styles.tabletLine}`}>
        <div className={styles.recapDateLine}>
          <h3 className={styles.recapLabel}>Data:</h3>
          {formattedDate && (
            <div className={styles.block}>
              <h3 className={styles.recapDate}>{formattedDate}</h3>
              <FontAwesomeIcon
                onClick={() => removeDate()}
                icon={faX}
                className={styles.icon}
              />
            </div>
          )}
        </div>
        <div className={styles.recapDateLine}>
          <h3 className={styles.recapLabel}>Ora:</h3>
          {time && (
            <div className={styles.block}>
              <h3 className={styles.recapDate}>
                {date && time && `${timePart}`}
              </h3>
              <FontAwesomeIcon
                onClick={() => removeTime()}
                icon={faX}
                className={styles.icon}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Nome:</h3>
        {name !== "" && (
          <div className={styles.block}>
            <h3 style={{ fontWeight: "400" }} className={styles.recapDate}>
              {name}
            </h3>
            <FontAwesomeIcon
              onClick={() => removeName()}
              icon={faX}
              className={styles.icon}
            />
          </div>
        )}
      </div>
      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Email:</h3>
        {email !== "" && (
          <div className={styles.block}>
            <h3 style={{ fontWeight: "400" }} className={styles.recapDate}>
              {email}
            </h3>
            <FontAwesomeIcon
              onClick={() => removeEmail()}
              icon={faX}
              className={styles.icon}
            />
          </div>
        )}
      </div>

      <button
        disabled={
          booking.services.length === 0 ||
          booking?.barber === null ||
          !formattedDate ||
          !time ||
          name === "" || email === ""
        }
        className={styles.confirmBtn}
        onClick={() => {
          setBooking({
            name: name,
            email: email,
            date: date,
            time: time,
            barber: booking?.barber,
            services: booking?.services,
          })
          window.scrollTo(0, 0);
        }}
      >
        CONFERMA
      </button>
    </section>
  );
}