import {Link} from 'react-router-dom';
export default function Menu() {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-glass">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="d-flex align-items-center">
                            <a className="text-inherit d-block d-xl-none me-4 border" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </a>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </nav>

            <div className="main-wrapper">
                <nav className="navbar-vertical-nav d-none d-xl-block">
                    <div className="navbar-vertical">
                        <div className="px-4 py-5">
                            {/* <a href="../index.html" className="navbar-brand">
                            <img src="theme/assets/images/logo/QuikBook-logo.svg" alt />
                        </a> */}
                            <h3 className="fw-bolder">Admin</h3>
                        </div>
                        <div className="navbar-vertical-content flex-grow-1 " data-simplebar>
                            <ul className="navbar-nav flex-column" id="sideNavbar">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-house" /></span>
                                            <span className="nav-link-text">Dashboard</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black fw-bold collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#navCategoriesOrders" aria-expanded="false" aria-controls="navCategoriesOrders">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-bag" /></span>
                                            <span className="nav-link-text ">Category</span>
                                        </div>
                                    </a>
                                    <div id="navCategoriesOrders" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/category/addcategory" className="nav-link text-black fw-semibold" >Add Category</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/category" className="nav-link text-black fw-semibold" >View Category</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black fw-bold collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#navCategoriesOrders1" aria-expanded="false" aria-controls="navCategoriesOrders1">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-bag" /></span>
                                            <span className="nav-link-text ">Products</span>
                                        </div>
                                    </a>
                                    <div id="navCategoriesOrders1" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/products/addproduct" className="nav-link text-black fw-semibold" >Add Product</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/products" className="nav-link text-black fw-semibold" >View Products</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </li>
                                <li className="nav-item">
                                    <Link to="/orders" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-house" /></span>
                                            <span className="nav-link-text">Orders</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-house" /></span>
                                            <span className="nav-link-text">Users</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/changepassword" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-house" /></span>
                                            <span className="nav-link-text">Change Password</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navbar-vertical-nav offcanvas offcanvas-start navbar-offcanvac" tabIndex={-1} id="offcanvasExample">
                    <div className="navbar-vertical">
                        <div className="px-4 py-5 d-flex justify-content-between align-items-center">
                            {/* <a href="../index.html" className="navbar-brand">
                            <img src="../assets/images/logo/QuikBook-logo.svg" alt />
                        </a> */}
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="navbar-vertical-content flex-grow-1" data-simplebar>
                            <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link text-black fw-bold " href="index.html">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-house" /></span>
                                            <span>Dashboard</span>
                                        </div>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link text-black fw-bold  collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#navOrders" aria-expanded="false" aria-controls="navOrders">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-bag" /></span>
                                            <span className="nav-link-text">Orders</span>
                                        </div>
                                    </a>
                                    <div id="navOrders" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link text-black fw-bold " href="order-list.html">List</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-black fw-bold " href="order-single.html">Single</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}