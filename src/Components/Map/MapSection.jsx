import styles from "./MapSection.module.css";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment-timezone";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmFsY290aGVraWQiLCJhIjoiY2xocDB1MW51MW1mbDNyb3BydGZodG52YSJ9.KqSmFcvQyg3SXhdbxXaaaA";

export default function MapSection() {
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
    <section id="map" className={styles.mapSection}>
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
              <h4 className={styles.day}>{opening.day}</h4>
              <div className={styles.hoursBox}>
                <h4 className={styles.morning}>{opening.morning}</h4>
                <h4 className={styles.afternoon}>{opening.afternoon}</h4>
              </div>
            </div>
          );
        })}
      </main>
      <Map
        id="mymap"
        className={styles.map}
        initialViewState={{
          longitude: 11.37716343156303,
          latitude: 44.493582703201554,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={11.37716343156303} latitude={44.493582703201554}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={styles.locationIcon}
            size="4x"
          />
        </Marker>
      </Map>
    </section>
  );
}
