import styles from "./Reviews.module.css";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import "../CSS/variables.css";

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviews = [
    {
      name: "Enrico Martelli",
      text: "Un vero barber shop in continua evoluzione, sempre con un piede nella tradizione, professionalità e onestà, consigliatissimo!",
      stars: 5,
    },
    {
      name: "Ferruccio Panario",
      text: "Da più di 30 anni è il mio barbiere.... A buon intenditor, poche parole. Forza Bologna!",
      stars: 5,
    },
    {
      name: "Stefano Pippa",
      text: "Ho perso il conto di quanti anni siano passati da quando ho iniziato ad andare a tagliarmi i capelli da Nerio, penso siano almeno venti. Ho iniziato ad andarci con mio padre e adesso ci vado con mio figlio. È una tradizione!",
      stars: 5,
    },
    {
      name: "Marco Melotti",
      text: "Il barbiere di una volta: bravo simpatico veloce puntuale impeccabile. Nerio numero 1.",
      stars: 5,
    },
    {
      name: "Federico Rubino",
      text: "Prezzi onesti e tipico ambiente bolognese",
      stars: 5,
    },
    {
      name: "Claudio Bergonzoni",
      text: "Sono affezionato cliente da oltre 30 anni... ambiente cordiale e competenza decennale",
      stars: 5,
    },
    {
      name: "Gabriele Bianconi",
      text: "Da Nerio ci si va per trovare un amico e poi per i capelli.",
      stars: 3,
    },
    {
      name: "Massimo Masotti",
      text: "Esperienza e cortesia. Il top del classico barbiere.",
      stars: 5,
    },
    {
      name: "Massimo Rambaldi",
      text: "Bravura e simpatia. Taglio alla moda.",
      stars: 5,
    },
    {
      name: "Matteo Di Maio",
      text: "Taglio e barba moderni eccellenti oltretutto è un grandissimo tifoso della Virtus basket",
      stars: 5,
    },
    {
      name: "Baldo Cianci",
      text: "eccellente!",
      stars: 5,
    },
    {
      name: "Manuela Gasperini",
      text: "Barbiere molto bravo e gentile, ci accompagno mio padre.",
      stars: 5,
    },
  ];

  function handlePrevBtn() {
    if (currentPage === 1) {
      setCurrentPage(4);
    } else if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  function handleNextBtn() {
    if (currentPage === 4) {
      setCurrentPage(1);
    } else if (currentPage < 4) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  const renderReviews = () => {
    const reviewsPerPage = 3;

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const reviewsToDisplay = reviews.slice(startIndex, endIndex);

    return reviewsToDisplay.map((review, i) => (
      <ReviewCard key={review.name} review={review} />
    ));
  };

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
          Google del nostro Negozio.
        </h5>
        <div className={styles.cardsContainer}>
          {renderReviews()}
          <div className={styles.navigation}>
            <button className={styles.arrowBtn} onClick={handlePrevBtn}>
              <FontAwesomeIcon icon={faCaretLeft} className={styles.arrow} />
            </button>
            <button className={styles.arrowBtn}>
              {" "}
              <FontAwesomeIcon
                icon={faCaretRight}
                className={styles.arrow}
                onClick={handleNextBtn}
              />
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
