import Image from 'next/image'
import styles from './page.module.css'
import Banner from './COMPONENTS/MainBanner/Banner'
import Navbar from './COMPONENTS/Navbar/Navbar'
import AboutUs from './COMPONENTS/AboutUs/AboutUs'
import Contacts from './COMPONENTS/Contacts/Contacts'
import Footer from './COMPONENTS/Footer/Footer'
import PriceList from './COMPONENTS/PriceList/PriceList'
import Reviews from './COMPONENTS/Reviews/Reviews/Reviews'
import MobileReviews from './COMPONENTS/Reviews/MobileReviews/MobileReviews'
import BookingSection from './COMPONENTS/Booking/BookingSection'
import { BookingContextProvider } from './COMPONENTS/Context/BookingContext'


export default function Home() {
  return (
    <main className={styles.homepage}>
      <Navbar />
        <Banner />
        <AboutUs />
        <Contacts />
        <PriceList />
       <BookingContextProvider>
       <BookingSection />
       </BookingContextProvider>
        <Reviews />
        <MobileReviews />
        <Footer />
        </main>
  )
}
