import styles from "./ServiceBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useRef, useContext } from "react";
import { BookingContext } from "../Contexts/BookingContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ServiceBox({ service }) {
  const { services, addServiceToServiceList } = useContext(BookingContext);
  const serviceLineRef = useRef(null);

  const handleAniamtion = () => {
    const serviceLine = serviceLineRef.current;

    serviceLine.classList.add(`${styles.animation}`);

    setTimeout(() => {
      serviceLine.classList.remove(`${styles.animation}`);
    }, 500);
  };

  const handleOnServiceClick = (service) => {
    handleAniamtion();
    addServiceToServiceList(service);
  };

  return (
    <div
      ref={serviceLineRef}
      onClick={() => handleOnServiceClick(service)}
      className={`${styles.serviceLine} `}
    >
      <h4 className={styles.service}>
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
