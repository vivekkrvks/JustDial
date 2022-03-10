import  React ,{useRef, useState,lazy,Suspense} from 'react';
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
    
    } from '@mui/material';
import { FcExpand,FcSearch,FcRefresh,FcSurvey,FcCloseUpMode,FcClock,FcWorkflow } from "react-icons/fc";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullScreenDialog from './Dialog/DialogTemp';
import InsideDialog from './Dialog/InsideDialog';
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
    let todayDate = new Date()
    let date = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    if(month<=9){
      month = "0"+month;
    }
    let year = todayDate.getFullYear();
    let formatDate = year + "-" + month + "-" + date;
    const [startDate, setStartDate] = React.useState(formatDate);
    const [endDate, setEndDate] = React.useState(formatDate);
 
console.log(formatDate)
    const classes = useStyles();
  return (
    <CommonDash compo = 
    {
        <>
             <Grid container spacing={2}>  

                <Grid item xs={12}>
            
                <Card className={classes.workArea}>
                  <div style={{display:"flex",justifyContent:"center"}}> 
                <Chip style={{marginBottom:"4px"}} color="primary" label="Get Vendor"  />    
                </div>

                <Accordion expanded={expandBasic}>
        <AccordionSummary
        onClick={()=>setExpand(!expandBasic)}
          expandIcon={<FcExpand />}
          aria-controls="basic-filter"
          id="basic-filter"
        >
  
          <span style={{flexGrow:0.5}}/>
          <FormControlLabel
        control={<Switch color="secondary" checked={showAdv} onChange={() => {setAdv(!showAdv);setExpand(true)}} />}
        label={showAdv?"Advance Filter":"Basic Filter"} labelPlacement="start"
      />
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={startDate} required="false" onChange={e=>(setStartDate(e.target.value),setEndDate(e.target.value))} inputProps={{ max:formatDate,min:"2022-01-11"}} InputLabelProps={{ shrink: true }}  label="Start Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={endDate} required="false" onChange={e=>(setEndDate(e.target.value))} inputProps={{ max:formatDate,min:startDate}} InputLabelProps={{ shrink: true }}  label="End Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
             renderInput={(params) => <TextField {...params} label="Status" />}
              />
        
             </Grid>
        
            {showAdv && <>
        
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="Supervisor" />}
/>
           </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="Employee" />}
/>
           </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="State" />}
/>
           </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="City" />}
/>
           </Grid>
       
            
            </>}
            <Grid item xs={12} style={{display:"flex",alignItems:"center"}}>
           <span style={{flexGrow:0.5}}/>
            <Button
        variant="outlined"
        color="primary"
        startIcon={<FcSearch />}
        // onClick={handleSearch}
      >
        Get Data
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

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }, ]

    const columns = [
      {field:"Detail",
        renderCell:(cellValues) => {
          return <FullScreenDialog insideData={ 
            <>
            <InsideDialog/>
          </>
          }/>
        }
    },
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
      { field: 'lastName1', headerName: 'Last name1', width: 130 },
      { field: 'lastName2', headerName: 'Last name2', width: 130 },
      { field: 'lastName3', headerName: 'Last name3', width: 130 },
      { field: 'lastName4', headerName: 'Last name4', width: 130 },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
    ];
    
    const rows = [
      { id: 1, lastName: 'Snow',lastName1: 'Snow',lastName2: 'Snow',lastName3: 'Snow',lastName4: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', lastName1: 'Lannister', lastName2: 'Lannister', lastName3: 'Lannister', lastName4: 'Lannister', firstName: 'Harvey', age: 65 },
    ];
