import Navbar from "./components/Navbar";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Homepage from "./Homepage"
import Auth from "./Auth"
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Header isLoggedIn = {true}/>
      <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />} /> 
        <Route path="/home" element={<Homepage />} /> 
        <Route path="/Auth" element={<Auth />} /> 
        <Route path="/Register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
