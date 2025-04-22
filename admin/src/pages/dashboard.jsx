import { useState, useEffect } from "react"
import SiteTitle from "./siteTitle"
import { getBase } from "./common";
import axios from "axios";
import { showError, showNetworkError } from "./message";
import { Link } from 'react-router';
import VerifyLogin from "./verifylogin";
import Orders from "./orders";
export default function Dashboard() {
    VerifyLogin();
    let [dashboard, setDashboard] = useState([]);
    let api = "http://localhost:5000/dashboard";
    useEffect(() => {
        if (dashboard.total_categories === undefined) {
            axios({
                url: api,
                responseType: 'json',
                method: 'get',
                headers: 'response/type'
            }).then((response) => {
                console.log(response.data)
                let error = response.data[0]['error'];
                if (error === 'no') {
                    setDashboard(response.data[2]);
                }
                else {
                    showError("No found");
                }
            }).catch((error) => {
                showNetworkError(error);
            })
        }
    });
    return (
        <main className="main-content-wrapper">
            <SiteTitle title="Admin Dashboard" />
            <div className="table-responsive-xl mb-6 mb-lg-0">
                <div className="row flex-nowrap pb-3 pb-lg-0">
                    {/* Categories Card */}
                    <div className="col-lg-4 col-12 mb-6">
                        <div className="card h-100 card-lg">
                            <div className="card-body p-6 text-bg-light">
                                <div className="d-flex justify-content-between align-items-center mb-6">
                                    <h4 className="mb-0 fs-5">Categories</h4>
                                    <div className="icon-shape icon-md bg-light-danger text-dark-danger rounded-circle">
                                        <i className="bi bi-tag fs-5" />
                                    </div>
                                </div>
                                <div className="lh-1">
                                    <h1 className="mb-2 fw-bold fs-2">{dashboard.total_categories}</h1>
                                </div>
                                <Link to='/category' className="btn btn-primary mt-3">View Categories</Link>
                            </div>
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="col-lg-4 col-12 mb-6">
                        <div className="card h-100 card-lg">
                            <div className="card-body p-6 text-bg-light">
                                <div className="d-flex justify-content-between align-items-center mb-6">
                                    <h4 className="mb-0 fs-5">Products</h4>
                                    <div className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle">
                                        <i className="bi bi-cart fs-5" />
                                    </div>
                                </div>
                                <div className="lh-1">
                                    <h1 className="mb-2 fw-bold fs-2">{dashboard.total_products}</h1>
                                </div>
                                <Link to='/products' className="btn btn-primary mt-3">View Products</Link>
                            </div>
                        </div>
                    </div>

                    {/* Users Card */}
                    <div className="col-lg-4 col-12 mb-6">
                        <div className="card h-100 card-lg">
                            <div className="card-body text-bg-light p-6">
                                <div className="d-flex justify-content-between align-items-center mb-6">
                                    <h4 className="mb-0 fs-5">Users</h4>
                                    <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
                                        <i className="bi bi-people fs-5" />
                                    </div>
                                </div>
                                <div className="lh-1">
                                    <h1 className="mb-2 fw-bold fs-2">{dashboard.total_users}</h1>
                                </div>
                                <Link to='/users' className="btn btn-primary mt-3">View Users</Link>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row flex-nowrap pb-3 pb-lg-0">
                    <div className="col-lg-4 col-12 mb-6">
                        <div className="card h-100 card-lg">
                            <div className="card-body text-bg-light p-6">
                                <div className="d-flex justify-content-between align-items-center mb-6">
                                    <h4 className="mb-0 fs-5">Orders</h4>
                                    <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
                                        <i className="bi bi-people fs-5" />
                                    </div>
                                </div>
                                <div className="lh-1">
                                    <h1 className="mb-2 fw-bold fs-2">{dashboard.total_orders}</h1>
                                </div>
                                <Link to='/orders' className="btn btn-primary mt-3">View Orders</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-12 mb-6">
                        <div className="card h-100 card-lg">
                            <div className="card-body text-bg-light p-6">
                                <div className="d-flex justify-content-between align-items-center mb-6">
                                    <h4 className="mb-0 fs-5">
                                    Confirm Orders</h4>
                                    <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
                                        <i className="bi bi-people fs-5" />
                                    </div>
                                </div>
                                <div className="lh-1">
                                    <h1 className="mb-2 fw-bold fs-2">{dashboard.confirmed_orders}</h1>
                                </div>
                                <Link to='/orders' className="btn btn-primary mt-3">View Orders</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </main>
    )
}