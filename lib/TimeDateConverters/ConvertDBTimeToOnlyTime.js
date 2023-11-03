export default function ConvertDBTimeToOnlyTime(dbTime) {
    const dateTimeString = dbTime;
    const dateObject = new Date(dateTimeString);
  
    // Use Date object methods to extract the time part
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
  
    // Format the time as "HH:mm"
    const timePart = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return timePart;
}