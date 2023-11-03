"use client"

import styles from "./TimeSlots.module.css";
import { v4 as uuidv4 } from "uuid";
import SingleSlot from "../SingleSlot/SingleSlot";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";

export default function TimeSlots({ availableSlots, chooseTimeSlot, isLoadingAvailableSlots }) {
const conditionForTimeSLots = Array.isArray(availableSlots) && availableSlots.length > 0 && isLoadingAvailableSlots === false;;; 
const conditionForClosedShop = !Array.isArray(availableSlots) && availableSlots === "Il Negozio è chiuso" && isLoadingAvailableSlots === false;;
const conditionForNoAvailableSlots = Array.isArray(availableSlots) && availableSlots.length === 0 && isLoadingAvailableSlots === false;;
const conditionForPastDate = availableSlots !== null && availableSlots === "La data selezionata è già passata" && isLoadingAvailableSlots === false;;


return (
    <section className={styles.timeSlots}>
      <label className={styles.label}>Orari disponbibili:</label>
      <main className={styles.timeSlotsContainer}>
        {conditionForPastDate && <h4 className={styles.closedShop}>La data selezionata è già passata.</h4>}
        {conditionForClosedShop && <h4 className={styles.closedShop}>Il Negozio è chiuso.</h4>} 
        {conditionForNoAvailableSlots && <h4 className={styles.closedShop}>Non ci sono slot disponibili.</h4>}
        {conditionForTimeSLots && availableSlots.map((slot) => {
          return (
            <SingleSlot
              key={uuidv4()}
              slot={slot}
              chooseTimeSlot={chooseTimeSlot}
            />
          );
        })}
        {isLoadingAvailableSlots === true && <PointLoader pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"30px"} loaderWidth={"100px"} loaderMargin={"50px 0"} />}
      
      </main>
    </section>
  );
}