import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import AddCategory from "../../Protected/Addition/Category/AddCategory"
import AddSubCategory from "../../Protected/Addition/SubCategory/AddSubCategory"
import AddVendor from "../../Protected/Addition/Vendor/AddVendor"

import Dashboard from "../../Protected/MyDashboard/Dashboard";
import App from "../../App";

export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/Dashboard" element={<Dashboard />} />
        <Route  path="/AddCategory" element={<AddCategory />} />
        <Route  path="/AddSubCategory" element={<AddSubCategory />} />
        <Route  path="/AddVendor" element={<AddVendor />} />
    	</Routes>
	);
}


