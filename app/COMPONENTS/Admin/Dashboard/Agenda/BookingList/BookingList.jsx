import styles from "./BookingList.module.css";
import { v4 as uuidv4 } from "uuid";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";
import BookingBlock from "../BookingBlock/BookingBlock";

export default function BookingList({bookings, removeBooking, isLoading}) {
  return (
    <>
        {isLoading === true && bookings.length === 0 && <div className={styles.loaderContainer}><PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/></div>}
          {bookings.length === 0 && isLoading === false && (
            <div className={styles.noResults}>
              <h3 className={styles.noResultTitle}>
                Nessun appuntamento per questa giornata.
              </h3>
            </div>
          )}
          {bookings.length !== 0 && isLoading === false && (
            <div className={styles.bookingList}>
              {bookings.map((booking) => {
                return (
                  <BookingBlock
                    removeBooking={removeBooking}
                    booking={booking}
                    key={uuidv4()}
                  />
                );
              })}
            </div>
          )}
    </>
  )
}
