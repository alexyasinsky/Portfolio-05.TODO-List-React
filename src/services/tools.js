import dayjs from "dayjs";

/**
 * функция для получения значения класса даты путем сравнения значений текущей даты с полученной в качестве параметра
 * @param date - объект типа Date
 * @returns {string} - значение класса даты
 */
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