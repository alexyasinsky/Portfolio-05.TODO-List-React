import dayjs from "dayjs";


export default function getDateClass(date) {

  const msFromUnix = dayjs(date).valueOf();
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();

  if (msFromUnix === today) {
    return 'date_today';
  }
  if (msFromUnix < today) {
    return 'date_past';
  }
  if (msFromUnix > today) {
    return 'date_future';
  }

}