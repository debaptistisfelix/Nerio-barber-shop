import styles from "./BarbersList.module.css"
import React from 'react'
import BarberCard from "./BarberCard/BarberCard";
import { v4 as uuidv4 } from "uuid";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";

export default function BarbersList({availableBarbers, isLoading}) {
  return (
    <section className={styles.barberChoiceContainer}>
          <p className={styles.mobileBarberIntro}>
            Scegli il tuo <b>barbiere di fiducia</b> o seleziona "Indifferente".
          </p>
        <section className={styles.barberChoice}>
          {isLoading.barbers === true && availableBarbers === null &&  <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"#191919"}
          loaderHeight={"30px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
          {availableBarbers &&
            availableBarbers.map((barber) => {
              return <BarberCard barber={barber} key={uuidv4()} />;
            })}
        </section>
        </section>
  )
}
