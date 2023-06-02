import styles from "./ServiceBlock.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ServiceBlock({
  service,
  removeService,
  updateService,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(service.service);
  const [priceToEdit, setPriceToEdit] = useState(service.price);
  const [durationToEdit, setDurationToEdit] = useState(service.duration);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedService = {
      service: serviceToEdit,
      price: priceToEdit,
      duration: durationToEdit,
    };
    updateService(service._id, updatedService);
    setShowEdit(!showEdit);
  };

  return (
    <>
      {showEdit === false ? (
        <section
          style={{ backgroundColor: showDelete ? "brown" : "var(--dark-grey" }}
          className={styles.block}
        >
          <div className={styles.sideA}>
            <h3 className={styles.serviceName}>{service.service}</h3>
            <h3 className={styles.serviceDuration}>{service.duration} min.</h3>
          </div>
          <div className={styles.sideB}>
            <h3 className={styles.servicePrice}>€ {service.price}</h3>
            <div className={styles.interactions}>
              {showDelete ? (
                <FontAwesomeIcon
                  onClick={() => removeService(service._id)}
                  icon={faCheck}
                  className={styles.icon}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowEdit(!showEdit)}
                  icon={faPencil}
                  className={styles.icon}
                />
              )}
              <FontAwesomeIcon
                onClick={() => setShowDelete(!showDelete)}
                icon={faX}
                className={styles.icon}
              />
            </div>
          </div>
        </section>
      ) : (
        <form className={`${styles.block} ${styles.formBlock}`}>
          <div className={styles.sideA}>
            <div className={styles.nameInputBox}>
              <input
                onChange={() => {
                  setServiceToEdit(event.target.value);
                }}
                className={`${styles.nameInput} ${styles.input}`}
                type="text"
                value={serviceToEdit}
              />
            </div>
            <div className={styles.durationInputBox}>
              <input
                onChange={() => {
                  setDurationToEdit(event.target.value);
                }}
                className={`${styles.durationInput} ${styles.input}`}
                type="text"
                value={durationToEdit}
              />
              <h3 className={styles.serviceDuration}>min.</h3>
            </div>
          </div>
          <div className={styles.sideB}>
            <div className={styles.priceInputBox}>
              <h3 className={`${styles.servicePrice} ${styles.euro}`}>€</h3>
              <input
                onChange={() => {
                  setPriceToEdit(event.target.value);
                }}
                className={`${styles.priceInput} ${styles.input}`}
                type="text"
                value={priceToEdit}
              />
            </div>
            <div className={styles.interactionForm}>
              <FontAwesomeIcon
                onClick={() => handleEditSubmit(event)}
                icon={faCheck}
                className={styles.icon}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
