import {List, Link, ListItem} from "@mui/material";
import { useSelector } from 'react-redux';
import { selectCurrentTaskFilesData } from '../../store/currentTask/selectors';


/**
 * компонент, генерирующий список файлов текущего задания
 * @returns {JSX.Element}
 * @constructor
 */

export default function FileList() {
  const files = useSelector(selectCurrentTaskFilesData);
  return (
    <List>
      {
        files.map((file, idx) => {
          return (
            <ListItem key={idx}>
              <Link href={file.url}>{file.data.name}</Link>
            </ListItem>
          )
        })
      }
    </List>
  )
}