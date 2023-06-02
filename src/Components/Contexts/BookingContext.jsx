import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const BookingContext = createContext();

export default function BookingContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [chosenBarber, setChosenBarber] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [displayedForm, setDisplayedForm] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [temporaryBarber, setTemporaryBarber] = useState(null);

  const showDifferentForm = (formNumber) => {
    event.preventDefault();
    setDisplayedForm(formNumber);
  };

  const resetEverything = () => {
    setError(null);
    setIsLoading(false);
    setServices([]);
    setDate(null);
    setTime(null);
    setChosenBarber(null);
    setName("");
    setPhone(null);
    setEmail("");
    setDisplayedForm(1);
  };

  const showFirstForm = () => {
    event.preventDefault();
    setDisplayedForm(1);
    setChosenBarber(null);
    setServices([]);
    setDate(null);
    setTime(null);
  };

  const showSecondForm = () => {
    event.preventDefault();
    setDisplayedForm(2);
    setDate(null);
    setName("");
    setEmail("");
    setTime(null);
  };

  const addServiceToServiceList = (service) => {
    const newServiceToAdd = { ...service, id: uuidv4() };
    setServices([...services, newServiceToAdd]);
  };

  const removeServiceFromServiceList = (id) => {
    const newServiceList = services.filter(
      (serviceItem) => serviceItem.id !== id
    );
    setServices(newServiceList);
  };

  const chooseBarber = (barber) => {
    if (barber === "Indifferente") {
      setChosenBarber("Nerio,Andrea");
      return;
    } else if (barber === "Nerio" || barber === "Andrea") {
      setChosenBarber(barber);
    }
  };

  const chooseYourBarber = (barber) => {
    setChosenBarber(barber);
  };

  const chooseTimeSlot = (timeSlot) => {
    setTime(timeSlot);
  };

  const handleNameInputChange = () => {
    setName(event.target.value);
  };

  const handleEmailInputChange = () => {
    setEmail(event.target.value);
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

  return (
    <BookingContext.Provider
      value={{
        addServiceToServiceList,
        removeServiceFromServiceList,
        handleEmailInputChange,
        handleNameInputChange,
        name,
        email,
        totalDuration,
        totalPrice,
        chosenBarber,
        chooseBarber,
        services,
        showDifferentForm,
        displayedForm,
        date,
        setDate,
        time,
        chooseTimeSlot,
        showFirstForm,
        showSecondForm,
        isLoading,
        setIsLoading,
        error,
        setError,
        temporaryBarber,
        setTemporaryBarber,
        resetEverything,
        chooseYourBarber,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
