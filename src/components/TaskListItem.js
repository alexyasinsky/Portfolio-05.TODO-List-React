import {CardContent, Typography, Card, CardActions, Button, Checkbox} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function TaskListItem({task}) {
  return(
    <Card sx={{ display: 'flex', width: 1, justifyContent: 'space-between' }}>
      <CardContent sx={{display: 'flex'}}>
        <Checkbox/>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {task.title}
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {task.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>
          <MoreVertIcon/>
        </Button>
      </CardActions>
    </Card>
  )
}