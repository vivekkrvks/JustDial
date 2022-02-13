import React from "react";
import {TextField, Grid, Container, Button} from '@mui/material';
// import Container from '@mui/material/Container';

export default function Login() {
	
	
	return (
		<div>
			<form>
			<Container maxWidth="sm"> 
			<Grid container spacing={2} justify="center" marginTop={5}>
  			<Grid item xs={6} md={8}>
  			<TextField id="outlined-basic" label="Reg No. / Mobile No" variant="outlined" />
 		 </Grid>
  			<Grid item xs={6} md={8}>
  			<TextField id="outlined-basic" label="Pasword" variant="outlined" />
 		 </Grid>
		  <Grid item xs={6} md={8}>
		  <Button variant="contained" color="success">
        Login
		
      </Button>
	  </Grid>  
</Grid>
</Container>
		
			</form>
		</div>
	);
}


