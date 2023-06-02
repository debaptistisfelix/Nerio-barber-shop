import styles from "./TimeDisplayer.module.css";
import { useState, useEffect } from "react";

export default function TimeDisplayer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  let weekday = time.getDay();

  switch (weekday) {
    case 0:
      weekday = "Domenica";
      break;
    case 1:
      weekday = "Lunedì";
      break;
    case 2:
      weekday = "Martedì";
      break;
    case 3:
      weekday = "Mercoledì";
      break;
    case 4:
      weekday = "Giovedì";
      break;
    case 5:
      weekday = "Venerdì";
      break;
    case 6:
      weekday = "Sabato";
      break;
    default:
      weekday = "Errore";
  }

  const formattedMinutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const formattedSeconds =
    time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();

  return (
    <section className={styles.timeDisplayer}>
      <h1 className={styles.time}>
        {time.getHours()}:{formattedMinutes}:{formattedSeconds}
      </h1>
      <h1 className={styles.day}>{weekday}</h1>
      <h1 className={styles.date}>{time.toLocaleDateString("it-IT")}</h1>
    </section>
  );
}
