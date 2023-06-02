import styles from "./PriceList.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PriceLine from "./PriceLine";
import { v4 as uuidv4 } from "uuid";

export default function PriceList() {
  const [hairList, setHairList] = useState(null);
  const [beardList, setBeardList] = useState(null);
  const [treatmentList, setTreatmentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getPriceList = async () => {
      try {
        const response = await axios.get("http://localhost:8001/services");
        console.log(response.data.data.services);
        const allServices = response.data.data.services;
        const hairServices = allServices.filter((service) => {
          return service.category === "capelli";
        });
        const beardServices = allServices.filter((service) => {
          return service.category === "barba";
        });
        const treatmentServices = allServices.filter((service) => {
          return service.category === "servizi";
        });
        setHairList(hairServices);
        setBeardList(beardServices);
        setTreatmentList(treatmentServices);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };

    getPriceList();
  }, []);

  console.log(hairList, beardList, treatmentList);

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
          <div className={styles.priceListContent}>
            <div className={styles.singlePrices}>
              <h2 className={styles.singlePricesTitle}>CAPELLI</h2>
              <div className={styles.actualList}>
                {hairList &&
                  hairList.map((service) => {
                    return <PriceLine key={uuidv4()} service={service} />;
                  })}
              </div>
            </div>
            <div className={styles.singlePrices}>
              <h2 className={styles.singlePricesTitle}>BARBA</h2>
              <div className={styles.actualList}>
                {beardList &&
                  beardList.map((service) => {
                    return <PriceLine key={uuidv4()} service={service} />;
                  })}
              </div>
            </div>
            <div className={styles.singlePrices}>
              <h2 className={styles.singlePricesTitle}>SERVIZI</h2>
              <div className={styles.actualList}>
                {treatmentList &&
                  treatmentList.map((service) => {
                    return <PriceLine key={uuidv4()} service={service} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
