"use client"

import styles from "./Barbers.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import BarbersList from "./BarbersList/BarbersList";
import BarberBookings from "./BarberBookings/BarberBookings";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import FullScreenLoader from "../../FullScreenLoader/FullScreenLoader";
import notify from "@/lib/toastNotify";

export default function Barbers() {
  const [barbers, setBarbers] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [isLoadingBarbers, setIsLoadingBarbers] = useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);
  const [errorBarbers, setErrorBarbers] = useState(null);
  const [displayedBarber, setDisplayedBarber] = useState(null);
  const {isFullscreenLoading, setIsFullscreenLoading} = useAdminBookingContext()


  const showBarbersBookings = (barber) => {
    setDisplayedBarber(barber);
  };

  useEffect(() => {
    const fetchBarbers = async () => {
      setIsLoadingBarbers(true);
      try {
        const response = await axios.get(
          "/api/barber"
        );
        const filteredBarbers = response.data.filter((barber) => {
          return barber.name !== "Any Barber";
        });
        setBarbers(filteredBarbers);
        setErrorBarbers(null);
        setIsLoadingBarbers(false);
      } catch (error) {
        setErrorBarbers(error);
        setIsLoadingBarbers(false);
      }
    };
    const fetchTodayBookings = async () => {
      setIsLoadingBookings(true);
      const today = new Date();
      const todayFirstString = moment(today).format("YYYY-MM-DD");
      const todayString = todayFirstString + "T00:00:00.000Z";
      try {
        const response = await axios.get(
          `/api/appointment?date=${todayString}`
        );
        setBookings(response.data);
      } catch (error) {
        setErrorBookings(error);
        setIsLoadingBookings(false);
        console.log(error);
      }
    };
    fetchBarbers();
    fetchTodayBookings();
  }, []);

  const removeBarber = async (barberId) => {
    try {
      setIsFullscreenLoading(true)
      const response = await axios.delete(
        `/api/barber/${barberId}`
      );
      const filteredBarbers = barbers.filter((barber) => {
        return barber.id !== barberId;
      });
      setBarbers(filteredBarbers);
      setDisplayedBarber(null);
      setIsFullscreenLoading(false)
      notify("Barbiere cancellato con successo", "success");
    } catch (error) {
      console.log(error);
      setIsFullscreenLoading(false)
      notify("Si è verificato un errore durante la cancellazione del barbiere", "error");
    }
  };

  const addBarber = async (barberName) => {
    try {
      setIsFullscreenLoading(true)
      const response = await fetch(
        "/api/barber",
        { method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: barberName,
        }),
        }
      );
      const data = await response.json();
      const newBarber = data;
      setBarbers([...barbers, newBarber]);
      setIsFullscreenLoading(false)
      notify("Barbiere aggiunto con successo", "success");
    } catch (error) {
      console.log(error);
      setIsFullscreenLoading(false)
      notify("Si è verificato un errore durante l'aggiunta del barbiere", "error");
    }
  };

  return (
    <>
    <section className={styles.barbersContainer}>
      <h1 className={styles.title}>I TUOI BARBIERI</h1>
      <p className={styles.intro}>
        Seleziona un barbiere dalla tua lista per visualizzare tutti i suoi
        appuntamenti di oggi, oppure aggiungi o rimuovi un barbiere.
      </p>
      <main className={styles.main}>
        <section className={styles.infoDisplayer}>
          <BarberBookings
            bookings={bookings}
            displayedBarber={displayedBarber}
          />
        </section>
        <section className={styles.List}>
          <BarbersList
          isLoadingBarbers={isLoadingBarbers}
            showBarbersBookings={showBarbersBookings}
            addBarber={addBarber}
            barbers={barbers}
            removeBarber={removeBarber}
          />
        </section>
      </main>
    </section>
    {isFullscreenLoading === true && <FullScreenLoader/>}
    </>
  );
}