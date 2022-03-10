import './App.css';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
 <div className="App">
      <header className="App-header">

       <Link to="/firstpage" >
       First Page
						</Link>
       <Link to="/AddProfile" >
       Add Profile
						</Link>
       <Link to="/AddRegistration" >
       Add Registration
						</Link>
       <Link to="/Dashboard" >
       Dashboard
						</Link>
      </header>
    </div>
</ThemeProvider>
   
  );
}

export default App;
