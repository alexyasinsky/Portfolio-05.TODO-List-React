import {List, Link, ListItem} from "@mui/material";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentTaskFilesData } from '../store/taskForm/selectors';
import { getFilesOfCurrentTask } from '../store/taskForm/actions';


export default function FileList() {
  const files = useSelector(selectCurrentTaskFilesData);
  return (
    <List>
      {
        files.map((file, idx) => {
          return (
            <ListItem key={idx}>
              <Link href={file.url}>${file.data.name}</Link>
            </ListItem>
          )
        })
      }
    </List>
  )
}