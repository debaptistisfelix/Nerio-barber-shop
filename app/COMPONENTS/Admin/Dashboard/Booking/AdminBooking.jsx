"use client"
import styles from "./AdminBooking.module.css";
import { useState, useEffect, useCallback } from "react";
import Datetime from "react-datetime";
import "./DatePicker.css";
import "react-datetime/css/react-datetime.css";
import { v4 as uuidv4 } from "uuid";
import ServicesSelector from "./ServicesSelector/ServicesSelector";
import BarberSelector from "./BarberSelector/BarberSelector";
import TimeSlots from "./TimeSlots/TimeSlots";
import Recap from "./Recap/Recap";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import fetchAvailableSlots from "@/lib/FetchData/fetchAvailableSlots";
import FullScreenLoader from "../../FullScreenLoader/FullScreenLoader";
import ConvertToDateUTC from "@/lib/TimeDateConverters/ConvertToDateUTC";

export default function AdminBooking() {
  const {
    date,
    time,
    setTime,
    name,
    email,
    availableSlots,
    setAvailableSlots,
    handleDateChange,
    chooseTimeSlot,
    handleEmailInputChange,
    handleNameInputChange,
    booking, 
    bookingTotals,
    updateBookingTotals,
    isFullscreenLoading
  } = useAdminBookingContext();
  const [isLoadingAvailableSlots, setIsLoadingAvailableSlots] = useState(false);

  useEffect(()=>{
    const deleteOldBookings = async () => {
      try{
        const response = await fetch("/api/appointment/deleteOldBookings", {
          method: "DELETE"
        })
        const data = await response.json();
      }catch(error){
        console.log(error)
      }
    }
    deleteOldBookings();
  },[])

  

  useEffect(() => {
    if(booking?.services !== null && booking?.services.length > 0){
      const totalDuration = booking?.services.reduce((sum, service) => {
        return sum + parseInt(service.duration);
      }, 0);
      const totalPrice = booking?.services.reduce((sum, service) => {
        return sum + parseInt(service.price);
      }, 0);
      updateBookingTotals(totalPrice, totalDuration);
    }
  },[booking?.services])



  const getAvailableSlots = useCallback(async () => {
    setIsLoadingAvailableSlots(true);
    if (date !== null && booking?.barber && booking?.services.length !== 0) {
      setTime(null);
      const DateUTC = ConvertToDateUTC(date);
      const fetchedSlots = await fetchAvailableSlots(booking?.barber.id, DateUTC, bookingTotals.totalDuration);



      if (booking?.barber.name !== "Any Barber") {
        setAvailableSlots(fetchedSlots);
        setIsLoadingAvailableSlots(false);
      } else if (booking?.barber.name === "Any Barber") {
        if(!Array.isArray(fetchedSlots)) {return setAvailableSlots(fetchedSlots)}
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


        setAvailableSlots(filteredSlots);
        setIsLoadingAvailableSlots(false);
      }
    }
  }, [date]);

  useEffect(() => {
    getAvailableSlots();
  }, [date]);





  return (
  <>
    <section className={styles.AdminBooking}>
      <main className={styles.booking}>
        <div className={styles.dateBarberServiceBox}>
          <ServicesSelector />
          {booking?.services.length > 0 && (
            <BarberSelector  />
          )}
          {booking?.services?.length > 0 && booking.barber !== null && (
            <div className="datePickerBox">
              <label className={`${styles.label} ${styles.noWithTablet}`}>Data Appuntamento:</label>
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
            </div>
          )}
          {booking?.services.length !== 0 && booking?.barber && date && (
            <TimeSlots
            isLoadingAvailableSlots={isLoadingAvailableSlots}
              chooseTimeSlot={chooseTimeSlot}
              availableSlots={availableSlots}
            />
          )}
          {booking?.services.length !== 0 && booking?.barber && date && time && (
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
        </div>
      </main>
    </section>
    {isFullscreenLoading && <FullScreenLoader />}
  </>
  );
}