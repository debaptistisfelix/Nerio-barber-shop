import styles from "./Contacts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";


export default function Contacts() {
  return (
    <section className={styles.contacts} id="contacts">
      <div className={styles.contactBox}>
        <FontAwesomeIcon icon={faStore} className={styles.contactIcon} />
        <div className={styles.contactText}>
          <h3 className={styles.title}>DOVE</h3>
          <p className={styles.text}>Via Giuseppe Massarenti 352</p>
          <p className={styles.text}>40138, Bologna</p>
          <a
            className={styles.link}
            href="https://www.google.com/maps/place/Nerio+Barber+Shop/@44.4932812,11.3745548,17z/data=!3m1!4b1!4m6!3m5!1s0x477e2b4f41e85e67:0x9491c202ab11bbe5!8m2!3d44.4932774!4d11.3771297!16s%2Fg%2F1v62ghfd"
            target="_blank"
          >
            INDICAZIONI
          </a>
        </div>
      </div>

      <div className={styles.contactBox}>
        <FontAwesomeIcon icon={faMobileAlt} className={`${styles.contactIcon} ${styles.phoneIcon}`} />
        <div className={styles.contactText}>
          <h3 className={styles.title}>TELEFONO</h3>
          <p className={styles.text}>Contattaci al numero:</p>
          <p className={styles.text}>051 534064</p>
          <a className={styles.link} href="tel:051534064">
            CHIAMA ORA
          </a>
        </div>
      </div>

      <div className={styles.contactBox}>
        <FontAwesomeIcon icon={faWhatsapp} className={styles.contactIcon} />
        <div className={styles.contactText}>
          <h3 className={styles.title}>WHATSAPP</h3>
          <p className={styles.text}>Contattaci:</p>
          <p className={styles.text}>via Chat</p>
          <a
            className={styles.link}
            href="https://api.whatsapp.com/send?phone=3298911991"
            target="_blank"
          >
            CHATTA CON NOI
          </a>
        </div>
      </div>
    </section>
  );
}