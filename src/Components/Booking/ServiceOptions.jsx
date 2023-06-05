import styles from "./ServiceOptions.module.css";
import { useState, useContext, useEffect } from "react";
import ChoiceBlock from "./ChoiceBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ServiceBox from "./ServiceBox";
import BarberCard from "./BarberCard";
import { BookingContext } from "../Contexts/BookingContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function ServiceOptions({ bookingSectionRef }) {
  const { services, chosenBarber, showDifferentForm } =
    useContext(BookingContext);
  const [displayedServices, setDisplayedServices] = useState(1);
  const [servicesList, setServicesList] = useState(null);
  const [availableBarbers, setAvailableBarbers] = useState(null);

  const changeDisplayedServices = (service) => {
    setDisplayedServices(service);
  };

  useEffect(() => {
    const getServices = async () => {
      const response = await axios.get(
        "https://barber-server.cyclic.app/services"
      );
      setServicesList(response.data.data.services);
    };
    const getBarbers = async () => {
      const response = await axios.get(
        "https://barber-server.cyclic.app/barbers"
      );
      setAvailableBarbers(response.data.data.barbers);
    };
    getServices();
    getBarbers();
  }, []);

  const barbers = [
    { name: "Indifferente", img: "/anon.png", value: "Nerio,Andrea" },
    { name: "Nerio", img: "/anon.png", value: "Nerio" },
    { name: "Andrea", img: "/anon.png", value: "Andrea" },
  ];

  return (
    <section className={styles.optionsContainer}>
      {/* OPTIONS */}
      <section className={styles.options}>
        <div className={styles.option}>
          <div
            onClick={() => changeDisplayedServices(1)}
            className={`${styles.optionBox} `}
          >
            {displayedServices === 1 && (
              <div className={styles.expandingBg}></div>
            )}
            <FontAwesomeIcon
              icon={faScissors}
              className={`${styles.serviceIcon} ${
                displayedServices === 1 && styles.active
              }`}
            />
            <h5
              className={`${styles.optionTitle} ${
                displayedServices === 1 && styles.active
              }`}
            >
              CAPELLI
            </h5>
          </div>
        </div>
        <div className={styles.option}>
          <div
            onClick={() => changeDisplayedServices(2)}
            className={`${styles.optionBox} `}
          >
            {displayedServices === 2 && (
              <div className={styles.expandingBg}></div>
            )}{" "}
            <img
              className={`${styles.razorImg} ${
                displayedServices === 2 && styles.active
              }`}
              alt="icona-rasoio"
              /*  src={displayedServices === 2 ? "/razorBlack.png" : "/razor.png"} */
              src="/razor.png"
            />
            <h5
              className={`${styles.optionTitle} ${
                displayedServices === 2 && styles.active
              }`}
            >
              BARBA
            </h5>
          </div>
        </div>
        <div className={styles.option}>
          <div
            onClick={() => changeDisplayedServices(3)}
            className={`${styles.optionBox} `}
          >
            {displayedServices === 3 && (
              <div className={styles.expandingBg}></div>
            )}
            <img
              alt="icona-fiala"
              /* src={displayedServices === 3 ? "/bottleBlack.png" : "/bottle.png"} */
              src="/bottle.png"
              className={`${styles.bottleImg} ${
                displayedServices === 3 && styles.active
              }`}
            />
            <h5
              className={`${styles.optionTitle} ${
                displayedServices === 3 && styles.active
              }`}
            >
              SERVIZI
            </h5>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className={styles.serviceList}>
        <img className={styles.logo} alt="logo" src="logoS.png" />
        <div className={styles.topPoints}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.bottomPoints}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        {displayedServices === 1 && (
          <div className={styles.list}>
            {servicesList !== null &&
              servicesList
                .filter((service) => {
                  return service.category === "capelli";
                })
                .map((service) => {
                  return (
                    <ServiceBox
                      chosenServices={services}
                      service={service}
                      key={uuidv4()}
                    />
                  );
                })}
          </div>
        )}

        {displayedServices === 2 && (
          <div className={styles.list}>
            {servicesList !== null &&
              servicesList
                .filter((service) => {
                  return service.category === "barba";
                })
                .map((service) => {
                  return <ServiceBox service={service} key={uuidv4()} />;
                })}
          </div>
        )}

        {displayedServices === 3 && (
          <div className={styles.list}>
            {servicesList !== null &&
              servicesList
                .filter((service) => {
                  return service.category === "servizi";
                })
                .map((service) => {
                  return <ServiceBox service={service} key={uuidv4()} />;
                })}
          </div>
        )}
      </section>

      {/* BARBER CHOICE */}
      <section className={styles.finalSteps}>
        <section className={styles.choicesList}>
          {services !== null &&
            services.map((service) => {
              return <ChoiceBlock service={service} key={uuidv4()} />;
            })}
        </section>
        <section className={styles.barberChoice}>
          {availableBarbers &&
            availableBarbers.map((barber) => {
              return <BarberCard barber={barber} key={uuidv4()} />;
            })}
        </section>
        <button
          onClick={() => {
            showDifferentForm(2);
            bookingSectionRef.current &&
              bookingSectionRef.current.scrollIntoView({ behavior: "smooth" });
          }}
          disabled={
            services !== null &&
            (services.length === 0 || chosenBarber === null)
          }
          className={styles.submitBtn}
        >
          AVANTI
        </button>
      </section>
    </section>
  );
}
