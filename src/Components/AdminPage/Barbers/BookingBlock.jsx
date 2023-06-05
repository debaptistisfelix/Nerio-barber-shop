import styles from "./BookingBlock.module.css";
import moment from "moment";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import timeConverter from "../../HelperFunctions/timeConverter";

export default function BookingBlock({ booking }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const { time, name, email, services } = booking;
  const bookingTimeStart = moment(time).format("HH:mm");

  const totalDuration = booking.services.reduce((acc, service) => {
    return acc + service.duration;
  }, 0);

  const totalPrice = booking.services.reduce((acc, service) => {
    return acc + service.price;
  }, 0);

  const bookingTimeEnd = moment(time)
    .add(totalDuration, "minutes")
    .format("HH:mm");

  return (
    <section className={styles.block}>
      <header
        style={{
          borderRadius: showDetails === true ? "5px 5px 0px 0px" : "5px",
        }}
        onClick={toggleDetails}
        className={`${styles.header} ${showDetails === true && styles.active}`}
      >
        <div className={styles.sideA}>
          <h3 className={styles.time}>
            {bookingTimeStart} - {bookingTimeEnd}
          </h3>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.sideB}>
          <h3 className={styles.price}>€ {totalPrice}</h3>
        </div>
      </header>
      {showDetails === true && (
        <main
          className={`${styles.bottom} ${
            showDetails === true && styles.active
          }`}
        >
          <div className={styles.services}>
            {booking &&
              services.map((service) => {
                return (
                  <div className={styles.serviceLine}>
                    <h3 className={styles.serviceName}>{service.service}</h3>;
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
      )}
    </section>
  );
}
