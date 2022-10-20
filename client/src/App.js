import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./Homepage"
import Auth from "./Auth"
import Register from "./Register";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Homepage />} /> 
        <Route path="/Auth" element={<Auth />} /> 
        <Route path="/Register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
