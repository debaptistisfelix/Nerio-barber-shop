"use client"

import styles from "./Logo.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Logo() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <section className={styles.logo}>
      <main className={styles.mainLogo}>
        <div className={styles.logoBox}>
          <img
            data-aos="zoom-in"
            data-aos-delay="0"
            className={styles.logoNerio}
            alt="logo-top"
            src="/Nerio.png"
          />
          
          <img
            data-aos="fade-up"
            data-aos-delay="200"
            className={styles.logoBarberShop}
            alt="logo-bottom"
            src="/barberShopCropped.png"
          />
         
        </div>
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          className={styles.poleContainer}
        >
          <div className={styles.onlyPoleBox}>
            <img
              src="/poleEmpty.png"
              className={styles.poleImg}
              alt="Pole-png-image"
            />
            <div className={styles.arms}>
              <div className={styles.arm1}></div>
              <div className={styles.arm2}></div>
            </div>
            <div className={styles.poleGlass}>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
              <div className={styles.poleLine}></div>
            </div>
          </div>
        </div>
      </main>
      <section
        data-aos="fade-up"
        data-aos-delay="400"
        className={styles.subtitleBox}
      >
        <span className={styles.whiteLine}></span>
        <p className={styles.subtitleText}>40138</p>
        <span className={styles.whiteLine}></span>
      </section>
      <a
        data-aos="fade-down"
        data-aos-delay="1000"
        className={styles.bookBtn}
        href="#bookingSection"
      >
        PRENOTA
      </a>
    </section>
  );
}