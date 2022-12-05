import {List} from "@mui/material";
import { useSelector } from 'react-redux';
import { selectCurrentTaskFileList } from '../store/taskForm/selectors';
import FileListItem from './FileListItem';


export default function FileList() {
  const fileList = useSelector(selectCurrentTaskFileList);
  if (fileList) {
    return (
      <List>
        {
          fileList.map(file => {
            return (
              <FileListItem file={file}/>
            )
          })
        }
      </List>
    )
  } else {
    return
  }
}