export default function ConvertToDateUTC (date) {
    const localDate = new Date(date);
    const DateUTC = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    return DateUTC.toISOString();
  }