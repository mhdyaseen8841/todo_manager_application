import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid2 as Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function TodoCard({data,...props}) {
    
    const navigate = useNavigate();

    function formatDate(dateString) {
      const date = new Date(dateString); 
      const day = String(date.getDate()).padStart(2, '0'); 
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear(); 
    
      return `${day}/${month}/${year}`; 
    }


  return (
    <Card  sx={{ width: "100%", backgroundColor:"#fff" }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Todo ID : {data._id}
        </Typography>
        <Typography   variant="h5" component="div">
        Name : {data.description}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Created Date - {formatDate(data.createdAt)}</Typography>
        {/* <Typography   variant="h5" component="div">
        Status : {data.description}
        </Typography> */}
        <Grid container spacing={2}>
       
        <Grid   xs={6} md={8}>
        <Button variant="contained" onClick={(e)=>props.handleProject(e,true,"Edit",data)} >
          <EditIcon sx={{ marginRight: 1 }}/>
          Update</Button>
        </Grid>

        <Grid  xs={6} md={8}>
        <Button variant="outlined" onClick={(e)=>props.handleDelete(data._id)}>
        <DeleteIcon sx={{ marginRight: 1 }}/>
           Delete</Button>
        </Grid>
        </Grid>
        
      </CardContent>
      <CardActions style={{display:'flex',justifyContent:'right'}}>
        {
          data.status == "pending" ?
          (

            <Button variant='contained' color="success" size="small" onClick={()=>props.updateStatus(data._id,data)}>
              <CheckCircleIcon sx={{ marginRight: 1 }}/>
              Mark As Complete
              </Button>
          ):
          (
            
        <Button variant='contained' color="error" size="small" onClick={()=>props.updateStatus(data._id,data)}>
          <PendingIcon sx={{marginRight:1}}/>
          Move to pending</Button>
          )
        }
      </CardActions>
    </Card>
  );
}
