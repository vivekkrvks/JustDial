import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Tooltip,
	Fab,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Divider,
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

import axios from "axios";
import {  MdDoneAll, MdClearAll,  MdDeleteForever } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export default function AddService() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [allCategory, setAllCategory] = useState([]);
	const [category, setCategory] = useState({
		categoryName:""
	});
	const [allSubCategory, setAllSubCategory] = useState([]);
	const [subCategory, setSubCategory] = useState({
		subCategoryName:""
	});

	const [serviceName, setServiceName] = useState("");
	const [link, setLink] = useState("");

	const [description, setDescription] = useState("");
	const [allSubCat, setAllSubCat] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	useEffect(() => {
		getData("");
		getCategory();
	}, []);
	const getData = async (word) => {
	
		await axios
			.get(`/api/v1/addition/myServices/allservice/${word}`)
			.then((res) => (setAllSubCat(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let myData = { _id: id, serviceName,link,category,subCategory, description };
	console.log(myData);
		await axios
			.post(`/api/v1/addition/myServices/${id}`, myData)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClose()
				if(res.data.variant==="success"){
					console.log("success");
					handleClear();

				}
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		setServiceName("");
		setLink("");	
		setCategory({
			categoryName:""
		});
		setSubCategory({
			subCategoryName:""
		});
		setDescription("");
	};
	const getCategory = () => {
		axios
			.get(`/api/v1/other/primaryDdd/get/namelink`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	
		};
		const getSubCategory = (v) => {
			if (v) {
				axios
					.get(`/api/v1/other/primaryDdd/get/${v.link}`)
					.then((res) => {setAllSubCategory(res.data);console.log(res.data);console.log({v})})	
					.catch((err) => console.log(err));
			}
		};


	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/myServices/get/${id}`)
			.then((res) => {
				setId(res.data._id);
				setServiceName(res.data.serviceName);
				setLink(res.data.link);		
				setCategory(res.data.category);
				setSubCategory(res.data.subCategory);
				setDescription(res.data.description);
				
			console.log(res.data)
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/myServices/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "serviceName":
				// if(title.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
	return (
		<>
		<CommonDash compo = {
			<Fragment>
		<Grid container>
			<Grid item xs={12} md={8}>
	
				<Paper className={classes.entryArea}>
					
				<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
					<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
						<Grid container spacing={2}>
							
							<Grid item xs={4}></Grid>
							<Grid item xs={4}>
								<center>
									<Chip color="primary" label="Add Service" />
								</center>
							</Grid>
							<Grid item xs={4}></Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("serviceName")}
									error={err.errIn === "serviceName" ? true : false}
									label={err.errIn === "serviceName" ? err.msg : "Service Name"}
									placeholder="Name of the Service.."
									value={serviceName}
									onChange={(e) => setServiceName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}
							>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("linkName")}
									error={err.errIn === "linkName" ? true : false}
									label={err.errIn === "Link" ? err.msg : "Service link"}
									placeholder="Link of the Service.."
									value={link}
									onChange={(e) => setLink(e.target.value)}
								/>
							</Grid>
						
							
							<Grid item xs={6}>
									<Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											setCategory(v);
											getSubCategory(v);
											setSubCategory({
												subCategoryName:""
											});
										}}
										value={category}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Category" />}
									/>
								</Grid>
							<Grid item xs={6}>
									<Autocomplete
										
										options={allSubCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.subCategoryName}
										onChange={(e, v) => {
											setSubCategory(v);
											
										}}
										value={subCategory}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select SubCategory" />}
									/>
								</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									fullWidth
									onBlur={() => handleErr("description")}
									error={err.errIn === "description" ? true : false}
									label={err.errIn === "description" ? err.msg : "Description "}
									placeholder="few words..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Grid>
						
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<center>
									<Tooltip title={id === "" ? "Save" : "Update"}>
										<Fab color="primary" type="submit" className={classes.button}>
											<MdDoneAll />
										</Fab>
									</Tooltip>
									<Tooltip title="Clear All">
										<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
											<MdClearAll />
										</Fab>
									</Tooltip>
									{id !== "" && (
											<Tooltip title="Delete Forever">
												<Fab size="small" color="secondary" onClick={() => handleDelete(id)} className={classes.button}>
													<MdDeleteForever />
												</Fab>
											</Tooltip>
										)}
						
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4}>
				{/* Search Section */}
				<div className={classes.search}>
				<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder= {`Search Service...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Service"}  onChange={(e) => getData(e.target.value)} /> */}
				
				</div>
				<div className={classes.searchResult}>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell component="th" scope="row">
										Search Results
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allSubCat.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.serviceName} ; Description : {data.description} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allSubCat.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={(e, page) => setPage(page)}
										onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</Paper>
				</div>
			</Grid>
		</Grid>
		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		</>
		
	
	);
}
