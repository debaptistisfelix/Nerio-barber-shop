"use client"
import styles from "./ServiceLine.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";

export default function ServiceLine({ service}) {
    const serviceRef = useRef(null);
    const plusIconRef = useRef(null);
    const [adding, setAdding] = useState(false);
    const {addServiceToBooking, booking, removeServiceFromBooking, setBooking, setDate, date, setTime, setEmail, setName} = useAdminBookingContext();

    const handleOnServiceClick = (service) => {
            if(booking?.services?.includes(service)){
                if(booking.barber === null){
                  removeServiceFromBooking(service.id);
                } else {
                  const newServiceList = booking.services.filter(
                    (serviceItem) => serviceItem.id !== service.id
                  );
                  setBooking({...booking, services: newServiceList, barber: null});
                  setDate(null);
                  setTime(null)
                  setEmail("")
                  setName("")
                }
            } else {
                if(date === null){
                  addServiceToBooking(service);
                } else {
                  setDate(null);
                  setTime(null);
                  setEmail("");
                  setName("");
                 addServiceToBooking(service);
                }
            }
    }
    return (
        <div
        ref={serviceRef}
        onClick={() => handleOnServiceClick(service)}
        className={`${styles.service} ${booking?.services?.includes(service) && styles.active}`}
      >
        <p className={styles.serviceName}>
          <FontAwesomeIcon
            icon={booking?.services?.includes(service) ? faMinusCircle : faPlusCircle}
            className={`${styles.plusIcon} ${booking?.services?.includes(service) && styles.active}`}
          />
          {service.name}
        </p>
        <p className={styles.serviceDuration}>
          {service.duration} min
        </p>
       
      </div>
    )
}