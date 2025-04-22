// layout.jsx
import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import WithHook from "./hoc";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            userId: props.cookies['userid'] // Track login status
        };
    }

    componentDidMount() {
        const api = "http://localhost:5000/category";
        if (this.state.category.length === 0) {
            axios.get(api)
                .then((response) => {
                    const e = response.data[0]['error'];
                    if (e === 'no') {
                        const total = response.data[1]['total'];
                        if (total === 0) {
                            alert("No category found. Please add category");
                        } else {
                            response.data.splice(0, 2);
                            this.setState({ category: response.data });
                        }
                    }
                })
                .catch((e) => {
                    alert(e);
                });
        }
    }

    componentDidUpdate(prevProps) {
        // Re-render if cookie changes (logout/login)
        if (prevProps.cookies['userid'] !== this.props.cookies['userid']) {
            this.setState({ userId: this.props.cookies['userid'] });
        }
    }

    Display = (i) => (
        <li key={i.id}>
            <a href={`/productcategory/${i.id}`} className="dropdown-item">
                {i.name}
            </a>
        </li>
    );

    footer = (item) => (
        <li key={item.id} className="nav-item">
            <a href={`/productcategory/${item.id}`} className="nav-link text-muted">
                {item.name}
            </a>
        </li>
    );

    userAcc = () => {
        if (!this.state.userId) {
            return (
                <div className="d-flex align-items-center d-none d-lg-flex">
                    <div className="dropdown">
                        <button className="btn text-black dropdown-toggle" type="button" id="accountDropdownLg" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-person fs-4"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdownLg">
                            <li><a className="dropdown-item" href="/register">Register</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-danger" href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="d-flex align-items-center ms-5 d-none d-lg-flex">
                    <Link to="/cart" className="text-decoration-none text-black position-relative">
                        <i className="bi bi-cart fs-4"></i>
                    </Link>
                    <div className="dropdown">
                        <button className="btn text-black dropdown-toggle" type="button" id="accountDropdownLg" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-person fs-4"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdownLg">
                            <li><a className="dropdown-item" href="/history">My Orders</a></li>
                            <li><a className="dropdown-item" href="/changepassword">Change Password</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-danger" href="/logout">Logout</a></li>
                        </ul>
                    </div>

                </div>
            );
        }
    }

    render() {
        return (
            <>
                {/* Header */}
                <header className="py-lg-2 py-4 border-bottom sticky-top bg-white shadow-sm">
                    <div className="container">
                        <div className="row w-100 align-items-center gx-3">
                            <div className="col-xl-7 col-lg-8">
                                <div className="d-flex align-items-center">
                                    <Link to="/" className="navbar-brand d-none d-lg-block">
                                        <img src="../assets/images/favicon/favicon.ico" className="img-fluid" alt="Logo" width="35" height="35" />
                                        <span className="fw-bold text-black fs-4 ms-2 mt-1">QuikBook</span>
                                    </Link>
                                </div>

                                {/* Small screen */}
                                <div className="d-flex justify-content-between align-items-center w-100 d-lg-none">
                                    <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
                                        <img src="/assets/images/favicon/favicon.ico" className="img-fluid" alt="Logo" width="35" height="35" />
                                        <span className="fw-bold text-black fs-4">QuikBook</span>
                                    </Link>
                                    <div className="d-flex align-items-center">
                                        <Link to="/cart" className="text-decoration-none text-black position-relative">
                                            <i className="bi bi-cart fs-4"></i>
                                        </Link>
                                        <div className="dropdown">
                                            <button className="btn text-black dropdown-toggle" type="button" id="accountDropdownSm" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="bi bi-person fs-4"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdownSm">
                                                <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><Link className="dropdown-item text-danger" to="/logout">Logout</Link></li>
                                            </ul>
                                        </div>
                                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar-default" aria-controls="navbar-default">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-text-indent-left text-primary" viewBox="0 0 16 16">
                                                <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navbar menu */}
                            <div className="col-xl-5 col-lg-4">
                                <nav className="navbar navbar-expand-lg navbar-light py-0 py-lg-2">
                                    <div className="container">
                                        <div className="offcanvas offcanvas-start" tabIndex={-1} id="navbar-default">
                                            <div className="offcanvas-header pb-1">
                                                <Link to="/"><img src="../assets/images/logo/QuikBook-logo.svg" alt="Logo" /></Link>
                                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                                            </div>
                                            <div className="offcanvas-body">
                                                <ul className="navbar-nav align-items-center">
                                                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                                                    <li className="nav-item dropdown">
                                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Category</a>
                                                        <ul className="dropdown-menu">{this.state.category.map(this.Display)}</ul>
                                                    </li>
                                                    <li className="nav-item "><Link to="/aboutus" className="nav-link">About Us</Link></li>
                                                    <li className="nav-item "><Link to="/contactus" className="nav-link">Contact Us</Link></li>
                                                </ul>
                                                {this.userAcc()}
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <main><Outlet /></main>

                <footer className="footer bg-light py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-2">
                                <h6 className="mb-3 fw-bold">Categories</h6>
                                <ul className="nav flex-column">{this.state.category.map(this.footer)}</ul>
                            </div>
                            <div className="col-12 col-md-6 col-lg-2">
                                <h6 className="mb-3 fw-bold">Quick Links</h6>
                                <ul className="nav flex-column">
                                    <li className="nav-item"><Link to="/" className="nav-link text-muted">Home</Link></li>
                                    <li className="nav-item"><Link to="/category" className="nav-link text-muted">Shop By Category</Link></li>
                                    <li className="nav-item"><Link to="/aboutus" className="nav-link text-muted">About Us</Link></li>
                                    <li className="nav-item"><Link to="/contactus" className="nav-link text-muted">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6 col-lg-2">
                                <h6 className="mb-3 fw-bold">Account</h6>
                                <ul className="nav flex-column">
                                    <li className="nav-item"><Link to="/cart" className="nav-link text-muted">Cart</Link></li>
                                    <li className="nav-item"><Link to="/login" className="nav-link text-muted">Login</Link></li>
                                    <li className="nav-item"><Link to="/register" className="nav-link text-muted">Register</Link></li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <h6 className="mb-3 fw-bold">Contact Us</h6>
                                <p className="text-muted mb-1"><i className="bi bi-telephone me-2"></i><a href="tel:+911234567890" className="text-muted text-decoration-none">+91 12345 67890</a></p>
                                <p className="text-muted mb-1"><i className="bi bi-envelope me-2"></i><a href="mailto:quikbook@gmail.com" className="text-muted text-decoration-none">quikbook@gmail.com</a></p>
                                <p className="text-muted"><i className="bi bi-geo-alt me-2"></i> Bhavnagar, India</p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <h6 className="mb-3 fw-bold">Follow Us</h6>
                                <div className="d-flex gap-3">
                                    <a href="#" className="text-muted fs-4"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="text-muted fs-4"><i className="bi bi-instagram"></i></a>
                                    <a href="#" className="text-muted fs-4"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="text-muted fs-4"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="border-top py-3 mt-4">
                            <div className="text-center text-md-center">
                                <span className="small text-muted">© 2025 QuikBook. All rights reserved.</span> <span>Developed By: <b>Hadi Nayani & Karan Mehta</b></span>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default WithHook(Layout);
