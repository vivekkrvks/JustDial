import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./../useStyles";
import MySnackbar from "../../Components/MySnackbar";
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
	InputAdornment,
	Autocomplete,
} from "@mui/material";

import axios from "axios";
import { MdSearch,MdRemoveRedEye,MdVisibilityOff, MdDoneAll, MdClearAll, MdPanorama, MdLock, MdPublic, MdDeleteForever } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export default function AddCategory() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [fullName, setFullName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
	const [showPass, setShowPass]= useState(false)

    const [allEmpl, setAllEmpl] = useState([]);
    const [designation, setDesignation]= useState("")
    const [showSupervisor, setShowSupervisor]= useState(false)
    
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
	}, []);
	const getData = async (word) => {
	
		await axios
			.get(`/api/v1/addition/category/allcategory/${word}`)
			.then((res) => (setAllEmpl(res.data)))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCat = { _id: id, name: fullName, mobileNumber: mobileNumber, emailId: emailId, password: password };
		await axios
			.post(`/api/v1/addition/category/${id}`, newCat)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClose()
				if(res.data.variant==="success"){
					handleClear();

				}
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		setFullName("");
	};

	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/category/get/${id}`)
			.then((res) => {
				setId(res.data._id);
		
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/category/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "categoryName":
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
									<Chip color="primary" label="Add Category" />
								</center>
							</Grid>
							<Grid item xs={4}></Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("fullName")}
									error={err.errIn === "categoryName" ? true : false}
									label={err.errIn === "fullName" ? err.msg : "full Name"}
									placeholder="Full Name.."
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "10" }}
									onBlur={() => handleErr("mobileNumber")}
									error={err.errIn === "mobileNumber" ? true : false}
									label={err.errIn === "mobileNumber" ? err.msg : "Mobile Number"}
									placeholder="Enter 10 Digit Number.."
									value={mobileNumber}
									onChange={(e) => setMobileNumber(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("emailId")}
									error={err.errIn === "emailId" ? true : false}
									label={err.errIn === "emailId" ? err.msg : "Email Id"}
									placeholder="Enter 10 Digit Number.."
									value={emailId}
									onChange={(e) => setEmailId(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									onBlur={() => handleErr("password")}
									error={err.errIn === "password" ? true : false}
									label={err.errIn === "password" ? err.msg : "password"}
									placeholder="password.."
									value={password}
									onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
										endAdornment: (
                      
											<InputAdornment position="end" onClick={() => setShowPass(!showPass)}>
												{showPass ? <MdRemoveRedEye /> : <MdVisibilityOff />}
											</InputAdornment>
										),maxLength: "42"
									}} 
                                />
							</Grid>						
						<Grid item xs={6}> 
						<Autocomplete
      					multiple
      					limitTags={2}
      					id="multiple-limit-tags"
     					 options={top100Films}
      					getOptionLabel={(option) => option.label}
     			 renderInput={(params) => (
       			 <TextField {...params} label="State" placeholder="click to select" />
     			 )} 
   				 />
						</Grid>
						<Grid item xs={6}> 
						<Autocomplete
     					 multiple
   						limitTags={2}
      					id="multiple-limit-tags"
     					 options={top100Films}
     					 getOptionLabel={(option) => option.label}
     				 renderInput={(params) => (
					 <TextField {...params} label="District" placeholder="click to select" />
     			 )} 
    				/>
					</Grid>
					 <Grid item  xs={6}>
        		    <Autocomplete
 					 disablePortal
 					 id="combo-box-demo"
 					 options={allDesignation}
 					 onChange={e=>{console.log(e);setDesignation(e.target.value)}}
  					value={designation}
					 renderInput={(params) => <TextField {...params} label="Designation" />}
					/>   
            		 </Grid>
       
 {  showSupervisor && <>  <Grid item xs={12} md={3}>
             
            <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={top100Films}
      getOptionLabel={(option) => option.label}
     
      renderInput={(params) => (
        <TextField {...params} label="Supervisor" placeholder="select SuperVisior" />
      )}
 
    />
      
             </Grid> </>}
						
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
              placeholder= {`Search Category...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Category"}  onChange={(e) => getData(e.target.value)} /> */}
				
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
								{allEmpl.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.categoryName} ; Description : {data.description} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allEmpl.length}
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

const allDesignation = [
    { label: 'Admin', id: "admin" },
    { label: 'Supervisor', id: "supervisor" },
    { label: 'Field Partner', id: "fieldPartner" }, ]
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }, ]

    const columns = [
     
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'fullName', headerName: 'Full Name', width: 130 },
      { field: 'mobileNumber', headerName: 'mobileNumber', width: 130 },
      { field: 'emailId', headerName: 'Email Id', width: 130 },
      { field: 'designation', headerName: 'Designation', width: 130 },
    ];
    
    const rows = [
      { id: 1, mobileNumber: 'Snow',emailId: 'Snow',designation: 'Snow',lastName3: 'Snow',lastName4: 'Snow', fullName: 'Jon', age: 35 },
      { id: 2, mobileNumber: 'Lannister', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Cersei', age: 42 },
      { id: 3, mobileNumber: 'Lannister', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Jaime', age: 45 },
      { id: 4, mobileNumber: 'Stark', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Arya', age: 16 },
      { id: 5, mobileNumber: 'Targaryen', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Daenerys', age: null },
      { id: 6, mobileNumber: 'Melisandre', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: null, age: 150 },
      { id: 7, mobileNumber: 'Clifford', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Ferrara', age: 44 },
      { id: 8, mobileNumber: 'Frances', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Rossini', age: 36 },
      { id: 9, mobileNumber: 'Roxie', emailId: 'Lannister', designation: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', fullName: 'Harvey', age: 65 },
    ];
