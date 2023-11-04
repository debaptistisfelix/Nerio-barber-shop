import styles from "./Result.module.css";
import TimeSlot from "../TimeSlot/TimeSlot";
import { v4 as uuidv4 } from 'uuid';
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";

export default function Result({availableSlots, isSlotLoading, date, time, handleTimeChange}) {
    const conditionForClosedShop = availableSlots !== null && availableSlots === "Il Negozio è chiuso" && isSlotLoading === false;
    const conditionForTimeSLots = availableSlots !== null && Array.isArray(availableSlots) && isSlotLoading === false;
    const conditionForLoading = isSlotLoading === true && availableSlots === null;
    const conditionForNoAvailableSlots = availableSlots !== null && availableSlots.length === 0 && isSlotLoading === false;   
    const conditionForPastDate = availableSlots !== null && availableSlots === "La data selezionata è già passata" && isSlotLoading === false;
    return (
        <main className={styles.results}>
               {conditionForClosedShop &&  <h4 className={styles.closedShop}>Il Negozio è chiuso.</h4>}
                {conditionForNoAvailableSlots && <h4 className={styles.closedShop}>Non ci sono slot disponibili per la data selezionata.</h4>}
                {conditionForPastDate && <h4 className={styles.closedShop}>La data selezionata è già passata.</h4>}
               {conditionForTimeSLots && (
              availableSlots.map((slot) => {
                return (
                  <TimeSlot
                    date={date}
                    time={time}
                    slot={slot}
                    key={uuidv4()}
                  
                    handleTimeChange={handleTimeChange}
                  />
                );
              })
            )  }
            {conditionForLoading && <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
        </main>
    )
}