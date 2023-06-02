import styles from "./Homepage.module.css";
import Navbar from "../Navbar/Navbar";
import Banner from "../MainBanner/Banner";
import Contacts from "../Contacts/Contacts";
import PriceList from "../PriceList/PriceList";
import BookingSection from "../Booking/BookingSection";
import AboutUs from "../AboutUs/AboutUs";
import Reviews from "../Reviews/Reviews";
import MobileReviews from "../Reviews/MobileReviews";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import BookingContextProvider from "../Contexts/BookingContext";

export default function Homepage() {
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

  return (
    <section className={styles.Homepage}>
      <Navbar />
      <Banner />
      <Contacts />
      <PriceList />
      <BookingContextProvider>
        <BookingSection />
      </BookingContextProvider>
      <AboutUs />
      {isMobile ? <MobileReviews /> : <Reviews />}
      <Footer />
    </section>
  );
}
