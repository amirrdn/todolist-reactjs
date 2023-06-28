const Header = () => {
    return(<>
        <div data-cy="activity-empty-state" className="background-header col-sm-12">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                        <h1 className="d-lg-none header-title text-center">TO DO LIST APP</h1>
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