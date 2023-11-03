import moment from "moment";

export default function timeConverter(date, time) {
  const utcDate = moment(date)
    .utc()
    .set({
      hour: time.split(":")[0],
      minutes: time.split(":")[1],
    });

  const localTimeSlot = utcDate._d.toLocaleTimeString("it-IT").slice(0, 5);

  return localTimeSlot;
}