import styles from "./BarbersList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import BarberLabel from "./BarberLabel";
import { useState } from "react";

export default function BarbersList({
  barbers,
  removeBarber,
  addBarber,
  showBarbersBookings,
}) {
  const [showAddBarberForm, setShowAddBarberForm] = useState(false);
  const [barberName, setBarberName] = useState("");

  const handleBarberNameChange = (event) => {
    setBarberName(event.target.value);
  };

  const toggleShowForm = () => {
    setShowAddBarberForm(!showAddBarberForm);
  };

  return (
    <section className={styles.list}>
      <h1 className={styles.listTitle}>LISTA BARBIERI</h1>
      <ul className={styles.listContainer}>
        {barbers &&
          barbers.map((barber) => {
            return (
              <BarberLabel
                showBarbersBookings={showBarbersBookings}
                removeBarber={removeBarber}
                barber={barber}
                key={barber._id}
              />
            );
          })}
      </ul>
      {showAddBarberForm === false ? (
        <FontAwesomeIcon
          onClick={toggleShowForm}
          icon={faPlusCircle}
          className={styles.plusIcon}
        />
      ) : (
        <form className={styles.form}>
          <input
            onChange={handleBarberNameChange}
            type="text"
            className={styles.input}
            value={barberName}
          />
          <div className={styles.btns}>
            <FontAwesomeIcon
              onClick={() => {
                toggleShowForm();
                setBarberName("");
              }}
              icon={faX}
              className={styles.xAddIcon}
            />

            <FontAwesomeIcon
              onClick={() => {
                addBarber(barberName);
                toggleShowForm();
                setBarberName("");
              }}
              icon={faPlusCircle}
              className={styles.plusAddIcon}
            />
          </div>
        </form>
      )}
    </section>
  );
}
