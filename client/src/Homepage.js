import React from "react";
import { Link } from "react-router-dom"


function Homepage() {
    return (
        <div>
            <h1>Välkomna</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a enim venenatis, tincidunt enim ut, commodo orci. 
                Pellentesque purus purus, pulvinar sed vestibulum quis, facilisis non sapien. Cras eget sem eget felis efficitur dictum. 
                Duis ac leo turpis. Sed lectus sem, efficitur nec sem non, interdum consectetur nisi. Cras posuere justo ut consequat mattis.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla dignissim convallis nisi sed fringilla. 
                Mauris efficitur eros volutpat libero feugiat porta. Donec leo eros, consequat in felis a, venenatis tincidunt purus. Fusce leo mi, tincidunt ut euismod quis, elementum ut ex.
            </p>
            <Link to="/register">
                <button type="button" class="btn btn-secondary">Registera här</button>
            </Link>
            <Link to="/auth">
                <button type="button" class="btn btn-primary">Logga in</button>
            </Link>
        </div>
    
    );
  }
  
  export default Homepage;
  