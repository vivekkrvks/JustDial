import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Tooltip,
	Fab,
	Divider,
  Autocomplete,
  Link,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import AlertDialog from "./alertDialog";
import FindInPageIcon from '@mui/icons-material/FindInPage';

const theme = createTheme();

export default function AddVendor() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [link, setLink] = useState("");
	const [state, setState] = useState("");
	const [district, setDistrict] = useState("");
	const [city, setCity] = useState("");
	const [area, setArea] = useState("");
	const [pincode, setPincode] = useState("");
	const [landmark, setLandmark] = useState("");
	const [registrationNo, setRegistrationNo] = useState("");
	const [receiptNo, setReceiptNo] = useState("");
	const [contactPersonName, setContactPersonName] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [emailId, setEmailId] = useState("");
	const [website, setWebsite] = useState("");

	const [allCategory, setAllCategory] = useState([]);
	const [category, setCategory] = useState({
		categoryName:"",
link:""
	});
	const [allSubCategory, setAllSubCategory] = useState([]);
	const [subCategory, setSubCategory] = useState({
		subCategoryName:"",
link:""
	}); 
	const [allMyServices, setAllMyServices] = useState([]);
	const [myServices, setMyServices] = useState({
		serviceName:"",
link:""
	});

	const [yearEstablished, setYearEstablished] = useState("");
	const [modesofPayment, setModesofPayment] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getCategory();
	}, []);

	const getData = async (word) => {
		await axios
			.get(`/api/test/Vendor/allVendor/${word}`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newCat = { _id: id,  };
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
					.then((res) => {setAllSubCategory(res.data)})	
					.catch((err) => console.log(err));
			}
		};
		const getMyServices = (v) => {
			if (v) {
				axios
					.get(`/api/v1/other/primaryDdd/getServices/${v.link}`)
					.then((res) => {setAllMyServices(res.data);console.log(res.data);console.log({v})})	
					.catch((err) => console.log(err));
			}
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
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
				<Paper className={classes.entryArea}>
					<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
						<Grid container spacing={2}>
							
							<Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
						
							
							<span style={{flexGrow:1.1}}/>
								
									<Chip color="primary" label="Add Vendor"  />
									<span style={{flexGrow:1}}/>
									
									<IconButton color="primary" href="/GetVendor"  rel="noopener noreferrer">
									<FindInPageIcon />

  									</IconButton>
								
								<span style={{flexGrow:0.1}}/>
							


							</Grid>
						
            {/* data --- State	 */}
              <Grid item xs={12} md={6}> 
			  <Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										//getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											// setCategory(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={state}
										renderInput={(params) => <TextField {...params} variant="outlined" label="SEARCH State" />}
									/>               
      
              </Grid>
            {/* data --- District		 */}
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										//getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											// setCategory(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={district}
               							renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type District" label="SEARCH District" />}
              />
              </Grid>
            {/* data --- City		 */}
              					<Grid item xs={12} md={6}>                
       									 <Autocomplete
										options={allCategory}
										filterSelectedOptions
										//getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											// setCategory(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={city} 
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type City" label="SEARCH City" />}
              />
              </Grid>
            {/* data --- Area		 */}
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										//getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											// setCategory(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={area}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type Area" label="SEARCH Area" />}
              />
              </Grid>
              
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("pincode")}
									error={err.errIn === "pincode" ? true : false}
									label={err.errIn === "pincode" ? err.msg : "Pincode"}
									placeholder="Enter Pincode"
									value={pincode}
									onChange={(e) => setPincode(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("landmark")}
									error={err.errIn === "landmark" ? true : false}
									label={err.errIn === "landmark" ? err.msg : "Landmark"}
									placeholder="Enter Landmark..."
									value={landmark}
									onChange={(e) => setLandmark(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("registrationNo")}
									error={err.errIn === "registrationNo" ? true : false}
									label={err.errIn === "registrationNo" ? err.msg : "Registration No	"}
									placeholder="Enter Registration No..."
									value={registrationNo}
									onChange={(e) => setRegistrationNo(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("receiptNo")}
									error={err.errIn === "receiptNo" ? true : false}
									label={err.errIn === "receiptNo" ? err.msg : "Receipt no "}
									placeholder="Enter Receipt no..."
									value={receiptNo}
									onChange={(e) => setReceiptNo(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("contactPersonName")}
									error={err.errIn === "contactPersonName" ? true : false}
									label={err.errIn === "contactPersonName" ? err.msg : "Contact Person Name	"}
									placeholder="Enter Contact Person Name..."
									value={contactPersonName}
									onChange={(e) => setContactPersonName(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("contactNo")}
									error={err.errIn === "contactNo" ? true : false}
									label={err.errIn === "contactNo" ? err.msg : "Contact No "}
									placeholder="Enter Contact No..."
									value={contactNo}
									onChange={(e) => setContactNo(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("businessName")}
									error={err.errIn === "businessName" ? true : false}
									label={err.errIn === "businessName" ? err.msg : "Shop/Business Name "}
									placeholder="Enter Shop/Business Name..."
									value={businessName}
									onChange={(e) => setBusinessName(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("emailId")}
									error={err.errIn === "emailId" ? true : false}
									label={err.errIn === "emailId" ? err.msg : "Email Id"}
									placeholder="Enter Email Id..."
									value={emailId}
									onChange={(e) => setEmailId(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("website")}
									error={err.errIn === "website" ? true : false}
									label={err.errIn === "website" ? err.msg : "Website "}
									placeholder="Enter Website..."
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
									<Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											setCategory(v);
											getSubCategory(v);
											setSubCategory({
												subCategoryName:"",
link:""
											});
											setMyServices({
												serviceName:"",
link:""
											});
										}}
										value={category}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Category" />}
									/>
								</Grid>
							<Grid item xs={12} md={6}>
									<Autocomplete
										
										options={allSubCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.subCategoryName}
										onChange={(e, v) => {
											setSubCategory(v);
											getMyServices(v);
											setMyServices({
												serviceName:"",
link:""
											});
										}}
										value={subCategory}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select SubCategory" />}
									/>
								</Grid>
							<Grid item xs={12} md={6}>
									<Autocomplete
										
										options={allMyServices}
										filterSelectedOptions
										getOptionLabel={(option) => option.serviceName}
										onChange={(e, v) => {
											setMyServices(v);
											
										}}
										value={myServices}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Services" />}
									/>
								</Grid>
								{/* // drop down ends */}
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										//getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											// setCategory(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={yearEstablished}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type Year Established" label="SEARCH Year Established" />}
              />
              </Grid>
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										//getOptionLabel={(option) => option.categoryName}
										onChange={(e, v) => {
											// setCategory(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={modesofPayment}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type Mods of Payment" label="SEARCH Mods of Payment" />}
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
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			
			<Grid item xs={0} md={1}> </Grid>

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