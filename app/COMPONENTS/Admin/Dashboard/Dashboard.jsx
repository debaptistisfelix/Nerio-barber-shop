
"use client"
import styles from "./Dashboard.module.css"
import Navbar from "../OldNavbar/Navbar"
import Hamburger from "../OldNavbar/Hamburger"
import { useState, useEffect } from "react"
import Agenda from "./Agenda/Agenda"
import Services from "./Services/Services"
import Barbers from "./Barbers/Barbers"
import AdminBooking from "./Booking/AdminBooking"
import { useAdminBookingContext } from "../../Context/AdminBookingContext"
import { useTouchContext } from "../../Context/TouchContext"

export default function Dashboard() {
  const [activeSidebar, setActiveSidebar] = useState(null)
  const [displayedPage, setDisplayedPage] = useState(1)
  const {resetAll} = useAdminBookingContext()
  const {windowWidth, handleResize} = useTouchContext()

  const toggleSidebar = () => {
      setActiveSidebar(!activeSidebar)
  }

  const changeDisplayedPage = (page) => {
    resetAll();
    setDisplayedPage(page)
}



useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
},[])

useEffect(() => {


    if(windowWidth > 600){
       setActiveSidebar(false)
    }
},[
    windowWidth
])




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
