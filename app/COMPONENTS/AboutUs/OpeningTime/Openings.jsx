"use client"

import styles from "./Openings.module.css";
import { useState, useEffect } from "react";
import moment from 'moment-timezone';


export default function Openings() {
  
  const openings = [
    {
      day: "Tuesday",
      giorno: "Martedì",
      morning: "8:30 - 12:30",
      afternoon: "15:00 - 19:00",
    },
    {
      day: "Wednesday",
      giorno: "Mercoledì",
      morning: "8:30 - 12:30",
      afternoon: "15:00 - 19:00",
    },
    {
      day: "Thursday",
      giorno: "Giovedì",
      morning: "8:30 - 12:30",
      afternoon: "15:00 - 19:00",
    },
    {
      day: "Friday",
      giorno: "Venerdì",
      morning: "8:30 - 12:30",
      afternoon: "15:00 - 19:00",
    },
    {
      day: "Saturday",
      giorno: "Sabato",
      morning: "8:30 - 12:30",
      afternoon: "15:00 - 19:00",
    },
    {
      day: "Sunday",
      giorno: "Domenica",
      morning: "CHIUSO",
      afternoon: "CHIUSO",
    },
    { day: "Monday", giorno: "Lunedì", morning: "CHIUSO", afternoon: "CHIUSO" },
  ];

  const [currentDay, setCurrentDay] = useState(null);

 

  useEffect(() => {
    const today = moment().tz("Europe/Rome").format("dddd");
    setCurrentDay(today);
  }, []);





  return (
    <section className={styles.openingsContainer}>
      <main className={styles.openingBox}>
        <h2 className={styles.openingTitle}>Orari di apertura</h2>
        {openings.map((opening, i) => {
          return (
            <div
              key={i}
              className={`${styles.openingLine} ${opening.day === currentDay &&  styles.currentDay }`}
            >
              <h4 className={styles.day}>{opening.giorno}</h4>
              <div className={styles.hoursBox}>
                <h4 className={styles.morning}>{opening.morning}</h4>
                <h4 className={styles.afternoon}>{opening.afternoon}</h4>
              </div>
            </div>
          );
        })}
      </main>
      <div className={styles.circlesContainerTop}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.circlesContainerBottom}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </section>
  );
}