import styles from "./BarberLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function BarberLabel({
  barber,
  removeBarber,
  showBarbersBookings,
}) {
  const [showDelete, setShowDelete] = useState(null);
  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };
  return (
    <>
      <li
        onClick={() => {
          showBarbersBookings(barber.name);
        }}
        className={`${styles.listItem} ${
          showDelete === true && styles.listItemToDelete
        } ${showDelete === false && styles.shrinkListItem}`}
      >
        {barber.name}
        {showDelete === true && (
          <div className={styles.interactions}>
            <FontAwesomeIcon
              onClick={() => {
                removeBarber(barber._id);
              }}
              icon={faCheck}
              className={styles.checkIcon}
            />
            <FontAwesomeIcon
              onClick={toggleDelete}
              icon={faX}
              className={styles.xIcon}
            />
          </div>
        )}
        {!showDelete && (
          <div className={styles.singleInteractions}>
            <FontAwesomeIcon
              onClick={toggleDelete}
              icon={faX}
              className={styles.xIcon}
            />
          </div>
        )}
      </li>
    </>
  );
}
