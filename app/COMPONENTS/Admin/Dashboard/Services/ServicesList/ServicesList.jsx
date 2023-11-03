"use client"

import styles from "./ServicesList.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ServiceBlock from "../ServiceBlock/ServiceBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";

export default function ServicesLists({
  removeService,
  services,
  updateService,
  error,
  isLoading
}) {
  const [displayedServices, setDisplayedServices] = useState(1);

  const handleChangeServices = (number) => {
    setDisplayedServices(number);
  };

  const showDisplayedServicesPerCategory = (serviceCateg) => {
    const servicesPerCategory = services
    .filter((service) => {
      return service.category === serviceCateg;
    })
    .map((service) => {
      return (
        <ServiceBlock key={service.id}
          removeService={removeService}
          updateService={updateService}
          service={service}
        />
      );
    })
    return servicesPerCategory
  };

  return (
    <section className={styles.servicesLists}>
      <div className={styles.categories}>
        <div
          className={styles.categoryOption}
          onClick={() => handleChangeServices(1)}
        >
          <div
            className={`${styles.expandingBg} ${
              displayedServices === 1 && styles.active
            }`}
          ></div>
          <FontAwesomeIcon icon={faScissors} className={styles.scissorsIcon} />
        </div>
        <div
          onClick={() => handleChangeServices(2)}
          className={styles.categoryOption}
        >
          <div
            className={`${styles.expandingBg} ${
              displayedServices === 2 && styles.active
            }`}
          ></div>
          <img
            className={styles.razorImg}
            alt="icona-rasoio"
            src="/razor.png"
          />
        </div>
        <div
      
          onClick={() => handleChangeServices(3)}
          className={styles.categoryOption}
        >
          <div
            className={`${styles.expandingBg} ${
              displayedServices === 3 && styles.active
            }`}
          ></div>
          <img
            className={styles.bottleImg}
            alt="icona-rasoio"
            src="/bottle.png"
          />
        </div>

        <div
          className={styles.categoryOption}
          onClick={() => handleChangeServices(4)}
        >
          <div
            className={`${styles.expandingBg} ${
              displayedServices === 4 && styles.active
            }`}
          ></div>
          <FontAwesomeIcon icon={faUser} className={styles.scissorsIcon} />
        </div>
       
      </div>
      <div className={styles.servicesList}>
        {error && (
          <p className={styles.errorMsg}>Errore nel caricamento dei servizi</p>
        )}
        {services === null && isLoading &&  <PointLoader
          pointWidth={"20px"} pointHeight={"20px"} pointColor={"#191919"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
        {services &&
          displayedServices === 1 &&
          showDisplayedServicesPerCategory("capelli")}
        {services &&
          displayedServices === 2 &&
          showDisplayedServicesPerCategory("barba")}
        {services &&
          displayedServices === 3 &&
          showDisplayedServicesPerCategory("servizi")}
           {services &&
          displayedServices === 4 &&
          showDisplayedServicesPerCategory("off")}
      </div>
    </section>
  );
}