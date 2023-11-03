"use client"

import styles from "./ReviewCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function ReviewCard({ review }) {


  function renderStars() {
    let starArray = [];
    for (let i = 0; i < review.stars; i++) {
      starArray.push(
        <FontAwesomeIcon key={i} icon={faStar} className={styles.star} />
      );
    }
    return starArray;
  }

  return (
    <section
    
      className={`${styles.card} `}
    >
      <Image src="/anon.png" alt="foto-recensione" className={styles.clientImg} width={100} height={100}/>
      <h2 className={styles.name}>{review.name}</h2>
      <p className={styles.text}>{review.text}</p>
      <div className={styles.starsBox}>{renderStars()}</div>
    </section>
  );
}