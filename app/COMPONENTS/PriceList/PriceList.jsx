"use client";
import styles from "./PriceList.module.css";
import { useState, useEffect } from "react";
import PriceLine from "./PriceLine";
import { v4 as uuidv4 } from "uuid";
import fetchServices from "@/lib/FetchData/fetchServices";
import PointLoader from "../Loader/PointLoader/PointLoader";


export default function PriceList() {
  const [hairList, setHairList] = useState(null);
  const [beardList, setBeardList] = useState(null);
  const [treatmentList, setTreatmentList] = useState(null);
  const [data, setData] = useState({
    capelli:null,
    barba:null,
    servizi:null
  });
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   setFetchState({
        isLoading: true,
        isError: false,
    
   })
    const getPriceList = async () => {
      try {
        const allServices = await fetchServices();
        const hairServices = allServices.filter((service) => {
          return service.category === "capelli";
        });
        const beardServices = allServices.filter((service) => {
          return service.category === "barba";
        });
        const treatmentServices = allServices.filter((service) => {
          return service.category === "servizi";
        });
        setData({
            capelli: hairServices,
            barba: beardServices,
            servizi: treatmentServices,
        })
        setFetchState({
            isLoading: false,
            isError: false,
        })
      } catch (error) {
        console.log(error);
        setFetchState({
            isLoading: false,
            isError: true,
        })
      }
    };

    getPriceList();
  }, []);

  return (
    <section className={styles.priceListContainer} id="priceList">
      <section className={styles.priceList}>
        <div className={styles.border}>
          <header className={styles.titleBox}>
            <img src="/logoS.png" className={styles.logo} />
            <img
              src="/ListinoPrezziScritta.png"
              className={styles.curvedTitle}
            />
          </header>
          {fetchState.isError && !fetchState.isLoading && <div className={styles.errorMsg}>Errore nel caricamento dei servizi.</div>}
          {fetchState.isLoading && !fetchState.isError &&  <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"white"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/> }
          {!fetchState.isLoading && !fetchState.isError &&  <div className={styles.priceListContent}>
            <div className={styles.singlePrices}>
              <h2 className={styles.singlePricesTitle}>CAPELLI</h2>
              <div className={styles.actualList}>
            
                {data.capelli !== null &&
                  data?.capelli.map((service) => {
                    return <PriceLine key={uuidv4()} service={service} />;
                  })}
              </div>
            </div>
            <div className={styles.singlePrices}>
              <h2 className={styles.singlePricesTitle}>BARBA</h2>
              <div className={styles.actualList}>
                {data.barba !== null &&
                  data.barba.map((service) => {
                    return <PriceLine key={uuidv4()} service={service} />;
                  })}
              </div>
            </div>
            <div className={styles.singlePrices}>
              <h2 className={styles.singlePricesTitle}>SERVIZI</h2>
              <div className={styles.actualList}>
                {data.servizi!== null &&
                  data.servizi.map((service) => {
                    return <PriceLine key={uuidv4()} service={service} />;
                  })}
              </div>
            </div>
          </div>}
        
        </div>
      </section>
    </section>
  );
}