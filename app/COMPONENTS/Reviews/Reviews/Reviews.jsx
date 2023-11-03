"use client"

import styles from "./Reviews.module.css";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";


export default function Reviews() {
  const reviews = [
 
    {
      name: "Ferruccio Panario",
      text: "Da più di 30 anni è il mio barbiere.... A buon intenditor, poche parole. Forza Bologna!",
      stars: 5,
    },
  
    {
      name: "Marco Melotti",
      text: "Il barbiere di una volta: bravo simpatico veloce puntuale impeccabile. Nerio numero 1.",
      stars: 5,
    },
  
    {
      name: "Claudio Bergonzoni",
      text: "Sono affezionato cliente da oltre 30 anni... ambiente cordiale e competenza decennale",
      stars: 5,
    },
   
  
    
  ];


 

  return (
    <section className={styles.reviewsContainer}>
      <div className={styles.customShapeDividerTop}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={styles.shapeFill}
          ></path>
        </svg>
      </div>
      <main className={styles.reviews}>
        <h2 className={styles.reviewsTitle}>RECENSIONI DEI NOSTRI CLIENTI</h2>
        <h5 className={styles.subtitle}>
          Di seguito alcune recensioni lasciate dai nostri clienti sulla pagina
          Google del nostro Barber-shop.
        </h5>
        <div className={styles.cardsContainer}>
          {reviews.map((review, i) => (
      <ReviewCard key={review.name} review={review} />
    ))}
         
        </div>
      </main>
    </section>
  );
}