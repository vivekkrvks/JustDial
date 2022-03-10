import  React ,{useRef,useEffect, useState,lazy,Suspense} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CommonDash from './../../Protected/MyDashboard/CommonDash';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Autocomplete, TextField, Card,
     Accordion, AccordionSummary,
     Typography, FormControlLabel,
     Switch, AccordionDetails,

        Button, Dialog, DialogTitle, 
        DialogContent, DialogContentText,
         DialogActions,
         Chip,
         Link,
         FormControl,
         InputLabel,
         Input,
         InputAdornment,
    
    } from '@mui/material';
import { FcExpand,FcSearch,FcRefresh,FcSurvey,FcCloseUpMode,FcClock,FcWorkflow } from "react-icons/fc";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { MdRemoveRedEye, MdVisibilityOff } from "react-icons/md";

const useStyles = styled((theme) => ({
	dashbody: {
		height: "100vh",
        display: 'flex',
	},
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
    content:{
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    workArea:{
        padding:theme.spacing(2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));


export default function DataTable() {
    const [secondryReqNumber, setServiceNo]=useState("");
    const [callerNumber,setCallerNo] =useState("");
    const [expandBasic,setExpand]=useState(true);
    const [showAdv,setAdv]=useState(false);
    const [showPass, setShowPass]= useState(false)
    const [designation, setDesignation]= useState("")
    const [showSupervisor, setShowSupervisor]= useState(false)

 

 
    useEffect(() => {
      console.log("designation")
      console.log(designation)
      if(designation==="Field Partner"){
        setShowSupervisor(true)
      }else setShowSupervisor(false)
    }, [designation])

    const classes = useStyles();
  return (
    <CommonDash compo = 
    {
        <>
             <Grid container spacing={2}>  

                <Grid item xs={12}>
            
                <Card className={classes.workArea}>
                  <div style={{display:"flex",justifyContent:"center"}}> 
                <Chip style={{marginBottom:"4px"}} color="primary" label="Add Employee"  />    
                </div>

                <Accordion expanded={expandBasic}>
        <AccordionSummary
        onClick={()=>setExpand(!expandBasic)}
          expandIcon={<FcExpand />}
          aria-controls="basic-filter"
          id="basic-filter"
        >
          <Typography className={classes.heading}>Employee Amendments </Typography>
  
          <span style={{flexGrow:0.5}}/>
    
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
            <TextField
          required
          id="outlined-basic"
          label="Full Name"
          variant="standard"
        />
         </FormControl>
             </Grid>

            <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
            <TextField 
            id="outlined-basic" 
            label="Mobile Number"
             required placeholder="Enter 10 Digit Number"
              type="number" 
              fullWidth 
              // value={mobileNo} 
              // onChange={(e) => setMobile(e.target.value)}
               />
         </FormControl>
             </Grid>

            <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
            <TextField 
            id="outlined-basic" 
            label="Email Id" 
            required placeholder="Email Id" 
            type="email" 
            fullWidth 
            // value={emailId} 
            // onChange={(e) => setEmail(e.target.value)} 
            />   
         </FormControl>
             </Grid>  
  

            <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
            <TextField  
            label="Password" 
            required 
            placeholder="Enter Password" 	
            type={showPass ? "text" : "password"} 
            fullWidth 
            // value={password} 
            // onChange={(e) => setPass(e.target.value)} 
            InputProps={{
										endAdornment: (
                      
											<InputAdornment position="end" onClick={() => setShowPass(!showPass)}>
												{showPass ? <MdRemoveRedEye /> : <MdVisibilityOff />}
											</InputAdornment>
										),
									}} 
                  /> 
         </FormControl>
             </Grid>        

             <Grid item xs={12} md={3}>               
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
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
         </FormControl>
             </Grid>

             <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
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
         </FormControl>
             </Grid>
             <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={allDesignation}
  onChange={e=>{console.log(e
    
    );setDesignation(e.target.value)}}
  value={designation}
  renderInput={(params) => <TextField {...params} label="Designation" />}
/>
         </FormControl>
             </Grid>
       
 {  showSupervisor && <>  <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
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
         </FormControl>
             </Grid> </>}
            <Grid item xs={12} style={{display:"flex",alignItems:"center"}}>
           <span style={{flexGrow:0.5}}/>
            <Button
        variant="outlined"
        color="primary"
        startIcon={<FcSearch />}
        // onClick={handleSearch}
      >
        Save Data
      </Button>
      <span style={{flexGrow:0.05}}/>
      {/* <Button
        endIcon={<FcRefresh />}
        // onClick={handleClear}
      >
        Reset
      </Button> */}
            </Grid>
        </Grid>
        </AccordionDetails>
      </Accordion>
        </Card>
          
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.workArea}>
                    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
                    
                    </Card></Grid>
                </Grid>
                
    </>
    } />
    
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
