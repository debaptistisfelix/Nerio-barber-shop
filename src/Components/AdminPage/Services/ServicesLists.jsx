import styles from "./ServicesLists.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ServiceBlock from "./ServiceBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";

export default function ServicesLists({
  removeService,
  services,
  updateService,
  error,
}) {
  const [displayedServices, setDisplayedServices] = useState(1);

  const handleChangeServices = (number) => {
    setDisplayedServices(number);
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
        {/* <h3
          onClick={() => handleChangeServices(1)}
          className={`${styles.categ} ${
            displayedServices === 1 && styles.active
          }`}
        >
          CAPELLI
        </h3>
        <h3
          onClick={() => handleChangeServices(2)}
          className={`${styles.categ} ${
            displayedServices === 2 && styles.active
          }`}
        >
          BARBA
        </h3>
        <h3
          onClick={() => handleChangeServices(3)}
          className={`${styles.categ} ${
            displayedServices === 3 && styles.active
          }`}
        >
          SERVIZI
        </h3> */}
      </div>
      <div className={styles.servicesList}>
        {error && (
          <p className={styles.errorMsg}>Errore nel caricamento dei servizi</p>
        )}
        {services &&
          displayedServices === 1 &&
          services
            .filter((service) => {
              return service.category === "capelli";
            })
            .map((service) => {
              return (
                <ServiceBlock
                  removeService={removeService}
                  updateService={updateService}
                  service={service}
                  key={service._id}
                />
              );
            })}
        {services &&
          displayedServices === 2 &&
          services
            .filter((service) => {
              return service.category === "barba";
            })
            .map((service) => {
              return (
                <ServiceBlock
                  removeService={removeService}
                  updateService={updateService}
                  service={service}
                  key={service._id}
                />
              );
            })}
        {services &&
          displayedServices === 3 &&
          services
            .filter((service) => {
              return service.category === "servizi";
            })
            .map((service) => {
              return (
                <ServiceBlock
                  removeService={removeService}
                  updateService={updateService}
                  service={service}
                  key={service._id}
                />
              );
            })}
      </div>
    </section>
  );
}
