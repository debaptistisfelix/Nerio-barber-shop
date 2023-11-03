"use client"

import styles from "./CancelBooking.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from 'next/navigation'
import PointLoader from "../Loader/PointLoader/PointLoader";


export default function CancelBooking() {
  const [cancellationConfirmed, setCancellationConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCHeckingLoading, setIsCheckingLoading] = useState(true);
  const [BookingAlreadyDeleted, setBookingAlreadyDeleted] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
    checkIfBookingExists();
  }, []);

  const checkIfBookingExists = async () => {
        try{
        const response = await fetch(`/api/appointment/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if(response.status === 404){
            setBookingAlreadyDeleted(true);
            setIsCheckingLoading(false);
            return 
        }
        setBookingAlreadyDeleted(false);
        setIsCheckingLoading(false);
        }
        catch(error){
        
        console.log(error)
        }
        };

    console.log(BookingAlreadyDeleted)

  const handleCancellationRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/appointment/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
      );
      console.log(response);
      setIsLoading(false);
      setCancellationConfirmed(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error);
      setCancellationConfirmed(false);
    }
  };

  return (
    <section className={styles.cancelBooking}>
      <main className={styles.main}>
        {isCHeckingLoading === true && <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"white"}
          loaderHeight={"50px"} loaderWidth={"150px"} loaderMargin={"50px 0"}/> }


        {BookingAlreadyDeleted === true && <>
       <div className={styles.shader}></div>
       <FontAwesomeIcon
              data-aos="fade-down"
              icon={faCircleCheck}
              className={styles.icon}
            />
       <p
        data-aos="flip-down"
        data-aos-delay="400"
       className={styles.parag}>Prenotazione già cancellata</p></>}


       {BookingAlreadyDeleted === false &&  <>
       <div className={styles.shader}></div>
        {cancellationConfirmed ? (
          <div className={styles.confirmation}>
            <FontAwesomeIcon
              data-aos="fade-down"
              icon={faCircleCheck}
              className={styles.icon}
            />
            <h1 data-aos="fade-right" className={styles.confirmationTitle}>
              APPUNTAMENTO CANCELLATO
            </h1>
          </div>
        ) : (
          <div className={styles.cancelContainer}>
            <h1 data-aos="fade-down" className={styles.title}>
              CANCELLA APPUNTAMENTO
            </h1>
            <p data-aos="fade-right" className={styles.parag}>
              Premi il pulsante per cancellare il tuo appuntamento presso il
              nostro Barber-shop
            </p>
            <button
              onClick={handleCancellationRequest}
              data-aos="flip-down"
              data-aos-delay="400"
              className={styles.btn}
            >
              {isLoading === true ? (
                <p className={styles.btnLoading}>ATTENDI</p>
              ) : (
                "ANNULLA IL TUO APPUNTAMENTO"
              )}
            </button>
          </div>
        )}</>}
     
       
     
      
      </main>
    </section>
  );
}