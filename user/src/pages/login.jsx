import React from "react";
import { Link } from "react-router-dom";
import SiteTitle from "./sitetitle";
import WithHook from "./hoc";
import axios from 'axios';
import { showError, showMessage, showNetworkError } from "./message";
import { ToastContainer } from 'react-toastify';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    updateValue = (event) => {
        // console.log(event.target.name + " " + event.target.value);
        this.setState({
            [event.target.id]: event.target.value
        });
        //  console.log(this.state);
    }

    doLogin = (e) => {
        e.preventDefault();

        let api = "http://localhost:5000/userlogin";

        let form = new FormData();

        form.append("email", this.state.email);
        form.append("password", this.state.password);

        axios({
            url: api,
            method: 'post',
            responseType: 'json',
            data: form,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            let error = response.data[0]['error'];
            let success = response.data[1]['success'];
            let message = response.data[2]['message'];

            if (error === 'yes') {
                showError(error);
            }
            else {

                if (success === 'no') {
                    showError(message);
                }
                else {
                    let userid = response.data[3]['id'];
                    this.props.setCookie('userid', userid);
                    showMessage(message);

                    setTimeout(() => {
                        this.props.navigate("/");
                    }, 2000)
                }
            }
        }).catch((error) => showNetworkError(error));
    }

    render() {
        return (
            <>
                <SiteTitle title="Login" />
                <div className="border-bottom shadow-sm">
                    <nav className="navbar navbar-light py-2">
                        <div className="container justify-content-center justify-content-lg-between">
                            <Link to="/" className="navbar-brand d-none d-lg-block">
                                <img src="../assets/images/favicon/favicon.ico" className="img-fluid" alt="eCommerce HTML Template" width="35" height="35" />
                                <span className="fw-bold text-black fs-4 ms-2 mt-1">QuikBook</span>
                            </Link>
                        </div>
                    </nav>
                </div>
                <section className="my-lg-14 my-8">
                    <div className="container">
                        <ToastContainer />
                        {/* row */}
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                                {/* img */}
                                <img src="../assets/images/svg-graphics/signin-g.svg" alt="" className="img-fluid" />
                            </div>
                            {/* col */}
                            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                                <div className="mb-lg-9 mb-5">
                                    <h1 className="mb-1 h2 fw-bold">Sign in to QuikBook</h1>
                                    <p>Welcome back to QuikBook! Enter your details to get started.</p>
                                </div>
                                <form onSubmit={this.doLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter your email" required value={this.state.email} onChange={(e) => this.updateValue(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Enter your password"
                                            className="form-control"
                                            required
                                            value={this.state.password}
                                            onChange={(e) => this.updateValue(e)} />
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <Link to='/forgotpassword' className="text-decoration-none">Forgot Password?</Link>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                    <div className="mt-3">
                                        Don’t have an account? <Link to='/register' className="text-decoration-none">Sign Up</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default WithHook(Login);
