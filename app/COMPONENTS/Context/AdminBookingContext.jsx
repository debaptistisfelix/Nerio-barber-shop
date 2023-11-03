"use client";

import { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const AdminBookingContext = createContext();

export  function AdminBookingProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [chosenBarber, setChosenBarber] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isFullscreenLoading, setIsFullscreenLoading] = useState(false);

 

  const resetAll = () => {
    setBooking({
      name: "",
      email: "",
      date: null,
      time: null,
      barber: null,
      services: [],
    })
    setDate(null);
    setTime(null);
    setName("");
    setEmail("");
  };
  


  const handleDateChange = (e) => {
    if(time === null){
      setDate(e._d);
    } else {
      setDate(e._d);
      setName("");
      setEmail("");
    }
  };

  const removeDate = () => {
    setDate(null);
    setTime(null);
    setName("");
    setEmail("");
  };

  const chooseTimeSlot = (timeSlot) => {
    setTime(timeSlot);
  };

  const removeTime = () => {
    setTime(null);
    setName("");
    setEmail("");
  };

  const handleNameInputChange = () => {
    setName(event.target.value);
  };

  const removeName = () => {
    setName("");
  };

  const handleEmailInputChange = () => {
    setEmail(event.target.value);
  };

  const removeEmail = () => {
    setEmail("");
  };



  let formattedDate;
  if (date === null) {
    formattedDate = "";
  } else {
    formattedDate = moment(date).format("DD-MM-YYYY");
  }










  const [confirmationStatus, setConfirmationStatus] = useState({
    isLoading: false,
    isError: false,
    errorStatusCode: null,
  });





  const [bookingTotals, setBookingTotals] = useState({
    totalDuration: null,
    totalPrice: null,
  })

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    date: null,
    time: null,
    barber: null,
    services: [],
  })


  const addServiceToBooking = (service) => {
    setBooking({...booking, services: [...booking.services, service]});
  };

  const removeServiceFromBooking = (id) => {
    const newServiceList = booking.services.filter(
      (serviceItem) => serviceItem.id !== id
    );
    setBooking({...booking, services: newServiceList});
  };

 

  const addBookingBarber = (barber) => {
    setBooking({...booking, barber: barber});
  };

  const removeBookingBarber = () => {
    setBooking({...booking, barber: null});
  }

  const updateBookingTotals =(price, duration)=>{
    setBookingTotals({
      totalDuration: duration,
      totalPrice: price
    })
  }





  return (
    <AdminBookingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        services,
        date,
        setDate,
        removeDate,
        time,
        setTime,
        removeTime,
        setTime,
        chosenBarber,
        name,
        setName,
        removeName,
        email,
        setEmail,
        removeEmail,
        availableSlots,
        setAvailableSlots,
        error,
        setError,
        handleDateChange,

        chooseTimeSlot,
        handleEmailInputChange,
        handleNameInputChange,
        formattedDate,


 

  

        isFullscreenLoading, setIsFullscreenLoading,
        booking, setBooking,
        addServiceToBooking,
        removeServiceFromBooking,
        addBookingBarber,
        removeBookingBarber,
        updateBookingTotals,
        bookingTotals,
        resetAll
      }}
    >
      {children}
    </AdminBookingContext.Provider>
  );
}

export const  useAdminBookingContext = () =>{
    return useContext(AdminBookingContext);
}