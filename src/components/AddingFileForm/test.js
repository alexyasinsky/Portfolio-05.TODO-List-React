import {Card, CardActions, CardContent} from "@mui/material";
import AddButton from "../AddButton";
import CancelButton from "../CancelButton";
import './AddingFileForm.scss';
// import {useRef} from "@types/react";

export default function TestComp({id, close}) {

  // const fileRef = useRef(null);

  return (
    <Card className='fileForm'>
      <CardContent>
        {/*<input type="file" id="input" multiple ref={fileRef}/>*/}
      </CardContent>
      <CardActions>
        {/*<AddButton handler={addFiles}/>*/}
        <CancelButton handler={close}/>
      </CardActions>
    </Card>

  )
}