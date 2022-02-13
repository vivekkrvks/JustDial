import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./../useStyles";
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
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
	  const theme = createTheme();

export default function AddCategory() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [highlight, setHighlight] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [allCat, setAllCat] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getData("");
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/test/category/allcategory/${word}`)
			.then((res) => setAllCat(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newCat = { _id: id, categoryTitle: title, highlight, image, link, description };
		await axios
			.post(`/api/test/category/${id}`, newCat)
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
		setLink("");
		setImage("");
		setHighlight("");
		setDescription("");
	};
	const setData = async (id) => {
		await axios
			.get(`/api/test/category/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].categoryTitle);
				setLink(res.data[0].link);
				setImage(res.data[0].image);
				setHighlight(res.data[0].highlight);
				setDescription(res.data[0].description);
			})
			.catch((err) => console.log(err));
	};
	const imgUpload = async (e) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
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
									<Chip color="primary" label="Add Category" />
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
									label={err.errIn === "title" ? err.msg : "Category Title"}
									placeholder="Name of the Category.."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
						
							<Grid item xs={6}>
								<TextField
								required
									variant="outlined"
									type="file"
									InputLabelProps={{ shrink: true }}
									inputProps={{ accept: "image/*" }}
									fullWidth
									onBlur={() => handleErr("image")}
									error={err.errIn === "image" ? true : false}
									label={err.errIn === "image" ? err.msg : "Logo "}
									onChange={(e) => imgUpload(e.target.files[0])}
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
									label={err.errIn === "image" ? err.msg : "Image "}
									onChange={(e) => imgUpload(e.target.files[0])}
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
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4}>
				{/* Search Section */}
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<MdSearch />
					</div>
					<Input
						placeholder="Search Category..."
						onChange={(e) => getData(e.target.value)}
						disableUnderline
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
					/>
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
								{allCat.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.categoryTitle} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allCat.length}
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
