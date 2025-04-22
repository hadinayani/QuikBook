import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { showError, showMessage, showNetworkError } from './message';
import WithHook from './hoc';

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            cPassword: '',
            nPassword: '',

        };
    }

    updateValue = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    ChangePassword = (e) => {
        e.preventDefault();
        const api = "http://localhost:5000/changepassword";

        const form = new FormData();
        form.append("email", this.state.email);
        form.append("old_password", this.state.cPassword);
        form.append("new_password", this.state.nPassword);

        axios({
            url: api,
            method: 'put',
            data: form,
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        }).then((response) => {
            let error = response.data[0]['error'];
            let success = response.data[1]['success'];
            let message = response.data[2]['message'];

            if (error === 'yes') {
                showError(message);
            } else {
                if (success === 'no') {
                    showError(message);
                } else {
                    showMessage(message);
                    setTimeout(() =>{
                        this.props.navigate('/');
                    })
                    this.setState({ email: '', cPassword: '', nPassword: '' });
                }
            }
        }).catch((error) => {
            showNetworkError(error);
        });
    }

    render() {
        if ((this.props.cookies['userid']) !== undefined) {
            return (
                <div className="container d-flex justify-content-center align-items-center mt-5">
                    <ToastContainer />
                    <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "450px" }}>
                        <h4 className="text-center mb-4">Change Password</h4>
                        <form onSubmit={this.ChangePassword}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.updateValue}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Current Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter current password"
                                    id="cPassword"
                                    value={this.state.cPassword}
                                    onChange={this.updateValue}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    id="nPassword"
                                    value={this.state.nPassword}
                                    onChange={this.updateValue}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Change Password</button>
                        </form>
                    </div>
                </div>
            );
        }
        else {
            showMessage("plz Login");
            setTimeout(() => {
                this.props.navigate('/');
            })
        }
    }
}

export default WithHook(ChangePassword);
