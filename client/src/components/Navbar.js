import React,{useState} from "react"
import "../styles/Navbar.css"

const Navbar = () => {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    const handleClick1 = () => {
        if(toggle2){
            setToggle2(!toggle2)
        }
        setToggle1(!toggle1)
    }
    const handleClick2 = () => {
        if(toggle1){
            setToggle1(!toggle1)
        }
        setToggle2(!toggle2)
    }

    return (
        <div className="container">
            <div className="navbar navbar-expand-sm">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item category-main">
                        <a className="nav-link dropdown-toggle mx-auto" onClick={handleClick1} href="/" role="button" data-bs-toggle="collapse" aria-expanded="false">
                        Symptom
                        </a>
                    </li>
                    <li className="nav-item category-main">
                        <a className="nav-link dropdown-toggle mx-auto" onClick={handleClick2} href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Behandlingar
                        </a>
                    </li>
                </ul>
            </div>
                {toggle1 && (
                <ul className="navbar-nav align-items-center">
                    <div className="navbar navbar-expand-sm">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Symptom 1</a></li>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Symptom 2</a></li>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Symptom 3</a></li>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Symptom 4</a></li>
                            </div>
                        </div>
                    </div>
                </ul>
                )}
                {toggle2 && (
                    <ul className="navbar-nav align-items-center">
                    <div className="navbar navbar-expand-sm">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Behandling 1</a></li>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Behandling 2</a></li>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Behandling 3</a></li>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <li className="category-second"><a className="category-second" href="/">Behandling 4</a></li>
                            </div>
                        </div>
                    </div>
                </ul>
                )}
        </div>
    );
};

export default Navbar;