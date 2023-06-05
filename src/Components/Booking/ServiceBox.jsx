import styles from "./ServiceBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { BookingContext } from "../Contexts/BookingContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ServiceBox({ service }) {
  const { services, addServiceToServiceList } = useContext(BookingContext);
  const [wasClicked, setWasClicked] = useState(false);

  const handleOnServiceClick = (service) => {
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
    }, 1000);
    addServiceToServiceList(service);
  };

  return (
    <div
      onClick={() => handleOnServiceClick(service)}
      className={`${styles.serviceLine} ${
        wasClicked === true && styles.active
      }`}
    >
      <h4 className={`${styles.service} `}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
        {service.service}
      </h4>
      <h4 className={styles.duration}>
        <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
        {service.duration} min.
      </h4>
      <h4 className={styles.price}>€{service.price}</h4>
    </div>
  );
}
