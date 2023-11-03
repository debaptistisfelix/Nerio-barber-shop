import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.infos}>
        <div className={styles.infosBox}>
          <h3 className={styles.infosTitle}>CONTATTI</h3>
          <p className={styles.info}>
            <FontAwesomeIcon icon={faPhone} className={styles.smallIcon} />
            Tel. 051 534064
          </p>
          <p className={styles.info}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.smallIcon}
            />
            Via G. Massarenti 352{" "}
          </p>
          <p className={`${styles.info} ${styles.addressToMove}`}>
            Bologna, 40138{" "}
          </p>
        </div>
        <div className={styles.infosBox}>
          <h3 className={styles.infosTitle}>ORARI</h3>

          <p className={styles.infoHour}>Mar: 8:30-12:30 15-19</p>
          <p className={styles.infoHour}>Mer: 8:30-12:30 15-19</p>
          <p className={styles.infoHour}>Gio: 8:30-12:30 15-19</p>
          <p className={styles.infoHour}>Ven: 8:30-12:30 15-19</p>
          <p className={styles.infoHour}>Sab: 8:30-12:30 15-19</p>
        </div>
      </div>
      <div className={styles.socials}>
        <h3 className={styles.socialsTitle}>Seguici sui nostri Social</h3>
        <div className={styles.iconBox}>
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          <FontAwesomeIcon icon={faTiktok} className={styles.icon} />
        </div>
      </div>
    </footer>
  );
}