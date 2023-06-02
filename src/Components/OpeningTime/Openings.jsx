import styles from "./Openings.module.css";
import moment from "moment";
import "moment-timezone";
import "../CSS/variables.css";

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

  const getSpecificDayClass = (day) => {
    const currentDay = moment().tz("Europe/Rome").format("dddd");
    return day === currentDay ? styles.currentDay : "";
  };

  return (
    <section className={styles.openingsContainer}>
      <main className={styles.openingBox}>
        <h2 className={styles.openingTitle}>Orari di apertura</h2>

        {openings.map((opening, i) => {
          return (
            <div
              key={i}
              className={`${styles.openingLine} ${getSpecificDayClass(
                opening.day
              )}`}
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
