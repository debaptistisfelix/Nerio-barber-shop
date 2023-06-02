import styles from "./ReviewCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../CSS/variables.css";

export default function ReviewCard({ review }) {
  const { ref, inView, entry } = useInView({ threshold: 0 });

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
      ref={ref}
      className={`${styles.card} ${inView === true ? styles.cardAppears : ""}`}
    >
      <h2 className={styles.name}>{review.name}</h2>
      <p className={styles.text}>{review.text}</p>
      <div className={styles.starsBox}>{renderStars()}</div>
    </section>
  );
}
