import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./routing/Router";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
