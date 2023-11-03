export default async  function fetchServices() {
    const response = await fetch("/api/service", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok){
        throw new Error("Errore nel caricamento dei servizi")
    }

    const services = await response.json();

    return services;

};