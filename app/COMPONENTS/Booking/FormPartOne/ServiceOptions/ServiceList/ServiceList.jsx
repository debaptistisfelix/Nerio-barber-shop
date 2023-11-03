import styles from "./ServiceList.module.css"
import ServiceBox from "../../ServiceBox/ServiceBox";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";
import { v4 as uuidv4 } from "uuid";

export default function ServiceList({isLoading, availableServices, displayedServices, showAddedServices}) {
  return (
<section className={styles.serviceList}>
        <img  className={styles.logo} alt="logo" src="logoS.png" />
        <div className={styles.topPoints}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.bottomPoints}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        {isLoading.services === true && availableServices === null &&  <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"white"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
        {displayedServices === 1 && (
          <div className={styles.list}>
              {
                availableServices?.capelli !== null &&  availableServices?.capelli.map((service) => {
                  return <ServiceBox service={service} key={uuidv4()}  showAddedServices={showAddedServices}/>;
                })
              }
          </div>
        )}

        {displayedServices === 2 && (
          <div className={styles.list}>
            
               {
                availableServices?.barba !== null &&  availableServices?.barba.map((service) => {
                  return <ServiceBox service={service} key={uuidv4()}  showAddedServices={showAddedServices}/>;
                })
              }
          </div>
        )}

        {displayedServices === 3 && (
          <div className={styles.list}>
            {
                availableServices?.servizi !== null &&  availableServices?.servizi.map((service) => {
                  return <ServiceBox service={service} key={uuidv4()}  showAddedServices={showAddedServices}/>;
                })
              }
          </div>
        )}
      </section>
  )
}
