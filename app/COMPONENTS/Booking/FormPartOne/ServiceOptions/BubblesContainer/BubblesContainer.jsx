import styles from "./BubblesContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";



export default function BubblesContainer({changeDisplayedServices, displayedServices}) {
  return (
    <section className={styles.options}>


        <div className={styles.option}>
          <div
            onClick={() => changeDisplayedServices(1)}
            className={`${styles.optionBox} `}
          >
            {displayedServices === 1 && (
              <div className={styles.expandingBg}></div>
            )}
            <FontAwesomeIcon
              icon={faScissors}
              className={`${styles.serviceIcon} ${
                displayedServices === 1 && styles.active
              }`}
            />
            <h5
              className={`${styles.optionTitle} ${
                displayedServices === 1 && styles.active
              }`}
            >
              CAPELLI
            </h5>
          </div>
        </div>


        <div className={styles.option}>
          <div
            onClick={() => changeDisplayedServices(2)}
            className={`${styles.optionBox} `}
          >
            {displayedServices === 2 && (
              <div className={styles.expandingBg}></div>
            )}{" "}
            <img
              className={`${styles.razorImg} ${
                displayedServices === 2 && styles.active
              }`}
              alt="icona-rasoio"
              /*  src={displayedServices === 2 ? "/razorBlack.png" : "/razor.png"} */
              src="/razor.png"
            />
            <h5
              className={`${styles.optionTitle} ${
                displayedServices === 2 && styles.active
              }`}
            >
              BARBA
            </h5>
          </div>
        </div>


        <div className={styles.option}>
          <div
            onClick={() => changeDisplayedServices(3)}
            className={`${styles.optionBox} `}
          >
            {displayedServices === 3 && (
              <div className={styles.expandingBg}></div>
            )}
            <img
              alt="icona-fiala"
              /* src={displayedServices === 3 ? "/bottleBlack.png" : "/bottle.png"} */
              src="/bottle.png"
              className={`${styles.bottleImg} ${
                displayedServices === 3 && styles.active
              }`}
            />
            <h5
              className={`${styles.optionTitle} ${
                displayedServices === 3 && styles.active
              }`}
            >
              SERVIZI
            </h5>
          </div>
        </div>
      </section>
  )
}
