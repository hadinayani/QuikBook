import { useState } from "react";
import SiteTitle from "./siteTitle";
import axios from 'axios';
import { showError, showMessage, showNetworkError, FILE_NAME } from "./message";
import { ToastContainer } from "react-toastify";
import VerifyLogin from './verifylogin';

export default function ChangePassword() {

    VerifyLogin();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    

    const changePassword = (e) => {
        e.preventDefault();

        
        let api = "http://localhost:5000/change-password";

        let formData = {
            current_password: currentPassword,
            new_password: newPassword
        };

        axios({
            url: api,
            responseType: 'json',
            method: 'put',
            data: formData,
            headers: { 'Content-Type': 'application/json' }
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
                    setCurrentPassword('');
                    setNewPassword('');
                    
                }
            }
        }).catch((error) => showNetworkError(error));
    };

    return (
        <main className="main-content-wrapper">
            <SiteTitle title="Change Password" />
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
                        <div className="card mt-4">
                            <div className="card-header text-bg-light">
                                <h4 className="mb-0">Change Password</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={changePassword}>
                                    <div className="mb-3">
                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="currentPassword"
                                            placeholder="Enter current password"
                                            required
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            placeholder="Enter new password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                  
                                    <div className="text-end">
                                        <button type="submit" className="btn btn-primary me-2">Change Password</button>
                                        <button
                                            type="reset"
                                            className="btn btn-light"
                                            onClick={() => {
                                                setCurrentPassword('');
                                                setNewPassword('');
                                                
                                            }}
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
