const Header = () => {
    return(<>
        <div data-cy="activity-empty-state" className="background-header col-sm-12">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                        <h1 className="d-lg-none header-title text-center" data-cy="header-title">TO DO LIST APP</h1>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav header-title">
                        <li className="nav-item">
                        <h2 className="nav-link" data-cy="header-title" aria-current="page" href="#">TO DO LIST APP</h2>
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