import styles from "./Agenda.module.css";
import axios from "axios";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import BookingBlock from "./BookingBlock";

export default function Agenda() {
  const [date, setDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  let formattedDate;
  if (date === null) {
    formattedDate = "Nessuna data selezionata";
  } else {
    formattedDate = moment(date).format("DD-MM-YYYY");
  }

  let formattedDateForServerRequest;
  if (date === null) {
    formattedDateForServerRequest = "";
  } else {
    formattedDateForServerRequest = moment(date).format("YYYY-MM-DD");
  }

  const handleDateChange = (e) => {
    setDate(e._d);
  };

  useEffect(() => {
    const getBookingsOfTheDay = async () => {
      try {
        if (date !== null) {
          const response = await axios.get(
            `http://localhost:8001/appointment?date=${formattedDateForServerRequest}`
          );

          const bookingsTosort = response.data.data.appointments.sort(
            (a, b) => {
              const timeA = new Date(a.time).getTime();
              const timeB = new Date(b.time).getTime();
              return timeA - timeB;
            }
          );
          setBookings(bookingsTosort);
        }
      } catch (error) {
        console.log(error);
        setError("Errore nel caricamento degli appuntamenti");
      }
    };
    getBookingsOfTheDay();
  }, [date]);

  const removeBooking = async (id) => {
    const response = await axios.delete(
      `http://localhost:8001/appointment/${id}`
    );
    console.log(response.data);
    setBookings(bookings.filter((booking) => booking._id !== id));
  };

  return (
    <section className={styles.agenda}>
      <h1 className={styles.agendaTitle}>CONTROLLA I TUOI APPUNTAMENTI</h1>
      <main className={styles.agendaContainer}>
        <div className={styles.dateSelector}>
          {/* <p className={styles.agendaParag}>Seleziona una data.</p> */}
          {formattedDate === "Nessuna data selezionata" && (
            <p className={styles.agendaParag}>Nessuna data selezionata</p>
          )}
          {formattedDate !== "Nessuna data selezionata" && (
            <p className={styles.choosenDate}>{formattedDate}</p>
          )}
          <Datetime
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            value={date}
            onChange={handleDateChange}
            inputProps={{
              className: styles.dateInput,
            }}
            className={styles.datetimeComponent}
            renderDay={(props, currentDate) => (
              <td {...props} className={styles.datePickerDay}>
                {currentDate.date()}
              </td>
            )}
          />
        </div>
        <div className={styles.bookingsContainer}>
          {bookings.length === 0 && (
            <div className={styles.noResults}>
              <h3 className={styles.noResultTitle}>
                Nessun appuntamento per questa giornata.
              </h3>
            </div>
          )}
          {bookings.length !== 0 && (
            <div className={styles.bookingList}>
              {bookings.map((booking) => {
                return (
                  <BookingBlock
                    removeBooking={removeBooking}
                    booking={booking}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
