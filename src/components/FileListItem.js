import {Link, ListItem} from "@mui/material";
import {useEffect, useState} from "react";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

export default function FileListItem({file}) {

  async function getFileName() {
    return 2
  }

  return (
    <ListItem>
      {/* <Link href={}>${}</Link> */}
      {getFileName}
  </ListItem>
  )
}