import styles from "./BookingBlock.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import timeConverter from "../../HelperFunctions/timeConverter";

export default function BookingBlock({ booking, removeBooking }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const bookingDateElement = new Date(booking.time);

  const bookingTime = timeConverter(bookingDateElement, booking.time);

  const totalDuration = booking.services.reduce((acc, curr) => {
    return acc + curr.duration;
  }, 0);
  const bookingEndTime = new Date(
    bookingDateElement.getTime() + totalDuration * 60000
  )
    .toLocaleTimeString("it-IT")
    .slice(0, 5);
  console.log(bookingEndTime);

  return (
    <section
      style={{ minHeight: showDetails === true && "120px" }}
      className={styles.block}
    >
      <div
        onClick={() => {
          setShowDetails(!showDetails);
        }}
        className={styles.blockHeader}
        style={{
          boxShadow: showDetails === true && " 0px 10px 20px rgba(0,0,0,0.5)",
          backgroundColor:
            showDeleteConfirmation === true ? "brown" : "var(--dark-grey)",
        }}
      >
        <div className={styles.sideA}>
          <h3 className={styles.time}>
            {bookingTime} - {bookingEndTime}
          </h3>
          <h3 className={styles.barber}>({booking.barber})</h3>
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
                  removeBooking(booking._id);
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
      {showDetails === true && (
        <div
          style={{
            backgroundColor:
              showDeleteConfirmation === true ? "brown" : "var(--dark-grey)",
          }}
          className={styles.bookingContent}
        >
          <div className={styles.services}>
            {booking.services.map((service) => {
              return (
                <div className={styles.service} key={uuidv4()}>
                  <h3 className={styles.serviceName}>{service.service}</h3>
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
      )}
    </section>
  );
}
