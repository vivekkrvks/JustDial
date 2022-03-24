import React, { Fragment, useState, useEffect, useRef } from "react";

import {
	Grid,

	Button,
} from "@mui/material";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

const theme = createTheme();

export default function ImagePreviewDelete(props) {
	const snackRef = useRef();
	const handleUpdate = async (data) => {
		let myId = props.dataId
		console.log({myId})
		if(props.dataId !== undefined && props.dataId !== ""){
	
		let newCat = data
		await axios
			.post(`/api/v1/addition/category/${props.dataId}`, newCat)			
			.catch((err) => console.log(err));
		}
	};
	const deleteImage = async (id) => {
		console.log(id)
		await axios
		.post(`/api/v1/other/fileupload/delete`, {id})
		.then((res) => {
			if(res.data.variant==="success"){
				console.log("res.data.message")
				if(props.type == "Image"){
					props.clearImage();
					handleUpdate({"imageUrl":"","imageId":""})
				}
				if(props.type == "Logo"){
					handleUpdate({"logoUrl":"","logoId":""})
				 props.clearLogo();
				}
				
			}
			// snackRef.current.handleSnack(res.data);		

		})
		.catch((err) => console.log(err));
};
	return (
		<>
	<Grid container spacing={0.25}>
			<Grid item xs={7}>
				<Button 
				href={props.imageLink} target="_blank"
				variant="contained" 
				color="success" 
				endIcon={<SendIcon />}>
 				{props.type}
				</Button>
			</Grid>
			<Grid item xs={5} >
				<Button 
				variant="outlined" 
				onClick={()=>deleteImage(props.imageId)}
				startIcon={<DeleteIcon/>}>
				Delete
				</Button>
			</Grid>
	</Grid>
		</>
		
	
	);
}
























