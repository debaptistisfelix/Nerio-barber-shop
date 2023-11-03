"use client"

import styles from "./BarberBookings.module.css";
import { useEffect, useState } from "react";
import BookingBlock from "../BookingBlock/BookingBlock";

export default function BarberBookings({ bookings, displayedBarber }) {
  const [displayedList, setDisplayedList] = useState(null);

  useEffect(() => {
    if (bookings) {
      const filteredBookings = bookings
        .filter((booking) => {
          return booking.barber.name === displayedBarber;
        })
        .sort((a, b) => {
          const timeA = new Date(a.time).getTime();
          const timeB = new Date(b.time).getTime();
          return timeA - timeB;
        });
      setDisplayedList(filteredBookings);
    }
  }, [displayedBarber]);

  return (
    <section className={styles.bookingsListBox}>
      <h1 className={styles.title}>
        APPUNTAMENTI DEL GIORNO DI:{" "}
        {displayedBarber === null ? (
          <p className={styles.noBarb}>(seleziona un barbiere)</p>
        ) : (
          <p className={styles.theBarber}>{displayedBarber.toUpperCase()}</p>
        )}
      </h1>
      <main className={styles.list}>
        {displayedBarber !== null && displayedList !== null && displayedList.length === 0 && (
          <p className={styles.noResults}>
            {displayedBarber} non ha appuntamenti prenotati per oggi.
          </p>
        )}
        {displayedList !== null &&
          displayedList.length > 0 &&
          displayedList.map((booking) => {
            return <BookingBlock booking={booking} key={booking.id} />;
          })}
      </main>
    </section>
  );
}