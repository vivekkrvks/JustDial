import React from "react";
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,
		Checkbox,Link,Grid,Box,Typography,Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
	
import Copyright from "./../General/copyright"
	
	const theme = createTheme();
	
	export default function SignUp() {
	  const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
		  email: data.get('email'),
		  password: data.get('password'),
		});
	  };
	
	  return (
		<ThemeProvider theme={theme}>
		  <Container component="main" maxWidth="xs">
			<CssBaseline />
			{/* <Box
			  sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			  }}
			>
			  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			  </Avatar>
			  <Typography component="h1" variant="h5">
				Sign up
			  </Typography>
			  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
				  <Grid item xs={12} sm={12}>
					<TextField
					  autoComplete="given-name"
					  name="Name"
					  required
					  fullWidth
					  id="Name"
					  label="Name"
					  autoFocus
					/>
				  </Grid>
				
				  <Grid item xs={12}>
					<TextField
					  required
					  fullWidth
					  id="email"
					  label="Email Address"
					  name="email"
					  autoComplete="email"
					/>
				  </Grid>
				  <Grid item xs={12} sm={12}>
					<TextField
					  required
					  fullWidth
					  id="mobileNo"
					  label="Mobile Number"
					  name="mobileNo"
					  autoComplete="family-name"
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
					  required
					  fullWidth
					  name="password"
					  label="Password"
					  type="password"
					  id="password"
					  autoComplete="new-password"
					/>
				  </Grid>
				  <Grid item xs={12}>
					<FormControlLabel
					  control={<Checkbox value="allowExtraEmails" color="primary" />}
					  label="I want to receive updates via email."
					/>
				  </Grid>
				</Grid>
				<Button
				  type="submit"
				  fullWidth
				  variant="contained"
				  sx={{ mt: 3, mb: 2 }}
				>
				  Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
				  <Grid item>
					<Link href="/login" variant="body2">
					  Already have an account? Sign in
					</Link>
				  </Grid>
				</Grid>
			  </Box>
			</Box>
			<Copyright sx={{ mt: 5 }} /> */}
		  </Container>
		</ThemeProvider>
	  );
	}


