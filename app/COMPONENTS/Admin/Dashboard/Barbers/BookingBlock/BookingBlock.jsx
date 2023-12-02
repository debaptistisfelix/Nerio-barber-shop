"use client"

import styles from "./BookingBlock.module.css";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ConvertDBTimeToItalianTime from "@/lib/TimeDateConverters/ConvertTimeToItalianTimeZOne";

export default function BookingBlock({ booking }) {
  



  const { time, name, email, services } = booking;
  const bookingTimeStart = ConvertDBTimeToItalianTime(time);

  const totalDuration = booking.services.reduce((acc, service) => {
    return acc + service.duration;
  }, 0);

  const totalPrice = booking.services.reduce((acc, service) => {
    return acc + service.price;
  }, 0);

  const bookingEndTimeUTC = 
  Date.parse(booking.time) + totalDuration * 60000

  const bookingEndTime = ConvertDBTimeToItalianTime(bookingEndTimeUTC);



  return (
    <section className={styles.block}>
      <header
        className={`${styles.header}`}
      >
        <div className={styles.sideA}>
          <h3 className={styles.time}>
            {bookingTimeStart} - {bookingEndTime}
          </h3>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.sideB}>
          <h3 className={styles.price}>€ {totalPrice}</h3>
        </div>
      </header>
     
        <main
          className={`${styles.bottom}`}
        >
          <div className={styles.services}>
            {booking &&
              services.map((service) => {
                return (
                  <div key={uuidv4()} className={styles.serviceLine}>
                    <h3 className={styles.serviceName}>{service.name}</h3>;
                    <h3 className={styles.serviceDuration}>
                      <FontAwesomeIcon
                        icon={faClock}
                        className={styles.clock}
                      />{" "}
                      {service.duration} min.
                    </h3>
                  </div>
                );
              })}
          </div>
          <div className={styles.emailLine}>
            <h3 className={styles.emailLabel}>Email:</h3>
            <h3 className={styles.email}>{email}</h3>
          </div>
        </main>

    </section>
  );
}