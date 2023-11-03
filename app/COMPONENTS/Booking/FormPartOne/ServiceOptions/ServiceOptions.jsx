"use client"

import styles from "./ServiceOptions.module.css";
import { useState, useEffect, useRef } from "react";
import { useBookingContext } from "@/app/COMPONENTS/Context/BookingContext";
import { useTouchContext } from "@/app/COMPONENTS/Context/TouchContext";

import fetchServices from "@/lib/FetchData/fetchServices";
import fetchBarbers from "@/lib/FetchData/fetchBarbers";

import BubblesContainer from "./BubblesContainer/BubblesContainer";
import ServiceList from "./ServiceList/ServiceList";
import ChoosenServicesList from "../ChoosenServicesList/ChoosenServicesList";
import BarbersList from "../BarbersList/BarbersList";

import notify from "@/lib/toastNotify";



export default function ServiceOptions({ bookingSectionRef }) {
  const { showDifferentForm, booking, updateBookingTotals } =
    useBookingContext();
  const { handleResize, windowWidth } = useTouchContext();
  //Services list that is shown in the service list section based on what user clicks
  const [displayedServices, setDisplayedServices] = useState(1);
  //State that contains all the services from the database
  const [availableServices, setAvailableServices] = useState(null);
  //State that contains all the barbers from the database
  const [availableBarbers, setAvailableBarbers] = useState(null);
  //Loading state for fetching both services and barbers
  const [isLoading, setIsLoading] = useState({
    services: false,
    barbers: false,
  
  });
  const choicesListRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  },[])


  const showAddedServices = ()=>{
    const choicesList = choicesListRef.current;
    if(windowWidth < 600){
      choicesList.scrollIntoView({ behavior: "smooth"});
    }
  }
 

  const changeDisplayedServices = (service) => {
    setDisplayedServices(service);
  };

  useEffect(() => {

    const getServices = async () => {
      setIsLoading((prevState) => {
        return { ...prevState, services: true };
      });
      const services = await fetchServices();
      const hairServices = services.filter((service) => {
        return service.category === "capelli";
      });
      const beardServices = services.filter((service) => {
        return service.category === "barba";
      });
      const treatmentServices = services.filter((service) => {
        return service.category === "servizi";
      });
      setAvailableServices({
        capelli: hairServices,
        barba: beardServices,
        servizi: treatmentServices,
      
      })
      setIsLoading((prevState) => {
        return { ...prevState, services: false };
      });
    };

    const getBarbers = async () => {
      setIsLoading((prevState) => {
        return { ...prevState, barbers: true };
      });
      const barbers = await fetchBarbers();
      setAvailableBarbers(barbers);
      setIsLoading((prevState) => {
        return { ...prevState, barbers: false };
      });
    };
    getServices();
    getBarbers();
   
  }, []);

  useEffect(()=>{
    //If the user has already selected some services, update the totals
    if(booking?.services !== null && booking?.services.length > 0){
      const totalDuration = booking?.services.reduce((sum, service) => {
        return sum + parseInt(service.duration);
      }, 0);
      const totalPrice = booking?.services.reduce((sum, service) => {
        return sum + parseInt(service.price);
      }, 0);
      updateBookingTotals(totalPrice, totalDuration);
    }
  },[
    booking?.services
  ])

 



      const handleNext = () => {
          showDifferentForm(2);
            bookingSectionRef.current &&
              bookingSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }


  return (
    <section className={styles.optionsContainer}>
      <BubblesContainer changeDisplayedServices={changeDisplayedServices} displayedServices={displayedServices}/>
      <ServiceList isLoading={isLoading} availableServices={availableServices} displayedServices={displayedServices} showAddedServices={showAddedServices} />

      <section className={styles.finalSteps}>
        <ChoosenServicesList choicesListRef={choicesListRef}/>
        <BarbersList isLoading={isLoading} availableBarbers={availableBarbers} />
      {
        availableBarbers !== null &&  <button
        onClick={() => {
          if( booking?.services.length === 0 || booking?.barber === null){
            notify("Seleziona almeno un servizio e ud un barbiere per continuare", "error");
          } else if(booking?.services.length > 0 && booking?.barber !== null) {
            handleNext();
          }
        }}
        className={styles.submitBtn}
      >
        AVANTI
      </button>
      }
      </section>
    </section>
  );
}