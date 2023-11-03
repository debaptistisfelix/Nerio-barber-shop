
"use client"
import styles from "./Dashboard.module.css"
import Navbar from "../OldNavbar/Navbar"
import Hamburger from "../OldNavbar/Hamburger"
import { useState } from "react"
import Agenda from "./Agenda/Agenda"
import Services from "./Services/Services"
import Barbers from "./Barbers/Barbers"
import AdminBooking from "./Booking/AdminBooking"
import { useAdminBookingContext } from "../../Context/AdminBookingContext"

export default function Dashboard() {
  const [activeSidebar, setActiveSidebar] = useState(null)
  const [displayedPage, setDisplayedPage] = useState(1)
  const {resetAll} = useAdminBookingContext()

  const toggleSidebar = () => {
      setActiveSidebar(!activeSidebar)
  }

  const changeDisplayedPage = (page) => {
    resetAll();
    setDisplayedPage(page)
}




  return (
    <section className={styles.section}>
       <Navbar
        activeSidebar={activeSidebar} 
        changeDisplayedPage={changeDisplayedPage} 
        displayedPage={displayedPage}
        toggleSidebar={toggleSidebar}
         />
       <Hamburger
        activeSidebar={activeSidebar}
         toggleSidebar={toggleSidebar}
         />
        <section className={styles.container}>
            {displayedPage === 1 && <Agenda/>}
            {displayedPage === 2 && <AdminBooking/>}
            {displayedPage === 3 && <Services/>}
            {displayedPage === 4 && <Barbers/>}  
        
        </section>
    </section>
  )
}
