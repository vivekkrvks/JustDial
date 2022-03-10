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
	Input,
	Divider,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama,MdImportantDevices } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import SearchBar from "../../../Components/Common/SearchBar";
  
	  const theme = createTheme();

export default function AddCourse() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState([]);
	const [allCategory, setAllCategory] = useState([]);
	const [link, setLink] = useState("");
	const [highlight, setHighlight] = useState("");
	const [image, setImage] = useState("");
	const [logo, setLogo] = useState("");
	const [description, setDescription] = useState("");
	const [allCourse, setAllCourse] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();

	useEffect(() => {
		getData("");
		getCategory();
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/test/course/allcourse/${word}`)
			.then((res) => {
				setAllCourse(res.data);
			})
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let courseData = { _id: id, courseTitle: title, logo, category, highlight, image, link, description };
		await axios
			.post(`/api/test/course/${id}`, courseData)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		setTitle("");
		setCategory([]);
		setLink("");
		setImage("");
		setLogo("");
		setHighlight("");
		setDescription("");
	};
	const getCategory = () => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	};
	const setData = async (id) => {
		await axios
			.get(`/api/test/course/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].courseTitle);
				setCategory(res.data[0].category);
				setLink(res.data[0].link);
				setImage(res.data[0].image);
				setLogo(res.data[0].logo);
				setHighlight(res.data[0].highlight);
				setDescription(res.data[0].description);
			})
			.catch((err) => console.log(err));
	};
	const imgUpload = async (e, name) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			if (name === "image") {
				await axios
					.post(`/api/other/fileupload/upload`, imgData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					})
					.then((res) => setImage(res.data.result.secure_url))
					.catch((err) => console.log(err));
			} else if (name === "logo") {
				await axios
					.post(`/api/other/fileupload/upload`, imgData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					})
					.then((res) => setLogo(res.data.result.secure_url))
					.catch((err) => console.log(err));
			}
		}
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "title":
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
							<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
								<Grid container spacing={2}>
									<Grid item xs={4}></Grid>
									<Grid item xs={4}>
										<center>
											<Chip color="primary" label="Add Sub Category" />
										</center>
									</Grid>
									<Grid item xs={4}></Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											inputProps={{ maxLength: "42" }}
											onBlur={() => handleErr("title")}
											error={err.errIn === "title" ? true : false}
											label={err.errIn === "title" ? err.msg : "Sub Category Title"}
											placeholder="Name of the Sub Category.."
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Autocomplete
											multiple
											options={allCategory}
											filterSelectedOptions
											getOptionLabel={(option) => option.categoryTitle}
											onChange={(e, v) => {
												setCategory(v);
											}}
											value={category}
											renderInput={(params) => <TextField {...params} variant="outlined" label="Select Category" />}
										/>
									</Grid>
							
									<Grid item xs={6}>
										<TextField
											variant="outlined"
											type="file"
											InputLabelProps={{ shrink: true }}
											inputProps={{ accept: "image/*" }}
											fullWidth
											onBlur={() => handleErr("image")}
											error={err.errIn === "image" ? true : false}
											label={err.errIn === "image" ? err.msg : "Sub Category Image"}
											onChange={(e) => imgUpload(e.target.files[0], "image")}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											variant="outlined"
											type="file"
											InputLabelProps={{ shrink: true }}
											inputProps={{ accept: "image/png" }}
											fullWidth
											onBlur={() => handleErr("logo")}
											error={err.errIn === "logo" ? true : false}
											label={err.errIn === "logo" ? err.msg : "Logo (PNG Only)"}
											onChange={(e) => imgUpload(e.target.files[0], "logo")}
										/>
									</Grid>
									<Grid item xs={12}>
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
											{image !== "" && (
												<a href={image} target="_blank" rel="noopener noreferrer">
													<Tooltip title="Image">
														<Fab size="small" color="secondary" className={classes.button}>
															<MdPanorama />
														</Fab>
													</Tooltip>
												</a>
											)}
											{logo !== "" && (
												<a href={logo} target="_blank" rel="noopener noreferrer">
													<Tooltip title="Logo">
														<Fab size="small" color="secondary" className={classes.button}>
															<MdImportantDevices />
														</Fab>
													</Tooltip>
												</a>
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
							<SearchBar />
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
										{allCourse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
											<TableRow key={data._id} onClick={() => setData(data._id)} hover>
												<TableCell component="td" scope="row">
													Name : {data.courseTitle} <br />
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TablePagination
												count={allCourse.length}
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
