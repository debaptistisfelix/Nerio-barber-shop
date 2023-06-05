import styles from "./Navbar.module.css";
import { useState } from "react";
import "../CSS/variables.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navigateToSection = (sectionId) => {
    navigate("/");
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <FontAwesomeIcon icon={faHouse} className={styles.homeBtn} />
      </Link>

      <ul
        className={`${styles.navLinkContainer} ${isNavOpen && styles.active}`}
      >
        <li className={styles.listElement}>
          <a
            onClick={() => {
              navigateToSection("priceList");
            }}
            href="#priceList"
            className={styles.navLink}
          >
            Listino Prezzi
          </a>
        </li>
        <li className={styles.listElement}>
          <a
            onClick={() => {
              navigateToSection("contacts");
            }}
            href="#contacts"
            className={styles.navLink}
          >
            Contatti
          </a>
        </li>
        <li className={styles.listElement}>
          <a
            onClick={() => {
              navigateToSection("aboutUs");
            }}
            href="#aboutUs"
            className={styles.navLink}
          >
            About Us
          </a>
        </li>
      </ul>

      <div onClick={toggleNav} className={styles.hamburgerIcon}>
        <div className={` ${styles.bar} ${isNavOpen && styles.bar1}`}></div>
        <div className={` ${styles.bar} ${isNavOpen && styles.bar2}`}></div>
        <div className={` ${styles.bar} ${isNavOpen && styles.bar3}`}></div>
      </div>
      {isNavOpen === true && <div className={styles.screenShader}></div>}
    </nav>
  );
}
