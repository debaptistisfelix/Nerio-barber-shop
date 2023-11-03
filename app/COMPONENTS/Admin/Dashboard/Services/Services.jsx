"use client"

import styles from "./Services.module.css";
import { useState, useEffect } from "react";
import AddServiceForm from "./AddServiceForm/AddServiceForm";
import ServicesLists from "./ServicesList/ServicesList";
import AddedServiceConfirm from "./AddedServiceConfirm/AddedServiceConfirm";
import PointLoader from "@/app/COMPONENTS/Loader/PointLoader/PointLoader";
import FullScreenLoader from "../../FullScreenLoader/FullScreenLoader";
import { useAdminBookingContext } from "@/app/COMPONENTS/Context/AdminBookingContext";
import notify from "@/lib/toastNotify";
export default function Services() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceAddingLoading, setServiceAddingLoading] = useState(false);
  const {isFullscreenLoading, setIsFullscreenLoading} = useAdminBookingContext();

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "/api/service",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          }
        );
         const data = await response.json();
        setServices(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const removeService = async (id) => {
    try {
      setIsFullscreenLoading(true);
      const response = await fetch(
        `/api/service/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
      );
      const filteredServices = services.filter((service) => {
        return service.id !== id;
      });
      setServices(filteredServices);
      setIsFullscreenLoading(false);
      notify("Servizio cancellato con successo", "success");
    } catch (error) {
      console.log(error);
      setIsFullscreenLoading(false);
      notify("Si è verificato un errore durante la cancellazione del servizio", "error");
    }
  };

  const updateService = async (id, service) => {
    try {
      setIsFullscreenLoading(true);
      const response = await fetch(
        `/api/service/${id}`,
        {
          method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: service.name,
                duration: service.duration,
                price: service.price,
            }),
        }
      );
      const data = await response.json();
      const updatedService = data;

      const servicesFilteredFromOldService = services.filter((service) => {
        return service.id !== id;
      });
      setServices([...servicesFilteredFromOldService, updatedService]);
      setIsFullscreenLoading(false);
      notify("Servizio aggiornato con successo", "success");
    } catch (error) {
      console.log(error);
      setIsFullscreenLoading(false);
      notify("Si è verificato un errore durante l'aggiornamento del servizio", "error");
    }
  };

  const addService = async (service) => {
    try {
      setIsFullscreenLoading(true);
      setServiceAddingLoading(true);
      const response = await fetch(
        "/api/service",
        {
         method: "POST",
         headers:{
            "Content-Type": "application/json",
             },
            body: JSON.stringify({
                name: service.name,
                duration: service.duration,
                price: service.price,
                category: service.category,
            }),
        }
      );
      const data = await response.json();

      setServices([...services, data]);
      setServiceAddingLoading(false);

      setIsFullscreenLoading(false);
      notify("Servizio aggiunto con successo", "success");
    } catch (error) {
      console.log(error);
      setServiceAddingLoading(false);
      notify("Si è verificato un errore durante l'aggiunta del servizio", "error");
      setIsFullscreenLoading(false);
    }
  };



  return (
    <>
    <section className={styles.services}>
      <main className={styles.allServicesContainer}>
        <h1 className={styles.servicesTitle}>LISTA SERVIZI</h1>
        <ServicesLists
        isLoading={isLoading}
          error={error}
          updateService={updateService}
          services={services}
          removeService={removeService}
        />
      </main>
      <section className={styles.serviceForm}>
        <h1 className={styles.serviceFormTitle}>AGGIUNGI SERVIZIO</h1>
        <AddServiceForm addService={addService} />
        {serviceAddingLoading === true && <PointLoader
          pointWidth={"15px"} pointHeight={"15px"} pointColor={"var(--dark-grey"}
          loaderHeight={"50px"} loaderWidth={"100px"} loaderMargin={"50px 0"}/>}
       
      </section>
    </section>
    {isFullscreenLoading === true && <FullScreenLoader />}
    </>
  );
}