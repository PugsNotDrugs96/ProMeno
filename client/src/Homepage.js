import React from "react";
import { Link } from "react-router-dom"


function Homepage() {
    return (
        <div className="div_Homepage">
            <h1 className="greeting">Välkomna</h1>
            <p className="text_homeP">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a enim venenatis, tincidunt enim ut, commodo orci. 
                Pellentesque purus purus, pulvinar sed vestibulum quis, facilisis non sapien. Cras eget sem eget felis efficitur dictum. 
                Duis ac leo turpis. Sed lectus sem, efficitur nec sem non, interdum consectetur nisi. Cras posuere justo ut consequat mattis.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla dignissim convallis nisi sed fringilla. 
                Mauris efficitur eros volutpat libero feugiat porta. Donec leo eros, consequat in felis a, venenatis tincidunt purus. Fusce leo mi, tincidunt ut euismod quis, elementum ut ex.
            </p>
            <Link to="/register" className="login_btn">
                <button type="button" class="btn btn-secondary">Registera </button>
            </Link>
            <Link to="/auth" className="singup_btn">
                <button type="button" class="btn btn-primary">Logga in</button>
            </Link>
        </div>
    
    );
}

export default Homepage;
