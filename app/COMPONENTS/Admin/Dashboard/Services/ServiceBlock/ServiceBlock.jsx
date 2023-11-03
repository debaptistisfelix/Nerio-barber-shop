"use client"

import styles from "./ServiceBlock.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import notify from "@/lib/toastNotify";

export default function ServiceBlock({
  service,
  removeService,
  updateService,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [serviceToEdit, setServiceToEdit] = useState(service.name);
  const [priceToEdit, setPriceToEdit] = useState(service.price);
  const [durationToEdit, setDurationToEdit] = useState(service.duration);
  const serviceRef = useRef(null);



  const handleEditSubmit = async (event) => {
    if(serviceToEdit === "" || priceToEdit === "" || durationToEdit === ""){
      notify( "Non puoi lasciare campi vuoti", "error")
      return ;
    } 
    if(isNaN(priceToEdit) || isNaN(durationToEdit)){
      notify( "I campi prezzo e durata devono essere numerici", "error")
      return ;
    }

    if(priceToEdit < 0 || durationToEdit < 0){
      notify( "I campi prezzo e durata devono essere numerici positivi", "error")
      return ;
    }

    if(serviceToEdit === service.name && priceToEdit === service.price && durationToEdit === service.duration){
      setShowEdit(!showEdit);
      return 
    }
    event.preventDefault();
    const updatedService = {
      name: serviceToEdit,
      price: parseInt(priceToEdit, 10),
      duration: parseInt(durationToEdit, 10)
    };
    await updateService(service.id, updatedService);
    setShowEdit(!showEdit);

  };

  return (
    <>
      {showEdit === false  ? (
        <section
        ref={serviceRef}
          style={{ backgroundColor: showDelete ? "var(--red-color)" : "var(--dark-grey" }}
          className={styles.block}
        >
          <div className={styles.sideA}>
            <h3 className={styles.serviceName}>{service.name}</h3>
            <h3 className={styles.serviceDuration}>{service.duration} min.</h3>
          </div>
          <div className={styles.sideB}>
            <h3 className={styles.servicePrice}>€ {service.price}</h3>
            <div className={styles.interactions}>
              {showDelete ? (
                <FontAwesomeIcon
                  onClick={() => {
                    removeService(service.id)
                  }}
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