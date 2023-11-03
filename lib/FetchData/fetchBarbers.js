

export default async  function fetchBarbers() {
    const response = await fetch("/api/barber");

    if(!response.ok){
        throw new Error("Errore nel caricamento dei barbieri")
    }

    const barbers = await response.json();

    return barbers;

}