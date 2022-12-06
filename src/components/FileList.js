import {List} from "@mui/material";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileListItem from './FileListItem';
import { selectCurrentTaskFilesData } from '../store/taskForm/selectors';


export default function FileList({files}) {
  debugger
  console.log(files);
    return (
      <List>
        {
          files.map(file => {
            return (
              <FileListItem file={file}/>
            )
          })
        }
      </List>
    )
}