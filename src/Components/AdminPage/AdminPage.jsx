import styles from "./AdminPage.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Agenda from "./Agenda/Agenda";
import AdminBooking from "./Booking/AdminBooking";
import TimeDisplayer from "./TimeDisplayer";
import Authentication from "./Authentication/Authentication";
import Services from "./Services/Services";
import Barbers from "./Barbers/Barbers";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AdminBookingContextProvider from "../Contexts/AdminBookingContext";
import Cookies from "universal-cookie";

export default function AdminPage() {
  const [displayedPage, setDisplayedPage] = useState(1);
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSetLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const handleSetLoggedOut = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
    cookies.remove("token", {
      path: "/admin",
      expires: expirationDate,
      secure: true,
      sameSite: "strict",
    });

    setIsLoggedIn(false);
  };

  const handleSideLinkClick = (number) => {
    setDisplayedPage(number);
    setActiveSidebar(false);
  };

  useEffect(() => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
    const token = cookies.get("token", {
      path: "/admin",
      expires: expirationDate,
      secure: true,
      sameSite: "strict",
    });
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section className={styles.AdminPage}>
      <main className={styles.adminContainer}>
        <div
          onClick={() => setActiveSidebar(!activeSidebar)}
          className={styles.container}
        >
          <div
            style={{
              backgroundColor:
                activeSidebar === true && isMobile
                  ? "var(--white-pure)"
                  : "var(--dark-grey)",
            }}
            className={`${styles.bar1} ${
              activeSidebar === true && styles.active
            }`}
          ></div>
          <div
            style={{
              backgroundColor:
                activeSidebar === true && isMobile
                  ? "var(--white-pure)"
                  : "var(--dark-grey)",
            }}
            className={`${styles.bar2} ${
              activeSidebar === true && styles.active
            }`}
          ></div>
          <div
            style={{
              backgroundColor:
                activeSidebar === true && isMobile
                  ? "var(--white-pure)"
                  : "var(--dark-grey)",
            }}
            className={`${styles.bar3} ${
              activeSidebar === true && styles.active
            }`}
          ></div>
        </div>
        <section
          className={`${styles.sideNav} ${
            activeSidebar === true && styles.active
          } ${activeSidebar === false && styles.notActive}`}
        >
          <div className={styles.sideNavSmallContainer}>
            <Link to="/">
              <img className={styles.logo} alt="logo" src="logo.png" />
            </Link>
            <h1 className={styles.dashboardTitle}>DASHBOARD</h1>
            <div className={styles.timeDisplayerContainer}>
              <TimeDisplayer />
            </div>
            {isLoggedIn && (
              <div className={styles.sideLinks}>
                <h3
                  onClick={() => handleSideLinkClick(1)}
                  className={`${styles.sideLink} ${
                    displayedPage === 1 && styles.active
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className={styles.icon}
                  />
                  Agenda
                </h3>
                <h3
                  onClick={() => handleSideLinkClick(2)}
                  className={`${styles.sideLink} ${
                    displayedPage === 2 && styles.active
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className={styles.icon}
                  />
                  Prenota
                </h3>
                <h3
                  onClick={() => handleSideLinkClick(3)}
                  className={`${styles.sideLink} ${
                    displayedPage === 3 && styles.active
                  }`}
                >
                  <FontAwesomeIcon icon={faScissors} className={styles.icon} />
                  Servizi
                </h3>
                <h3
                  onClick={() => handleSideLinkClick(4)}
                  className={`${styles.sideLink} ${
                    displayedPage === 4 && styles.active
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                  Barbieri
                </h3>
              </div>
            )}
            {isLoggedIn === true && (
              <button onClick={handleSetLoggedOut} className={styles.logoutBtn}>
                LOG OUT
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={styles.iconLogOut}
                />
              </button>
            )}
          </div>
        </section>
        <section className={styles.dashboard}>
          {isLoggedIn === false && (
            <Authentication handleSetLoggedIn={handleSetLoggedIn} />
          )}
          {isLoggedIn && displayedPage === 1 && <Agenda />}
          {isLoggedIn && displayedPage === 2 && (
            <AdminBookingContextProvider>
              <AdminBooking />
            </AdminBookingContextProvider>
          )}
          {isLoggedIn && displayedPage === 3 && <Services />}
          {isLoggedIn && displayedPage === 4 && <Barbers />}
        </section>
      </main>
      <Footer />
    </section>
  );
}
