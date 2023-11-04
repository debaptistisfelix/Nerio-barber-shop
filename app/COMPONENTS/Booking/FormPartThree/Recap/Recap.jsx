import styles from "./Recap.module.css";
import { v4 as uuidv4 } from "uuid";
import React from 'react'
import moment from "moment";

export default function Recap({booking, bookingTotals, timePart, servicesToShowToCustomer}) {
  return (
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
        {timePart} - {moment(booking?.date).format("YYYY-MM-DD")}
      </h4>
    </div>

    <div className={styles.bookingBox}>
      <h4 className={styles.label}>Barbiere:</h4>
      <h4 className={styles.labelContent}>{booking?.barber.name}</h4>
    </div>
    <div className={styles.bookingBox}>
      <h4 className={styles.label}>Prezzo</h4>
      <h4 className={styles.labelContent}>€{bookingTotals.totalPrice}</h4>
    </div>

    <div className={styles.bookingBox}>
      <h4 className={styles.label}>Nome:</h4>
      <h4 className={styles.labelContent}>{booking?.name}</h4>
    </div>
    <div className={styles.bookingBox}>
      <h4 className={styles.label}>Email:</h4>
      <h4 className={styles.labelContent}>{booking?.email}</h4>
    </div>
  </div>
  )
}
