import "../styles/Header.css"

function Header() {
    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <a className="navbar-brand" href="">ProMeno</a>
            <button className="navbar-toggler d-flex d-sm-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <img className="navbar-toggle-profile-icon" src="/images/person.svg" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profil</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Logga ut</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;