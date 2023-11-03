"use client"

import styles from "./ServiceBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useBookingContext } from "@/app/COMPONENTS/Context/BookingContext";


export default function ServiceBox({ service}) {
  const {addServiceToBooking, removeServiceFromBooking, booking} = useBookingContext();


  const handleClick = (service) => {
    if(booking.services.includes(service)) {
      removeServiceFromBooking(service.id);
    } else {
      addServiceToBooking(service);
    }
  }

  return (
    <div
      onClick={() => handleClick(service)}
      className={`${styles.serviceLine} ${booking.services.includes(service) && styles.active}`}
    >
      <h4 className={`${styles.service}`}>
        {!booking.services.includes(service) && <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />}
        {booking.services.includes(service) && <FontAwesomeIcon icon={faMinus} className={styles.checkIcon} />}
        {service.name}
      </h4>
      <h4 className={`${styles.duration} ${booking.services.includes(service) && styles.active}`}>
        <FontAwesomeIcon icon={faClock} className={`${styles.clockIcon} ${booking.services.includes(service) && styles.active}`} />
        {service.duration} min.
      </h4>
      <h4 className={`${styles.price} ${booking.services.includes(service) && styles.active}`}>€{service.price}</h4>
     
    </div>
  );
}