"use client";
import { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const BookingContext = createContext();

export  function BookingContextProvider({ children }) {
  const [confirmationStatus, setConfirmationStatus] = useState({
    isLoading: false,
    isError: false,
    errorStatusCode: null,
  });
  const [displayedForm, setDisplayedForm] = useState(1);
  const [temporaryBarber, setTemporaryBarber] = useState(null);



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

  const showDifferentForm = (formNumber) => {
    event.preventDefault();
    setDisplayedForm(formNumber);
  };



  const backToStart = () => {
    setDisplayedForm(1);
    setBooking({
      name: "",
      email: "",
      date: null,
      time: null,
      barber: null,
      services: [],
    })
   }

  








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

  const returnToFirstForm = () => {
    event.preventDefault();
    setDisplayedForm(1);
    setBooking({
      name: "",
      email: "",
      date: null,
      time: null,
      barber: null,
      services: [],
    })
    setBookingTotals({
      totalDuration: null,
      totalPrice: null,
    
    })
  }

  const returnToSecondForm = () => {
    event.preventDefault();
    setDisplayedForm(2);
    setBooking({
      ...booking,
      name: "",
      email: "",
      date: null,
      time: null,
    })
  }


  return (
    <BookingContext.Provider
      value={{
        addServiceToBooking,
        removeServiceFromBooking,
        addBookingBarber,
        removeBookingBarber,
        booking,
        setBooking,
        bookingTotals,
        updateBookingTotals,
        returnToFirstForm,
        returnToSecondForm,
        showDifferentForm,
        displayedForm,
        confirmationStatus, setConfirmationStatus,
        temporaryBarber,
        setTemporaryBarber,
        backToStart 
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBookingContext = () =>{
  return  useContext(BookingContext);
}