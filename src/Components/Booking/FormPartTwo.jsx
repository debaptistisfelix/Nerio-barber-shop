import styles from "./FormPartTwo.module.css";
import axios from "axios";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import "./Datetime.css";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../Contexts/BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import TimeSlot from "./TimeSlot";

export default function FormPartTwo({ bookingSectionRef }) {
  const {
    date,
    setDate,
    time,
    chosenBarber,
    chooseBarber,
    chooseYourBarber,
    totalPrice,
    totalDuration,
    chooseTimeSlot,
    showFirstForm,
    handleNameInputChange,
    handleEmailInputChange,
    showDifferentForm,
    name,
    email,
    temporaryBarber,
    setTemporaryBarber,
  } = useContext(BookingContext);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleDateChange = (e) => {
    setDate(e._d);
  };

  let formattedDate;
  if (date === null) {
    formattedDate = "Nessuna data selezionata";
  } else {
    formattedDate = moment(date).format("DD-MM-YYYY");
  }

  let formattedDateForServerRequest;
  if (date === null) {
    formattedDateForServerRequest = "";
  } else {
    formattedDateForServerRequest = moment(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    const getAvailableSlots = async () => {
      if (date !== null) {
        chooseTimeSlot(null);
        const response = await axios.get(
          `http://localhost:8001/appointment/availability?barber=${chosenBarber?.value}&date=${formattedDateForServerRequest}&duration=${totalDuration}`
        );
        console.log(chosenBarber?.value);
        console.log(chosenBarber);
        if (!chosenBarber?.value.includes(",")) {
          setAvailableSlots(response.data.data.availableSlotsDetailed);
          console.log(response.data.data.availableSlotsDetailed);
        } else if (chosenBarber?.value.includes(",")) {
          const availableTimeSlots =
            response.data.data.availableSlotsDetailed.sort((a, b) =>
              a.slot > b.slot ? 1 : -1
            );

          console.log("All Available time slots:", availableTimeSlots);

          // Calculate the number of slots for each barber
          const barberSlotsCount = availableTimeSlots.reduce((count, slot) => {
            if (!count[slot.barber]) {
              count[slot.barber] = 0;
            }
            count[slot.barber]++;
            return count;
          }, {});

          console.log("Barber slots count:", barberSlotsCount);

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

          console.log("slot Occurrences:", slotOccurrences);

          console.log(
            "Barber with most free slots:",
            barberWithMoreSlots.trim()
          );
          console.log("Filtered slots:", filteredSlots);
          setAvailableSlots(filteredSlots);
        }
      }
    };
    getAvailableSlots();
  }, [date]);

  return (
    <section className={styles.container}>
      <p className={styles.intro}>
        Seleziona la data e l'orario disponibile che preferisci per il tuo
        appuntamento, inserisci i tuoi dati e premi avanti.
      </p>
      <div className={styles.datePicker}>
        <FontAwesomeIcon
          onClick={showFirstForm}
          title="Torna Indietro"
          icon={faChevronLeft}
          className={styles.leftArrow}
        />
        <div onClick={showFirstForm} className={styles.mobileBackBtn}>
          <FontAwesomeIcon
            title="Torna Indietro"
            icon={faChevronLeft}
            className={styles.leftArrowMobile}
          />
          INDIETRO
        </div>
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

        <div className={styles.timeChoiceContainer}>
          <h1 className={styles.selectedDate}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={styles.calendarIcon}
            />
            {formattedDate}
          </h1>
          <div className={styles.timeOptionsBox}>
            {availableSlots.length !== 0 &&
            availableSlots[0].slot === "Il Negozio è chiuso" ? (
              <h4 className={styles.closedShop}>Il Negozio è chiuso.</h4>
            ) : (
              availableSlots.map((slot) => {
                return (
                  <TimeSlot
                    date={date}
                    time={time}
                    slot={slot}
                    key={uuidv4()}
                    setTemporaryBarber
                    chooseTimeSlot={chooseTimeSlot}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className={styles.customerInfosBox}>
          <h3 className={styles.customerTitle}>I TUOI DATI</h3>
          <input
            onChange={handleNameInputChange}
            type="text"
            value={name}
            placeholder="Nome e Cognome"
            className={styles.customerInput}
          />
          <input
            onChange={handleEmailInputChange}
            type="email"
            value={email}
            placeholder="Email"
            className={styles.customerInput}
          />
          <button
            onClick={() => {
              event.preventDefault();
              showDifferentForm(3);

              /*  chooseYourBarber(temporaryBarber); */
              bookingSectionRef.current &&
                bookingSectionRef.current.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            disabled={
              time === null ||
              date === null ||
              name === "" ||
              email === "" ||
              !email.includes("@")
            }
            className={styles.customerBtn}
          >
            AVANTI
          </button>
        </div>
      </div>
    </section>
  );
}
