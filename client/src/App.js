import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
       <Link to="/signup" >
							Sign Up
						</Link>
            <br/>
       <Link to="/login" >
							Login
						</Link>
      </header>
    </div>
  );
}

export default App;
