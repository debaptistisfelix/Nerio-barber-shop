"use client"

import styles from "./Agenda.module.css";
import axios from "axios";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import BookingBlock from "./BookingBlock/BookingBlock";
import "./DateTime.css"
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";
import fetchBookingsOfTheDay from "@/lib/FetchData/fetchBookingsOfTheDay";
import FullScreenLoader from "../../FullScreenLoader/FullScreenLoader";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import notify from "@/lib/toastNotify";
import ConvertToDateUTC from "@/lib/TimeDateConverters/ConvertToDateUTC";



export default function Agenda() {
  const [date, setDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {isFullscreenLoading, setIsFullscreenLoading} = useAdminBookingContext();

  let formattedDate;
  if (date === null) {
    formattedDate = "Nessuna data selezionata";
  } else {
    formattedDate = moment(date).format("DD-MM-YYYY");
  }


  const handleDateChange = (e) => {
    setDate(e._d);
  };

  

 

  useEffect(() => {
    const getBookingsOfTheDay = async () => {
      try {
        if (date !== null) {
          setIsLoading(true);
            const inputDate = ConvertToDateUTC(date);
          const bookings = await fetchBookingsOfTheDay(inputDate);

          const bookingsTosort = bookings.sort(
            (a, b) => {
              const timeA = new Date(a.time).getTime();
              const timeB = new Date(b.time).getTime();
              return timeA - timeB;
            }
          );
          setBookings(bookingsTosort);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError("Errore nel caricamento degli appuntamenti");
      }
    };
    getBookingsOfTheDay();
  }, [date]);

  const removeBooking = async (id) => {
    try {
      setIsFullscreenLoading(true);
    const response = await fetch(
      `/api/appointment/${id}`,{
        method: "DELETE"
      }
    );
    setBookings(bookings.filter((booking) => booking.id !== id));
    setIsFullscreenLoading(false);
    notify("Appuntamento cancellato con successo", "success");
    } catch (error) {
      console.log(error)
      setIsFullscreenLoading(false);
      notify("Si è verificato un errore durante la cancellazione dell'appuntamento", "error");
    }
  };

  return (
    <>
    <section className={styles.agenda}>
      <h1 className={styles.agendaTitle}>I TUOI APPUNTAMENTI</h1>
      <main className={styles.agendaContainer}>
        <div className={styles.dateSelector}>
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
              <td {...props} key={uuidv4()} className={styles.datePickerDay}
              
              style={{backgroundColor: currentDate.isSame(date, "day") ? "var(--dark-yellow)" : "var(--dark-grey)",
              color: currentDate.isSame(date, "day") ? "var(--dark-grey)" : "var(--dark-yellow)"}}>
                {currentDate.date()}
              </td>
            )}
          />
        </div>
        <div className={styles.bookingsContainer}>
{isLoading === true && bookings.length === 0 && <div className={styles.loaderContainer}><PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/></div>}
          {bookings.length === 0 && isLoading === false && (
            <div className={styles.noResults}>
              <h3 className={styles.noResultTitle}>
                Nessun appuntamento per questa giornata.
              </h3>
            </div>
          )}
          {bookings.length !== 0 && isLoading === false && (
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
    {isFullscreenLoading === true && <FullScreenLoader />}
    </>
  );
}