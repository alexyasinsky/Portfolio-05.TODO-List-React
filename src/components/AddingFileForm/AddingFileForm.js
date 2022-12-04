import {Button, Card, CardActions, CardContent} from "@mui/material";
import './AddingFileForm.scss';
import CancelButton from "../CancelButton";
import AddButton from "../AddButton";
import {getFileNameRefById} from "../../services/firebase/storageRefs";
import {uploadBytes} from "firebase/storage";
import {useRef} from "react";

export default function AddingFileForm({id, close, addLinks}) {

  const fileRef = useRef(null);

  async function addFiles() {
    close();
    const fileLinks = {};
    for (const file of fileRef.current.files) {
      const fileName = file.name;
      const ref = getFileNameRefById(id, fileName);
      Object.assign(fileLinks, { [fileName]: ref});
      await uploadBytes(ref, file);
    }
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

