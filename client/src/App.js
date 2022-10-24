import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header isLoggedIn = {true}/>
      <Navbar />
    </div>
  );
}

export default App;
