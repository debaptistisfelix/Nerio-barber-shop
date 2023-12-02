"use client"
import styles from "./BookingBlock.module.css";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import ConvertUTCToItalianTime from "@/lib/TimeDateConverters/ConvertUTCtoItalianTime";


export default function BookingBlock({ booking, removeBooking }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const blockRef = useRef(null);


  const bookingTime = ConvertUTCToItalianTime(booking.time);

  const totalDuration = booking.services.reduce((acc, curr) => {
    return acc + curr.duration;
  }, 0);


  const bookingEndTimeUtc = 
    Date.parse(booking.time) + totalDuration * 60000
  const bookingEndTime = ConvertUTCToItalianTime(bookingEndTimeUtc);  


  return (
    <section
    style={{
         
      backgroundColor:
        showDeleteConfirmation === true ? "darkred" : "var(--dark-grey)",
    }}
     
      className={styles.block}
      ref={blockRef}
    >
      <div
       
        className={styles.blockHeader}
        
      >
        <div className={styles.sideA}>
          <h3 className={styles.time}>
            {bookingTime} - {bookingEndTime}
          </h3>
          <h3 className={styles.barber}>({booking.barber.name})</h3>
        </div>
        <div className={styles.sideB}>
          <h3 className={styles.name}>{booking.name}</h3>
          {showDeleteConfirmation === false ? (
            <div className={styles.interactions}>
              <FontAwesomeIcon
                onClick={(event) => {
                  event.stopPropagation();
                  setShowDeleteConfirmation(true);
                }}
                icon={faX}
                className={styles.icon}
              />
            </div>
          ) : (
            <div className={styles.interactions}>
              <FontAwesomeIcon
                onClick={(event) => {
                  event.stopPropagation();
                    removeBooking(booking.id);
                }}
                icon={faCheck}
                className={styles.icon}
              />
              <FontAwesomeIcon
                onClick={(event) => {
                  event.stopPropagation();
                  setShowDeleteConfirmation(false);
                }}
                icon={faX}
                className={styles.icon}
              />
            </div>
          )}
        </div>
      </div>

        <div
         
          className={styles.bookingContent}
        >
          <div className={styles.services}>
            {booking.services.map((service) => {
              return (
                <div className={styles.service} key={uuidv4()}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <h3 className={styles.serviceDuration}>
                    <FontAwesomeIcon
                      icon={faClock}
                      className={`${styles.icon} ${styles.clockIcon}`}
                    />
                    {service.duration} min
                  </h3>
                </div>
              );
            })}
          </div>
          <div className={styles.emailBox}>
            <label className={styles.label}>Email Cliente:</label>
            <p className={styles.email}>{booking.email}</p>
          </div>
        </div>
    </section>
  );
}