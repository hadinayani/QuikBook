import { Link, useNavigate } from "react-router";
import SiteTitle from "./siteTitle";
import { useState,useEffect } from "react";
import axios from 'axios';
import { showError, showMessage, showNetworkError, FILE_NAME } from "./message";
import { ToastContainer } from "react-toastify";
import {useCookies} from 'react-cookie';

export default function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(FILE_NAME);
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');

    let navigate = useNavigate();

    let verifyLogin = function(e){
        e.preventDefault();
        console.log(email,password);
        let formData = new FormData();

        formData.append('email',email);
        formData.append('password',password);

        let api = "http://localhost:5000/adminlogin";

        axios({
            url:api,
            responseType:'json',
            method:'post',
            data:formData,
            headers : {'Content-Type' : 'application/json'}
        }).then((response) => {
            let error = response.data[0]['error'];
            let success = response.data[1]['success'];
            let message = response.data[2]['message'];

            if(error === 'yes'){
                showError(error);
            }else
            {
                if(success === 'no'){
                    showError(message);
                }
                else{
                    showMessage(message);
                    let id = response.data[3]['id'];
                    console.log(id);
                    setCookie('id',id)
                    setTimeout(() => {
                        navigate('/dashboard');
                    },2000)
                }
            }
        }).catch((error) => showNetworkError(error))
    }
    return (<main className="main h-100 w-100">
        <SiteTitle title="Login Admin" />
        <div className="container h-100">
            <ToastContainer />
            <div className="row h-100">
                <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                    <div className="d-table-cell align-middle">
                        <div className="text-center mt-4">
                            <h1 className="h2">Welcome Administrator</h1>
                            <p className="lead">
                                Sign in to your account to continue
                            </p>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="m-sm-4">
                                    <form onSubmit={verifyLogin}>
                                        <div className="mb-3">
                                            <label>Email</label>
                                            <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                        </div>
                                        <div className="mb-3">
                                            <label>Password</label>
                                            <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" value={password} onChange={(p) => {setPassword(p.target.value)}} />
                                            <small>
                                                <Link to="forgotpassword" className="text-primary">Forgot password?</Link>
                                            </small>
                                        </div>
                                        <div className="text-center mt-3">
                                            <input type="submit" className="btn btn-lg btn-primary w-100" Value="Login" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>)
}