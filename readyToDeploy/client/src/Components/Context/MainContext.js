import MainReducer from "./reducers";
import { RESET } from "./types";
import React, { createContext, useReducer, useEffect, useRef } from "react";

export const MainContext = createContext();

function useEffectOnce(cb) {
	// code to run the effect only one time when reload is done.
	const didRun = useRef(false);
	useEffect(() => {
		if (!didRun.current) {
			cb();
			didRun.current = true;
		}
	});
}
const initialState = {
	isAuthenticated: false,
	token: "",
	id: "",
	designation: "",
	name: "",
	snackbar: {
		message: "I am Default Message",
		variant: "success",
		open: false,
	},
	mobileDrawer: false,
};
export const MainProvider = (props) => {
	const [state, dispatch] = useReducer(MainReducer, initialState);
	useEffectOnce(() => {
		// Retriving data from localStorage
		const raw = localStorage.getItem("data");
		if (raw) {
			dispatch({ type: RESET, payload: JSON.parse(raw) });
		}
	});

	useEffect(() => {
		// to store data in localStorage
		if (state) {
			localStorage.setItem("data", JSON.stringify(state));
		}
	}, [state]);
	return <MainContext.Provider value={{ state, dispatch }}>{props.children}</MainContext.Provider>;
};
