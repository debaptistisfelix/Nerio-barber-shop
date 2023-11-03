
export default async  function fetchAvailableSlots(chosenBarber, formattedDateForServerRequest, totalDuration) {
    const response = await fetch( `/api/appointment/getAvailability`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            barberId: chosenBarber,
            date: formattedDateForServerRequest,
            duration: totalDuration,
        }),
        cache: "no-cache",
    })

    if(!response.ok){
        throw new Error("Errore nel caricamento degli slot")
    }

    const availableSlots = await response.json();

    return availableSlots;
}