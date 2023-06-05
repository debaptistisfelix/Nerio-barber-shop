import styles from "./Barbers.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import BarbersList from "./BarbersList";
import BarberBookings from "./BarberBookings";

export default function Barbers() {
  const [barbers, setBarbers] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [isLoadingBarbers, setIsLoadingBarbers] = useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);
  const [errorBarbers, setErrorBarbers] = useState(null);
  const [displayedBarber, setDisplayedBarber] = useState(null);

  const showBarbersBookings = (barber) => {
    setDisplayedBarber(barber);
  };

  useEffect(() => {
    const fetchBarbers = async () => {
      setIsLoadingBarbers(true);
      try {
        const response = await axios.get("http://localhost:8001/barbers");

        const filteredBarbers = response.data.data.barbers.filter((barber) => {
          return barber.name !== "Indifferente";
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
          `http://localhost:8001/appointment?date=${todayString}`
        );
        setBookings(response.data.data.appointments);
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
      const response = await axios.delete(
        `http://localhost:8001/barbers/${barberId}`
      );
      const filteredBarbers = barbers.filter((barber) => {
        return barber._id !== barberId;
      });
      setBarbers(filteredBarbers);
    } catch (error) {
      console.log(error);
    }
  };

  const addBarber = async (barberName) => {
    try {
      const response = await axios.post("http://localhost:8001/barbers", {
        name: barberName,
        img: "/anon.png",
        value: barberName,
      });
      const newBarber = response.data.data.barber;
      setBarbers([...barbers, newBarber]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            showBarbersBookings={showBarbersBookings}
            addBarber={addBarber}
            barbers={barbers}
            removeBarber={removeBarber}
          />
        </section>
      </main>
    </section>
  );
}
