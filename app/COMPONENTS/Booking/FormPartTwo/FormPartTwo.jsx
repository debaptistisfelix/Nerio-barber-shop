"use client"

import styles from "./FormPartTwo.module.css";

import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import "./DateTime.css";
import CustomerForm from "./CustomerForm/CustomerForm";
import { useTouchContext } from "../../Context/TouchContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useCallback, useRef } from "react";

import { useBookingContext } from "../../Context/BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Result from "./Result/Result";
import fetchAvailableSlots from "@/lib/FetchData/fetchAvailableSlots";
import notify from "@/lib/toastNotify";
import ConvertToDateUTC from "@/lib/TimeDateConverters/ConvertToDateUTC";

export default function FormPartTwo({ bookingSectionRef }) {
  const {
    showDifferentForm,
    temporaryBarber,
    booking,
    bookingTotals,
    returnToFirstForm,
    setBooking
  } = useBookingContext();
  const {handleResize, windowWidth} = useTouchContext();
  const [availableSlots, setAvailableSlots] = useState(null);
  const [isSlotLoading, setIsSlotLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const resultsContainerRef = useRef(null);

  useEffect(()=>{
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)

  },[])

  const handleDateChange = (e) => {
    if(time !== null) setTime(null);
    setDate(e._d);
    setTimeout(()=>{
      showTimeSlots();
    }, 500)
  };

  const handleTimeChange = (timeSlot) => {
    setTime(timeSlot);
  }





  let formattedDate;
  if (date === null) {
    formattedDate = "Nessuna data selezionata";
  } else {
    formattedDate = moment(date).format("DD-MM-YYYY");
  }



 


  const getAvailableSlots = useCallback(async () => {
    if (date !== null) {
      const DateUTC = ConvertToDateUTC(date);
    
     setIsSlotLoading(true);
      const fetchedSlots = await fetchAvailableSlots(booking?.barber.id, DateUTC, bookingTotals?.totalDuration);

      if (booking?.barber.name !== "Any Barber") {
        setAvailableSlots(fetchedSlots);
        setIsSlotLoading(false);
      } else if (booking?.barber.name === "Any Barber") {

        if(!Array.isArray(fetchedSlots)) {
          setIsSlotLoading(false);
          return setAvailableSlots(fetchedSlots)
        }

        const availableTimeSlots =
          fetchedSlots.sort((a, b) =>
            a.slot > b.slot ? 1 : -1
          );

        // Calculate the number of slots for each barber
        const barberSlotsCount = availableTimeSlots.reduce((count, slot) => {
          if (!count[slot.barber.name]) {
            count[slot.barber.name] = 0;
          }
          count[slot.barber.name]++;
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
              (slot) => slot.barber.name === barberWithMoreSlots
            );
            // If it's the barber with less slots we add it to the filtered slots
            if (duplicateBarberSlot) {
              filteredSlots.push(duplicateBarberSlot);
            }
          }
        }
      
        setIsSlotLoading(false);
        setAvailableSlots(filteredSlots);
     
      }
    }
  }, [date]);


  useEffect(() => {
    getAvailableSlots();
  }, [date]);




  const handleNext =  (nameString, emailString) => {
    const DateUTC = ConvertToDateUTC(date);
    setBooking({
      ...booking,
      date: DateUTC,
      barber: temporaryBarber,
      name: nameString,
      email: emailString,
      time: time,
    })
    showDifferentForm(3);             
    bookingSectionRef.current &&
      bookingSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
  };

  const showTimeSlots = ()=>{
    if(windowWidth < 600){
      const resultsContainer = resultsContainerRef.current;
      resultsContainer.scrollIntoView({ behavior: "smooth" });
    }
   
  }
  

  return (
    <section className={styles.container}>
      <p className={styles.intro}>
        Seleziona la <b>data</b> e l'<b>orario</b> disponibile che preferisci per il tuo
        appuntamento, inserisci i <b>tuoi dati</b> e premi <b>avanti</b>.
      </p>
      <div className={styles.datePicker}>
        <FontAwesomeIcon
          onClick={returnToFirstForm}
          title="Torna Indietro"
          icon={faChevronLeft}
          className={styles.leftArrow}
        />
        <div onClick={returnToFirstForm} className={styles.mobileBackBtn}>
          <FontAwesomeIcon
            title="Torna Indietro"
            icon={faChevronLeft}
            className={styles.leftArrowMobile}
          />
          INDIETRO
        </div>
        <p className={styles.mobileIntro}>Seleziona la <b>data</b> che preferisci.</p>
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
            <td {...props} key={uuidv4()} className={styles.datePickerDay}
            style={{backgroundColor: currentDate.isSame(date, "day") ? "var(--dark-yellow)" : "var(--dark-grey)",
            color: currentDate.isSame(date, "day") ? "var(--dark-grey)" : "var(--dark-yellow)"}}
            >
              {currentDate.date()}
              
            </td>
          )}
        />

        <div className={styles.timeChoiceContainer}>
          <h1 ref={resultsContainerRef} className={styles.selectedDate}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={styles.calendarIcon}
            />
            {formattedDate}
          </h1>
          <div  className={styles.timeOptionsBox}>
            <p className={styles.mobileIntro}>Seleziona l'orario che preferisci.</p>
        <div className={styles.resultsContainer} >
        <Result
         date={date}
         time={time}
         handleTimeChange={handleTimeChange}
         isSlotLoading={isSlotLoading}
         availableSlots={availableSlots}/>
        </div>
          </div>
        </div>

        <CustomerForm booking={booking} handleNext={handleNext} date={date} time={time} />

        
      </div>
    </section>
  );
}