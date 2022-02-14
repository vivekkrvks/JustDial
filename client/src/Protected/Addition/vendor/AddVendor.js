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
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import AlertDialog from "./alertDialog";

const theme = createTheme();

export default function AddVendor() {
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
			.get(`/api/test/Vendor/allVendor/${word}`)
			.then((res) => setAllCat(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newCat = { _id: id, VendorTitle: title, highlight, image, link, description };
		await axios
			.post(`/api/test/Vendor/${id}`, newCat)
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
			.get(`/api/test/Vendor/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].VendorTitle);
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
									<Chip color="primary" label="Add Vendor" />
								</center>
							</Grid>
							<Grid item xs={4}></Grid>
            {/* data --- State	 */}
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type State" label="SEARCH State" />}
              />
              </Grid>
            {/* data --- District		 */}
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type District" label="SEARCH District" />}
              />
              </Grid>
            {/* data --- City		 */}
              <Grid item xs={12} md={6}>                
              <Autocomplete
              			required
              options={testData}
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type City" label="SEARCH City" />}
              />
              </Grid>
            {/* data --- Area		 */}
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type Area" label="SEARCH Area" />}
              />
              </Grid>
              
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Pincode"}
									placeholder="Enter Pincode"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Landmark"}
									placeholder="Enter Landmark..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Registration No	"}
									placeholder="Enter Registration No..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Receipt no "}
									placeholder="Enter Receipt no..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Contact Person Name	"}
									placeholder="Enter Contact Person Name..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Contact No "}
									placeholder="Enter Contact No..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Shop/Business Name "}
									placeholder="Enter Shop/Business Name..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Email Id"}
									placeholder="Enter Email Id..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("title")}
									error={err.errIn === "title" ? true : false}
									label={err.errIn === "title" ? err.msg : "Website "}
									placeholder="Enter Website..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type Category" label="SEARCH Category" />}
              />
              </Grid>
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type Subcategory" label="SEARCH Subcategory" />}
              />
              </Grid>
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type Services" label="SEARCH Services" />}
              />
              </Grid>
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type Year Established" label="SEARCH Year Established" />}
              />
              </Grid>
              <Grid item xs={12} md={6}>                
              <Autocomplete
              options={testData}
              required
              // onChange={(e, v) => SRDispatch({ type: SETSCHEME, payload:v })}
              // getOptionLabel={(option) => option}
             // value={SRState.schemeName} 
               renderInput={(params) => <TextField {...params} placeholder="Type Mods of Payment" label="SEARCH Mods of Payment" />}
              />
              </Grid>
         
						
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<center>
									<Tooltip title={id === "" ? "Save" : "Update"}>
                  <AlertDialog />
						
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
						placeholder="Search Vendor..."
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
											Name : {data.VendorTitle} <br />
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

const testData = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];