import Calendar from 'moedim';
import './MyCalendar.less';
import {Button} from "@mui/material";

/**
 * компонент-обертка над календарем из пакета moedim
 * @param value - значение объекта Date
 * @param setValue - метод для установки значения объекта Date
 * @param close - метод для закрытия окна компонента
 * @returns {JSX.Element}
 * @constructor
 */

export default function MyCalendar({value, setValue, close}) {
  return (
    <div className='calendar'>
      <Calendar value={value} onChange={setValue}/>
      <Button onClick={close}>Закрыть</Button>
    </div>
  )
}