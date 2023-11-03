"use client"
import Link from "next/link";
import styles from "./not-found.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <section className={styles.errorPage}>
 
      <main className={styles.main}>
        <div className={styles.shader}></div>
        <h1 data-aos="fade-up" className={styles.title}>
          ERROR 404
        </h1>
        <p data-aos="fade-right" className={styles.parag}>
          Pagina non trovata.
        </p>
        <Link data-aos="flip-down" data-aos-delay="400"  className={styles.backBtn} href="/">Indietro</Link>
      </main>
     
    </section>
  );
}