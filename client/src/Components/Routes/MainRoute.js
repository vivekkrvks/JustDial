import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import App from "../../App";
// import { MainContext } from "../Context/MainContext";
// import Dashboard from "../../Protected/Dashboard";
// import Users from "../../Protected/Users";


// import Backdrop from "../Backdrop";


// const PrivateRoute = ({ component: Component, auth, ...rest }) => {
// 	const { state } = useContext(MainContext);
// 	let isAuthenticated = state.isAuthenticated && (state.designation === "Admin" || state.designation === "User" ||  state.designation === "Supervisor") ? true : false;
// 	return <Route {...rest} render={(props) => (isAuthenticated === true ? <Component {...props} /> : <Redirect to={{pathname:"/",state:{from:props.location}}} />)} />;
// };

export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
    	</Routes>
	);
}


