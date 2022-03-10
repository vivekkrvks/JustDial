import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MainProvider } from "./Components/Context/MainContext";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./Components/Routes/MainRoute";


ReactDOM.render(
		<BrowserRouter>
		<MainProvider>
			<MainRoute />
		</MainProvider>
		</BrowserRouter>
		,
	document.getElementById("root"),
);



