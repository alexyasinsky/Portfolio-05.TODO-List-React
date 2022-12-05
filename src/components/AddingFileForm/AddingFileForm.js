import {Card, CardActions, CardContent} from "@mui/material";
import './AddingFileForm.scss';
import CancelButton from "../CancelButton";
import AddButton from "../AddButton";
import {getFileNameRefById} from "../../services/firebase/storageRefs";
import {uploadBytes} from "firebase/storage";
import {useRef} from "react";
import { getDownloadURL } from "firebase/storage";

export default function AddingFileForm({id, close, addFileLinks}) {

  const fileRef = useRef(null);

  async function addFiles() {
    close();
    const fileLinks = {};
    for (const file of fileRef.current.files) {
      const ref = getFileNameRefById(id, file.name);
      await uploadBytes(ref, file);
      const url = await getDownloadURL(getFileNameRefById(id, file.name));
      Object.assign(fileLinks, {[file.name]: url})
    }
    addFileLinks(fileLinks);
  }

  return (
    <Card className='fileForm'>
      <CardContent>
        <input type="file" id="input" multiple ref={fileRef}/>
      </CardContent>
      <CardActions>
        <AddButton handler={addFiles}/>
        <CancelButton handler={close}/>
      </CardActions>
    </Card>

  )
}

