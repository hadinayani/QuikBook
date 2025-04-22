import React from "react";
import { Outlet, Link } from "react-router";


function Layout() {
    return (


        <>

            <nav className="navbar navbar-expand-lg navbar-glass bg-light">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center w-100 ">
                        <div className="d-flex align-items-center">
                            <a className="text-inherit d-block d-xl-none me-4 border" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </a>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="dropdown">
                                <a className="text-inherit d-flex align-items-center" href="#" role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="bi bi-person-circle fa-2xl"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                    <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <div className="main-wrapper">
                <nav className="navbar-vertical-nav d-none d-xl-block">
                    <div className="navbar-vertical">
                        <div className="px-4 py-5 bg-light">
                            <Link to="/dashboard" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
                                <img src="/assets/images/favicon/favicon.ico" className="img-fluid" alt="QuikBook Logo" width="30" height="30" />
                                <span className="fw-bold text-primary fs-5">QuikBook</span>
                            </Link>
                        </div>

                        <div className="navbar-vertical-content flex-grow-1 " data-simplebar>
                            <ul className="navbar-nav flex-column" id="sideNavbar">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-speedometer2" /></span>
                                            <span className="nav-link-text">Dashboard</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black fw-bold collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#navCategoriesOrders" aria-expanded="false" aria-controls="navCategoriesOrders">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-grid" /></span>
                                            <span className="nav-link-text ">Category</span>
                                        </div>
                                    </a>
                                    <div id="navCategoriesOrders" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/category/add" className="nav-link text-black fw-semibold" >Add Category</Link>
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
                                            <span className="nav-link-icon"><i className="bi bi-box-seam" /></span>
                                            <span className="nav-link-text ">Products</span>
                                        </div>
                                    </a>
                                    <div id="navCategoriesOrders1" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/products/add" className="nav-link text-black fw-semibold" >Add Product</Link>
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
                                            <span className="nav-link-icon"><i className="bi bi-cart" /></span>
                                            <span className="nav-link-text">Orders</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-people" /></span>
                                            <span className="nav-link-text">Users</span>
                                        </div>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navbar-vertical-nav offcanvas offcanvas-start navbar-offcanvac" tabIndex={-1} id="offcanvasExample">
                    <div className="navbar-vertical">
                    <div className="px-4 py-5">
                            <Link to="/dashboard" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
                                <img src="/assets/images/favicon/favicon.ico" className="img-fluid" alt="QuikBook Logo" width="30" height="30" />
                                <span className="fw-bold text-primary fs-5">QuikBook</span>
                            </Link>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="navbar-vertical-content flex-grow-1" data-simplebar>
                            <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-speedometer2" /></span>
                                            <span className="nav-link-text">Dashboard</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-black fw-bold collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#navCategoriesOrders" aria-expanded="false" aria-controls="navCategoriesOrders">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-grid" /></span>
                                            <span className="nav-link-text ">Category</span>
                                        </div>
                                    </a>
                                    <div id="navCategoriesOrders" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/category/add" className="nav-link text-black fw-semibold" >Add Category</Link>
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
                                            <span className="nav-link-icon"><i className="bi bi-box-seam" /></span>
                                            <span className="nav-link-text ">Products</span>
                                        </div>
                                    </a>
                                    <div id="navCategoriesOrders1" className="collapse " data-bs-parent="#sideNavbar">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <Link to="/products/add" className="nav-link text-black fw-semibold" >Add Product</Link>
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
                                            <span className="nav-link-icon"><i className="bi bi-cart" /></span>
                                            <span className="nav-link-text">Orders</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link text-black fw-bold">
                                        <div className="d-flex align-items-center">
                                            <span className="nav-link-icon"><i className="bi bi-people" /></span>
                                            <span className="nav-link-text">Users</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet />
                
            </div>

            <footer>
            <div className="border-top fixed-bottom py-3 mt-4 bg-light">
                        <div className="row align-items-center">
                            <div className=" text-center text-md-center">
                                <span className="small text-muted">
                                    &copy; {new Date().getFullYear()} <Link to="/" className="text-muted text-decoration-none">QuikBook</Link>. All rights reserved.  Developed by <b>Hadi Nayani & Karan Mehta</b>
                                </span>
                            </div>
                        </div>
                    </div>
            </footer>
        </>
    );
}
export default Layout;