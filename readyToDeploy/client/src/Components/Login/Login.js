import * as React from 'react';
import { useEffect, useState,useContext, useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "./../General/copyright"
import { MdRemoveRedEye, MdVisibilityOff } from "react-icons/md";
import { InputAdornment } from '@mui/material';
import axios from "axios";
import { MainContext } from "../../Components/Context/MainContext";
import { LOGIN_USER } from "../../Components/Context/types";
import {  Navigate } from "react-router-dom";

const theme = createTheme();

export default function SignInSide() {
	const [loginId, setLoginId] = useState("");
	const [loginPass, setLoginPass] = useState("");
	const [showPass, setShowPass] = useState(false);

	const snackRef = useRef();
	const { state, dispatch } = useContext(MainContext);

	const handleSubmit = async (e) => {
    console.log(loginId,loginPass)
		e.preventDefault();
			// Login With Password
		axios
			.post("/api/v1/auth/user/loginWithPassword", { loginId:loginId, password : loginPass })
			.then((res) => {
        console.log(res.data)
				if (res.data.success) {
					dispatch({ type : LOGIN_USER, payload : res.data});
				} else {
          alert(res.data.message)
					snackRef.current.handleSnack(res.data);
				}
			})
			.catch((err) => console.log(err));
   
	};
	if (state.isAuthenticated) {
		switch (state.designation) {
			case "Admin":
				return <Navigate to="/dashboard" />;
			case "Admin":
				return <Navigate to="/admin/dashboard" />;
			case "Manager":
				return <Navigate to="/admin/dashboard" />;

			default:
				return <Navigate to="/login" />;
		}
	}
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} spacing={2}>
              <Grid container spacing={2}  direction="column" >
                <Grid item xs={12}>
            <TextField
								variant="outlined"
								required
								type="text"
								fullWidth
								autoFocus								
								label="Enter Mobile No. / Email Id" 
								placeholder="Mobile No. or Email Id"
								value={loginId}
								onChange={(e) => setLoginId(e.target.value)}
							/></Grid>
              <Grid item xs={12}>

            	<TextField
								variant="outlined"
								required
								fullWidth
								InputProps={ {
									endAdornment: (
										<InputAdornment position="end" onClick={() => setShowPass(!showPass)}>
											{showPass ? <MdRemoveRedEye /> : <MdVisibilityOff />}
										</InputAdornment>
									),
								} }
								label="Enter Password"
                type={showPass ? "text" : "password"}
								value={loginPass}
								onChange={(e) => setLoginPass(e.target.value)}
							/>
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /></Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}