import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, Grid, Paper } from '@mui/material';

import useStyles from "../../useStyles";
export default function InsideDialog() {
  
    const classes = useStyles();
  return (
    <>
    <Grid container spacing={3} style={{marginTop:"4px"}}>
       <Grid item xs={0.5}>
         </Grid>
       <Grid item xs={11}>
         <Paper  className={classes.entryArea}>
         <Grid container spacing={2}> 
         <Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
						
							
							<span style={{flexGrow:1.1}}/>
								
									<Chip color="primary" label="Verify Vendor"  />
									<span style={{flexGrow:1}}/>
                  
                  <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="Supervisor" />}
/>
							
								
								<span style={{flexGrow:0.1}}/>
							


							</Grid>
          < Grid item xs={12}  md={2.4}>  
        
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> </Grid>
          < Grid item xs={12}  md={2.4}>  
        
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> </Grid>
          < Grid item xs={12}  md={2.4}>  
        
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> </Grid>
          < Grid item xs={12}  md={2.4}>  
        
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> </Grid>
          < Grid item xs={12}  md={2.4}>  
        
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> </Grid>
          < Grid item xs={12}  md={2.4}>  
        
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> </Grid>
         </Grid>
         </Paper>
         </Grid>
       <Grid item xs={0.5}>
         </Grid>
         

          </Grid>
          </>
    
  );
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }, ]


