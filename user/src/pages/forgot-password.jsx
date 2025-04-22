import React from "react";
import { Link } from "react-router-dom";
import SiteTitle from "./sitetitle";
import WithHook from "./hoc";
import axios from "axios";
import { showError, showMessage, showNetworkError } from "./message";
import { ToastContainer } from "react-toastify";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  updateValue = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  forgotPassword = (e) => {
    e.preventDefault();

    let api = "http://localhost:5000/forgotpassword";

    let form = new FormData();
    form.append("email", this.state.email);

    axios({
      url: api,
      method: "post",
      responseType: "json",
      data: form,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        let error = response.data[0]["error"];
        let message = response.data[1]["message"];

        if (error === "yes") {
          showError(message);
        } else {
          showMessage(response.data[2]["message"]);
          setTimeout(() => {
            this.props.navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => showNetworkError(error));
  };

  render() {
    return (
      <>
        <SiteTitle title="Forgot Password" />
        <div className="border-bottom shadow-sm">
          <nav className="navbar navbar-light py-2">
            <div className="container justify-content-center justify-content-lg-between">
              <Link to="/" className="navbar-brand d-none d-lg-block">
                <img
                  src="../assets/images/favicon/favicon.ico"
                  className="img-fluid"
                  alt="Logo"
                  width="35"
                  height="35"
                />
                <span className="fw-bold text-black fs-4 ms-2 mt-1">QuikBook</span>
              </Link>
            </div>
          </nav>
        </div>

        <section className="my-lg-14 my-8">
          <div className="container">
            <ToastContainer />
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                <img
                  src="../assets/images/svg-graphics/fp-g.svg"
                  alt="Forgot Password"
                  className="img-fluid"
                />
              </div>

              <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                <div className="mb-lg-9 mb-5">
                  <h1 className="mb-2 h2 fw-bold">Forgot your password?</h1>
                  <p>Enter the email address associated with your account and we will email you a new password.</p>
                </div>

                <form onSubmit={this.forgotPassword}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                      value={this.state.email}
                      onChange={(e) => this.updateValue(e)}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Reset Password
                    </button>
                    <Link to="/login" className="btn btn-light">
                      Back to Login
                    </Link>
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

export default WithHook(ForgotPassword);
