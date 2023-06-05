import styles from "./AdminBooking.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Datetime from "react-datetime";
import "./DatePicker.css";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { v4 as uuidv4 } from "uuid";
import ServicesSelector from "./ServicesSelector";
import BarberSelector from "./BarberSelector";
import TimeSlots from "./TimeSlots";
import Recap from "./Recap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminBookingContext } from "../../Contexts/AdminBookingContext";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function AdminBooking() {
  const {
    services,
    date,
    time,
    setTime,
    chosenBarber,
    chooseBarber,
    name,
    email,
    availableSlots,
    setAvailableSlots,
    handleDateChange,
    totalDuration,
    addServiceToServiceBooking,
    chooseTimeSlot,
    handleEmailInputChange,
    handleNameInputChange,
    formattedDateForServerRequest,
    isBookingConfirmed,
    error,
  } = useContext(AdminBookingContext);

  useEffect(() => {
    const getAvailableSlots = async () => {
      if (date !== null && chosenBarber !== null && services.length !== 0) {
        setTime(null);
        const response = await axios.get(
          `https://barber-server.cyclic.app/appointment/availability?barber=${chosenBarber}&date=${formattedDateForServerRequest}&duration=${totalDuration}`
        );

        if (!chosenBarber.includes(",")) {
          setAvailableSlots(response.data.data.availableSlotsDetailed);
        } else if (chosenBarber.includes(",")) {
          const availableTimeSlots =
            response.data.data.availableSlotsDetailed.sort((a, b) =>
              a.slot > b.slot ? 1 : -1
            );

          // Calculate the number of slots for each barber
          const barberSlotsCount = availableTimeSlots.reduce((count, slot) => {
            if (!count[slot.barber]) {
              count[slot.barber] = 0;
            }
            count[slot.barber]++;
            return count;
          }, {});

          // Find the barber with more slots by comparing their occurrences in the array of available time slots
          const barberWithMoreSlots = Object.keys(barberSlotsCount).reduce(
            (barberA, barberB) =>
              barberSlotsCount[barberA] >= barberSlotsCount[barberB]
                ? barberA
                : barberB
          );

          // Filter slots and remove duplicates for the barber with less slots
          const filteredSlots = [];
          const slotOccurrences = {};

          // First we create an object with the slots as keys and the occurrences as values to see which time slots are duplicated
          for (const slot of availableTimeSlots) {
            if (!slotOccurrences[slot.slot]) {
              slotOccurrences[slot.slot] = [slot];
            } else {
              slotOccurrences[slot.slot].push(slot);
            }
          }

          for (const slotList of Object.values(slotOccurrences)) {
            // If it has only one value it means that it's not duplicated
            if (slotList.length === 1) {
              filteredSlots.push(slotList[0]);
            } else {
              // If it has more than one value it means that it's duplicated and whe have to check if it's the barber with less slots
              const duplicateBarberSlot = slotList.find(
                (slot) => slot.barber === barberWithMoreSlots
              );
              // If it's the barber with less slots we add it to the filtered slots
              if (duplicateBarberSlot) {
                filteredSlots.push(duplicateBarberSlot);
              }
            }
          }

          /* chooseBarber(barberWithMoreSlots.trim()); */
          setAvailableSlots(filteredSlots);
        }
      }
    };
    getAvailableSlots();
  }, [date]);

  useEffect(() => {
    if (isBookingConfirmed && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isBookingConfirmed]);

  return (
    <section className={styles.AdminBooking}>
      <main className={styles.booking}>
        <div className={styles.dateBarberServiceBox}>
          <ServicesSelector
            addServiceToServiceBooking={addServiceToServiceBooking}
          />
          {services.length > 0 && (
            <BarberSelector chooseBarber={chooseBarber} />
          )}
          {services.length > 0 && chosenBarber !== null && (
            <div className="datePickerBox">
              <label className={styles.label}>Data Appuntamento:</label>
              <Datetime
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                value={date}
                onChange={handleDateChange}
                inputProps={{
                  className: styles.dateInput,
                }}
                className={styles.datetimeComponent}
                renderDay={(props, currentDate) => (
                  <td {...props} className={styles.datePickerDay}>
                    {currentDate.date()}
                  </td>
                )}
              />
            </div>
          )}
          {services.length !== 0 && chosenBarber && date && (
            <TimeSlots
              chooseTimeSlot={chooseTimeSlot}
              availableSlots={availableSlots}
            />
          )}
          {services.length !== 0 && chosenBarber && date && time && (
            <div className={styles.customerBox}>
              <label className={styles.label}>Dati Cliente</label>
              <div className={styles.inputBox}>
                <div className={styles.customerLine}>
                  <input
                    placeholder="Nome"
                    value={name}
                    type="text"
                    onChange={handleNameInputChange}
                    className={styles.customerInput}
                  />
                </div>
                <div className={styles.customerLine}>
                  <input
                    placeholder="Email"
                    value={email}
                    type="text"
                    onChange={handleEmailInputChange}
                    className={styles.customerInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.recap}>
          <h1 className={styles.recapTitle}>RIEPILOGO PRENOTAZIONE</h1>
          <Recap />
          {isBookingConfirmed === true && (
            <div className={styles.confirmation}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.confirmationIcon}
              />
              <h1 className={styles.confirmationTitle}>
                PRENOTAZIONE CONFERMATA
              </h1>
              <p className={styles.confirmationParag}>
                La prenotazione è stata inserita con successo nel database
              </p>
            </div>
          )}
          {isBookingConfirmed === false && error && (
            <div className={styles.confirmationError}>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className={styles.confirmationErrorIcon}
              />
              <h1 className={styles.confirmationErrorTitle}>
                ERRORE DI PRENOTAZIONE
              </h1>
              <p className={styles.confirmationErrorParag}>
                La prenotazione NON è stata inserita nel database. Riprovare tra
                5 minuti.
              </p>
              <p></p>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
