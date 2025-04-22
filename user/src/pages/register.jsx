import React, { Component } from "react";
import { Link } from "react-router-dom";
import SiteTitle from "./sitetitle";
import WithHook from "./hoc";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { showError, showMessage, showNetworkError } from "./message";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            mobile: '',
            password: '',
        }
    }

    registerUser = (e) => {
        e.preventDefault();

        let api = "http://localhost:5000/register";

        let form = new FormData();

        form.append("name", this.state.name);
        form.append("email", this.state.email);
        form.append("mobileno", this.state.mobile);
        form.append("password", this.state.password);

        console.log(this.state.mobile);
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
                if (success === 'no')
                    showError(message);
                else {
                    showMessage(message);
                    setTimeout(() => {
                        this.props.navigate("/login");
                    }, 2000)
                }
            }
        }).catch((error) => showNetworkError(error))
    }
    updateValue = (event) => {
        // console.log(event.target.name + " " + event.target.value);
        this.setState({
            [event.target.id]: event.target.value
        });
        //  console.log(this.state);
    }
    render() {
        return (
            <>
                <SiteTitle title="Register" />
                <div className="border-bottom shadow-sm">
                    <nav className="navbar navbar-light py-2">
                        <div className="container justify-content-center justify-content-lg-between">
                            <Link to="/" className="navbar-brand d-none d-lg-block">
                                <img
                                    src="../assets/images/favicon/favicon.ico"
                                    className="img-fluid"
                                    alt="eCommerce HTML Template"
                                    width="35"
                                    height="35"
                                />
                                <span className="fw-bold text-black fs-4 ms-2 mt-1">QuikBook</span>
                            </Link>
                            <span className="navbar-text">
                                Already have an account?
                                <Link to="/login" href="signin.html">
                                    {" "}
                                    Sign in
                                </Link>
                            </span>
                        </div>
                    </nav>
                </div>
                <section className="my-lg-14 my-8">
                    {/* container */}
                    <div className="container">
                        <ToastContainer />
                        {/* row */}
                        <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                                {/* img */}
                                <img src="../assets/images/svg-graphics/signup-g.svg" alt="" className="img-fluid" />
                            </div>
                            {/* col */}
                            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                                <div className="mb-lg-9 mb-5">
                                    <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                                    <p>Welcome to QuikBook! Enter your details to get started.</p>
                                </div>
                                {/* form */}
                                <form className="needs-validation" onSubmit={this.registerUser}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            {/* input */}
                                            <label
                                                htmlFor="name"
                                                className="form-label visually-hidden"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                required
                                                value={this.state.name}
                                                onChange={(e) =>this.updateValue(e)}
                                            />
                                        </div>
                                        <div className="col-12">
                                            {/* input */}
                                            <label
                                                htmlFor="email"
                                                className="form-label visually-hidden"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={(e) =>this.updateValue(e)}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            {/* input */}
                                            <label htmlFor="mobile" className="form-label visually-hidden">
                                                Mobile
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="mobile"
                                                placeholder="Mobile"
                                                value={this.state.mobile}
                                                onChange={(e) =>this.updateValue(e)}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="password-field position-relative">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label visually-hidden"
                                                >
                                                    Password
                                                </label>
                                                <div className="password-field position-relative">
                                                    <input
                                                        type="password"
                                                        className="form-control fakePassword"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={this.state.password}
                                                        onChange={(e) =>this.updateValue(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* btn */}
                                        <div className="col-12 d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                Register
                                            </button>
                                        </div>
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

export default WithHook(Register);
