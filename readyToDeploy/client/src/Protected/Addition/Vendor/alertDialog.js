import * as React from 'react';
import useStyles from "../../useStyles";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Fab from '@mui/material/Fab';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";
import { Tooltip } from '@mui/material';


export default function AlertDialog() {
    const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        
      
<Fab color="primary" type="submit"  onClick={handleClickOpen} className={classes.button}>
    <MdDoneAll />
</Fab>

    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Just Call's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Just Call help apps determine location. This means sending anonymous
            location data to Just Call, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button type="submit"  autoFocus>
           			 Agree                  
         			 </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}