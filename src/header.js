const Header = () => {
    return(<>
            {/* <h1 className="header-title">Todo List App</h1> */}
            <div className="background-header col-sm-12">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav header-title">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">TO DO LIST APP</a>
                        </li>
                    
                    </ul>
                    </div>
                </div>
                </nav>

            </div>

            </div>
    </>)
}

export default Header;