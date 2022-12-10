import Calendar from 'moedim';
import './MyCalendar.scss';
import {Button} from "@mui/material";


export default function MyCalendar({value, setValue, close}) {
  return (
    <div className='calendar'>
      <Calendar value={value} onChange={setValue}/>
      <Button onClick={close}>Закрыть</Button>
    </div>
  )
}