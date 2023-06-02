import styles from "./Recap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { AdminBookingContext } from "../../Contexts/AdminBookingContext";
import timeConverter from "../../HelperFunctions/timeConverter";

export default function Recap() {
  const {
    services,
    removeServiceFromServiceBooking,
    chosenBarber,
    formattedDate,
    removeBarber,
    time,
    name,
    email,
    removeName,
    removeEmail,
    removeDate,
    removeTime,
    timeVariableToSendToDB,
    date,
    totalDuration,
    isBookingConfirmed,
    setIsBookingConfirmed,
    error,
    setError,
    isLoading,
    setIsLoading,
    resetAll,
    handleBookingConfirmation,
  } = useContext(AdminBookingContext);

  const submitBookingRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/appointment", {
        name: name,
        email: email,
        date: moment(date).format("YYYY-MM-DD"),
        duration: totalDuration,
        services: services,
        barber: chosenBarber,
        time: moment(timeVariableToSendToDB).tz("Europe/Rome"),
      });
      setIsLoading(false);
      handleBookingConfirmation(true);
      setError(null);
      console.log(response);
      resetAll();
    } catch (error) {
      handleBookingConfirmation(false);
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.recap}>
      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Servizi:</h3>
        <div className={styles.servicesBox}>
          {services.length !== 0 &&
            services.map((service) => {
              return (
                <div key={uuidv4()} className={styles.block}>
                  <h3 className={styles.serviceName}>{service.service}</h3>
                  <FontAwesomeIcon
                    onClick={() => removeServiceFromServiceBooking(service.id)}
                    icon={faX}
                    className={styles.icon}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Barbiere:</h3>
        {chosenBarber && (
          <div className={styles.block}>
            <h3 className={styles.recapBarber}>{chosenBarber}</h3>
            <FontAwesomeIcon
              onClick={() => removeBarber()}
              icon={faX}
              className={styles.icon}
            />
          </div>
        )}
      </div>
      <div className={styles.recapLine}>
        <div className={styles.recapDateLine}>
          <h3 className={styles.recapLabel}>Data:</h3>
          {formattedDate && (
            <div className={styles.block}>
              <h3 className={styles.recapDate}>{formattedDate}</h3>
              <FontAwesomeIcon
                onClick={() => removeDate()}
                icon={faX}
                className={styles.icon}
              />
            </div>
          )}
        </div>
        <div className={styles.recapDateLine}>
          <h3 className={styles.recapLabel}>Ora:</h3>
          {time && (
            <div className={styles.block}>
              <h3 className={styles.recapDate}>
                {date && time && timeConverter(date, time)}
              </h3>
              <FontAwesomeIcon
                onClick={() => removeTime()}
                icon={faX}
                className={styles.icon}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Nome:</h3>
        {name !== "" && (
          <div className={styles.block}>
            <h3 style={{ fontWeight: "400" }} className={styles.recapDate}>
              {name}
            </h3>
            <FontAwesomeIcon
              onClick={() => removeName()}
              icon={faX}
              className={styles.icon}
            />
          </div>
        )}
      </div>
      <div className={styles.recapLine}>
        <h3 className={styles.recapLabel}>Email:</h3>
        {email !== "" && (
          <div className={styles.block}>
            <h3 style={{ fontWeight: "400" }} className={styles.recapDate}>
              {email}
            </h3>
            <FontAwesomeIcon
              onClick={() => removeEmail()}
              icon={faX}
              className={styles.icon}
            />
          </div>
        )}
      </div>

      <button
        disabled={
          services.length === 0 ||
          !chosenBarber ||
          !formattedDate ||
          !time ||
          name === ""
        }
        className={styles.confirmBtn}
        onClick={() => {
          submitBookingRequest();
          window.scrollTo(0, 0);
        }}
      >
        CONFERMA
      </button>
    </section>
  );
}
