export default function ConvertDBTimeToItalianTime(dbTime) {
    const dateTimeString = dbTime;
    const dateObject = new Date(dateTimeString);

    // Set the timeZone option to "Europe/Rome" for Italian timezone
    const italianTime = dateObject.toLocaleTimeString('en-US', { timeZone: 'Europe/Rome', hour12: false });

    // Extract only the time part (HH:mm)
    const timePart = italianTime.slice(0, 5);

    return timePart;
}