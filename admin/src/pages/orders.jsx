import SiteTitle from "./siteTitle";
import $ from "jquery";
import "datatables.net";
import axios from 'axios';
import { getBase, getImageBase } from "./common";
import { showError, showNetworkError, showMessage } from "./message";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import VerifyLogin from "./verifylogin";



export default function Orders() {
    VerifyLogin();

    let [order, setOrders] = useState([]);
    let api = "http://localhost:5000/orders";

    useEffect(() => {
        if (order.length === 0) {
            axios({
                url: api,
                responseType: 'json',
                method: 'get',
                headers: 'application/json'
            }).then((response) => {
                console.log(response.data);
                let error = response.data[0]['error'];
                let total = response.data[1]['total'];

                if (error === 'no') {
                    if (total === 0) {
                        showMessage("No Orders Found");
                    } else {
                        response.data.splice(0, 2);
                        setOrders(response.data);
                    }
                }
            }).catch((error) => {
                showError(error);
            })
        }
        else {
            $('#myTable').DataTable();
        }
    });

    let handleConfirmOrder = (orderId) => {
        // Call the API to update the order status to 'confirmed'
        axios.post('http://localhost:5000/updateOrderStatus', {
            orderid: orderId,
            status: 'confirmed'
        })
        .then((response) => {
            if (response.data[0].error === 'no') {
                // If the status is updated successfully, reload the orders or update the UI
                showMessage("Order Confirmed Successfully");
                setOrders(order.map(item => item.id === orderId ? { ...item, order_status: 'confirmed' } : item));
            } else {
                showError(response.data[1].message);
            }
        })
        .catch((error) => {
            showError(error);
        });
    }

    let displayOrders = function (item) {
        const formattedDate = new Date(item.orderDate).toLocaleDateString();

        // Check if the order status is 'confirmed' to display the 'Delivered' badge
        const statusBadge = item.order_status === 'confirmed' ? 
            <span className="badge bg-success ms-2">Delivered</span> : null;

        return (
            <tr>
                <td><span className="text-reset">{item.id}</span></td>
                <td>
                    <span className="text-reset">{item.customer_name}</span>
                </td>

                <td>
                    <span className="text-reset">{formattedDate}</span>
                </td>
                <td>
                    <span className="text-reset">{item.amount}</span>
                </td>
                <td>
                    <Link to={"/orders/view/" + item.id} className="btn btn-light btn-sm"><i className="fa-solid fa-eye"></i> Detail</Link>

                    {/* Conditionally render the Confirm button if the status is not 'confirmed' */}
                    {item.order_status !== 'confirmed' && 
                        <button className="btn btn-success btn-sm ms-2" onClick={() => handleConfirmOrder(item.id)}>
                            <i className="fa-solid fa-check"></i> Confirm Order
                        </button>
                    }

                    {statusBadge} {/* Display badge if status is 'confirmed' */}
                </td>
            </tr>
        )
    }

    return (
        <main className="main-content-wrapper">
            <SiteTitle title="View Orders" />
            <div className="container">
                <ToastContainer />
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                            <div>
                                <h2>Orders</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        <div className="card h-100 card-lg">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox" id="myTable">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((item) => displayOrders(item))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
