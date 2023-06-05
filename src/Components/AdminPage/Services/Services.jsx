import styles from "./Services.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AddServiceForm from "./AddServiceForm";
import ServicesLists from "./ServicesLists";
import AddedServiceConfirm from "./AddedServiceConfirm";

export default function Services() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [addedSuccesfully, setAddedSuccesfully] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://barber-server.cyclic.app/services"
        );
        setServices(response.data.data.services);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchServices();
  }, []);

  const removeService = async (id) => {
    try {
      const response = await axios.delete(
        `https://barber-server.cyclic.app/services/${id}`
      );
      const filteredServices = services.filter((service) => {
        return service._id !== id;
      });
      setServices(filteredServices);
    } catch (error) {
      console.log(error);
    }
  };

  const updateService = async (id, service) => {
    try {
      const response = await axios.patch(
        `https://barber-server.cyclic.app/services/${id}`,
        {
          service: service.service,
          duration: service.duration,
          price: service.price,
        }
      );
      const updatedService = response.data.data.service;
      console.log(updatedService);
      const servicesFilteredFromOldService = services.filter((service) => {
        return service._id !== id;
      });
      setServices([...servicesFilteredFromOldService, updatedService]);
    } catch (error) {
      console.log(error);
    }
  };

  const addService = async (service) => {
    try {
      const response = await axios.post(
        "https://barber-server.cyclic.app/services",
        {
          service: service.service,
          duration: service.duration,
          price: service.price,
          category: service.category,
        }
      );
      setServices([...services, response.data.data.service]);
      setAddedSuccesfully(true);
      setTimeout(() => {
        setAddedSuccesfully(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setAddedSuccesfully(false);
    }
  };

  useEffect(() => {
    if (addedSuccesfully && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [addedSuccesfully]);

  return (
    <section className={styles.services}>
      <main className={styles.allServicesContainer}>
        <h1 className={styles.servicesTitle}>LISTA SERVIZI</h1>
        <ServicesLists
          error={error}
          updateService={updateService}
          services={services}
          removeService={removeService}
        />
      </main>
      <section className={styles.serviceForm}>
        <h1 className={styles.serviceFormTitle}>AGGIUNGI SERVIZIO</h1>
        <p className={styles.formIntro}>
          Aggiungi o rimuovi i servizi offerti dal tuo Barber-shop in base alle
          tue esigenze o disponibilità di articoli.
        </p>
        <AddServiceForm addService={addService} />
        {addedSuccesfully === true && <AddedServiceConfirm />}
      </section>
    </section>
  );
}
