"use client"

import styles from "./ServicesSelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ServiceLine from "../ServiceLine/ServiceLine";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";

export default function ServicesSelector() {
  const [displayedServices, setDisplayedServices] = useState(1);
  const [servicesList, setServicesList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {services} = useAdminBookingContext();



  useEffect(() => {
    const getServices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "/api/service",{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setServicesList(data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    getServices();
  }, []);

  const displayServicesLists = useCallback((serviceCategory) => {
if(servicesList !== null){
  const displayedListOfServices =  servicesList
  .filter((service) => {
    return service.category === serviceCategory;
  })
  .map((service) => {
    return (
      <ServiceLine 
      key={uuidv4()}
      service={service}
      />
    );
  })
  return displayedListOfServices
}
  }, [servicesList]);


  let conditionToShowServices = isLoading === false || error === null || servicesList !== null;

  return (
    <section className={styles.serviceChoiceBox}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          {displayedServices === 1 && (
            <div className={styles.expandingBg}></div>
          )}
          <FontAwesomeIcon
            icon={faScissors}
            className={styles.scissorsIcon}
            onClick={() => setDisplayedServices(1)}
          />
        </div>

        <div className={styles.iconBox}>
          {displayedServices === 2 && (
            <div className={styles.expandingBg}></div>
          )}
          <img
            className={styles.razorImg}
            alt="icona-rasoio"
            src="/razor.png"
            onClick={() => setDisplayedServices(2)}
          />
        </div>
        <div className={styles.iconBox}>
          {displayedServices === 3 && (
            <div className={styles.expandingBg}></div>
          )}
          <img
            className={styles.bottleImg}
            alt="icona-rasoio"
            src="/bottle.png"
            onClick={() => setDisplayedServices(3)}
          />
        </div>

        <div className={styles.iconBox}>
          {displayedServices === 4 && (
            <div className={styles.expandingBg}></div>
          )}
          <FontAwesomeIcon
            icon={faUser}
            className={styles.scissorsIcon}
            onClick={() => setDisplayedServices(4)}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        {isLoading && servicesList === null && (
          <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"white"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>
        )}
        {error && servicesList === null && (
          <p className={styles.errorMSg}>Errore nel caricamento dei servizi</p>
        )}
        {displayedServices === 1 &&
          conditionToShowServices &&
          displayServicesLists("capelli")}
        {displayedServices === 2 &&
          conditionToShowServices &&
          displayServicesLists("barba")}
        {displayedServices === 3 &&
          conditionToShowServices &&
          displayServicesLists("servizi")}
          {displayedServices === 4 &&
          conditionToShowServices &&
          displayServicesLists("off")}
      </div>
    </section>
  );
}