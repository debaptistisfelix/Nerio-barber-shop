import styles from "./Error404.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Error404() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <section className={styles.errorPage}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.shader}></div>
        <h1 data-aos="fade-up" className={styles.title}>
          ERROR 404
        </h1>
        <p data-aos="fade-right" className={styles.parag}>
          Pagina non trovata.
        </p>
      </main>
      <Footer />
    </section>
  );
}
