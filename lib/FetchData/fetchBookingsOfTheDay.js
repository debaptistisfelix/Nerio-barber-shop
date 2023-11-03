

export default async function fetchBookingsOfTheDay(formattedDateForServerRequest) {
  const response = await fetch(`/api/appointment?date=${formattedDateForServerRequest}`, {
    cache: "no-cache",
  })

    if(!response.ok){
        throw new Error("Errore nel caricamento degli appuntamenti")
    }

    const bookings = await response.json();

    return bookings;
}