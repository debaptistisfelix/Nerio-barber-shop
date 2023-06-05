import styles from "./ServicesSelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ServicesSelector({ addServiceToServiceBooking }) {
  const [displayedServices, setDisplayedServices] = useState(1);
  const [servicesList, setServicesList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://barber-server.cyclic.app/services"
        );
        setServicesList(response.data.data.services);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    getServices();
  }, []);

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
      </div>
      <div className={styles.bottom}>
        {isLoading && (
          <div className={styles.loaderBox}>
            <div className={styles.loader}></div>
          </div>
        )}
        {error && (
          <p className={styles.errorMSg}>Errore nel caricamento dei servizi</p>
        )}
        {displayedServices === 1 &&
          servicesList !== null &&
          servicesList
            .filter((service) => {
              return service.category === "capelli";
            })
            .map((service) => {
              return (
                <div
                  key={service.service}
                  onClick={() => addServiceToServiceBooking(service)}
                  className={styles.service}
                >
                  <p className={styles.serviceName}>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className={styles.plusIcon}
                    />
                    {service.service}
                  </p>
                  <p className={styles.serviceDuration}>
                    {service.duration} min
                  </p>
                </div>
              );
            })}
        {displayedServices === 2 &&
          servicesList !== null &&
          servicesList
            .filter((service) => {
              return service.category === "barba";
            })
            .map((service) => {
              return (
                <div
                  key={service.service}
                  onClick={() => addServiceToServiceBooking(service)}
                  className={styles.service}
                >
                  <p className={styles.serviceName}>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className={styles.plusIcon}
                    />
                    {service.service}
                  </p>
                  <p className={styles.serviceDuration}>
                    {service.duration} min
                  </p>
                </div>
              );
            })}
        {displayedServices === 3 &&
          servicesList !== null &&
          servicesList
            .filter((service) => {
              return service.category === "servizi";
            })
            .map((service) => {
              return (
                <div
                  key={service.service}
                  onClick={() => addServiceToServiceBooking(service)}
                  className={styles.service}
                >
                  <p className={styles.serviceName}>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className={styles.plusIcon}
                    />
                    {service.service}
                  </p>
                  <p className={styles.serviceDuration}>
                    {service.duration} min
                  </p>
                </div>
              );
            })}
      </div>
    </section>
  );
}
