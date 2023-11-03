"use client"

import styles from "./BarbersList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import BarberLabel from "../BarberLabel/BarberLabel";
import { useState } from "react";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";
import Modal from "@/app/COMPONENTS/Admin/Modal/Modal";

export default function BarbersList({
  barbers,
  removeBarber,
  addBarber,
  showBarbersBookings,
  isLoadingBarbers
}) {
  const [showAddBarberForm, setShowAddBarberForm] = useState(false);
  const [barberName, setBarberName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

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
        {isLoadingBarbers === true &&  <PointLoader
          pointWidth={"20px"} pointHeight={"20px"} pointColor={"#191919"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
        {barbers && isLoadingBarbers === false &&
          barbers.map((barber) => {
            return (
              <BarberLabel
              isModalOpen={isModalOpen}
              removeBarber={removeBarber }
              toggleModal={toggleModal}
                showBarbersBookings={showBarbersBookings}
                barber={barber}
                key={barber.id}
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