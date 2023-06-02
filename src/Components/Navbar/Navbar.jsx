import styles from "./Navbar.module.css";
import { useState } from "react";
import "../CSS/variables.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <img src="/logoS.png" alt="logo" className={styles.logoImg} />
        </Link>

        <ul
          className={`${styles.navLinkContainer} ${
            isNavOpen ? styles.active : ""
          }`}
        >
          <li className={styles.listElement}>
            <a
              onClick={() => {
                navigate("/");
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
                navigate("/");
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
                navigate("/");
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
      </nav>
    </>
  );
}
