import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const AdminBookingContext = createContext();

export default function AdminBookingContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [chosenBarber, setChosenBarber] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  const resetAll = () => {
    setServices([]);
    setDate(null);
    setTime(null);
    setChosenBarber(null);
    setName("");
    setEmail("");
    setTimeout(() => {
      setIsBookingConfirmed(false);
    }, 3000);
  };

  const handleBookingConfirmation = (status) => {
    setIsBookingConfirmed(status);
  };

  const timeVariableToSendToDB = `${moment(date).format(
    "YYYY-MM-DD"
  )}T${time}:00.000Z`;

  const addServiceToServiceBooking = (service) => {
    const newServiceToAdd = { ...service, id: uuidv4() };
    setServices([...services, newServiceToAdd]);
  };

  const removeServiceFromServiceBooking = (id) => {
    const newServiceList = services.filter(
      (serviceItem) => serviceItem.id !== id
    );
    setServices(newServiceList);
  };

  const chooseBarber = (barber) => {
    setChosenBarber(barber);
  };

  const removeBarber = () => {
    setChosenBarber(null);
  };

  const handleDateChange = (e) => {
    setDate(e._d);
  };

  const removeDate = () => {
    setDate(null);
  };

  const chooseTimeSlot = (timeSlot) => {
    setTime(timeSlot);
  };

  const removeTime = () => {
    setTime(null);
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

  let totalDuration;
  let totalPrice;
  if (services !== null) {
    totalDuration = services.reduce((sum, service) => {
      return sum + parseInt(service.duration);
    }, 0);
    totalPrice = services.reduce((sum, service) => {
      return sum + parseInt(service.price);
    }, 0);
  }

  let formattedDate;
  if (date === null) {
    formattedDate = "";
  } else {
    formattedDate = moment(date).format("DD-MM-YYYY");
  }

  let formattedDateForServerRequest;
  if (date === null) {
    formattedDateForServerRequest = "";
  } else {
    formattedDateForServerRequest = moment(date).format("YYYY-MM-DD");
  }

  return (
    <AdminBookingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        services,
        date,
        removeDate,
        time,
        removeTime,
        setTime,
        chosenBarber,
        chooseBarber,
        removeBarber,
        name,
        removeName,
        email,
        removeEmail,
        availableSlots,
        setAvailableSlots,
        totalDuration,
        error,
        setError,
        handleDateChange,
        addServiceToServiceBooking,
        removeServiceFromServiceBooking,
        chooseTimeSlot,
        handleEmailInputChange,
        handleNameInputChange,
        formattedDate,
        formattedDateForServerRequest,
        timeVariableToSendToDB,
        isBookingConfirmed,
        setIsBookingConfirmed,
        resetAll,
        handleBookingConfirmation,
      }}
    >
      {children}
    </AdminBookingContext.Provider>
  );
}
