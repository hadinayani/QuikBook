import Menu from "./menu";
import SiteTitle from "./siteTitle";
import $ from "jquery";
import "datatables.net";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { showError, showMessage, showNetworkError } from "./message";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import VerifyLogin from "./verifylogin";

export default function ViewOrder() {
    VerifyLogin();
    let { id } = useParams();

    let [order, setOrder] = useState({});
    let [item, setItem] = useState([]);
    let [isFetch, setIsFetch] = useState(false);
    let [total, setTotal] = useState(0);
    let orderInfo = function () {
        let api = "http://localhost:5000/orders?id=" + id;

        axios({
            url: api,
            method: 'get',
            responseType: 'json',
            headers: 'application/json'
        }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            let total = response.data[1]['total'];

            if (error === 'yes') {
                showError(error)
            }
            else {
                if (total === 0) {
                    showError("No Order Detail Found");
                }
                else {
                    response.data.splice(0, 2);
                    // console.log(response.data[0])
                    setOrder(response.data[0]);
                    setIsFetch(true);
                }
            }

        })
    }

    let orderItem = function () {
        let api = "http://localhost:5000/items?orderid=" + id;
        axios({
            url: api,
            responseType: 'json',
            method: 'get'
        }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            let total = response.data[1]['total'];

            if (error === 'yes')
                showError(error);
            else {
                if (total === 0) {
                    showError("No Item Found");
                }
                else {
                    response.data.splice(0, 2);
                    let temp = 0;
                    for (let index = 0; index < response.data.length; index++) {
                        temp += response.data[index].price * response.data[index].quantity;
                    }
                    setTotal(temp);
                    setItem(response.data);
                }
            }
        }).catch((error) => {
            showNetworkError(error);
        })
    }

    let displayItem = function (i) {
        console.log(i)
        return (
            
            <tr>
                <td>{i.id}</td>
                <td>{i.product_name}</td>
                <td className="text-end">{i.quantity}</td>
                <td className="text-end">{i.price}</td>
                <td className="text-end">{i.price * i.quantity}</td>
            </tr>
        )
    }
    useEffect(() => {
        if (isFetch === false) {
            orderInfo();
            orderItem();
        }
    })



    const formattedDate = new Date(order.orderDate).toLocaleDateString();
    return (
        (order === null) ? "" : <main className="main-content-wrapper">
            <SiteTitle title={order.id + " " + order.customer_name} />
            <div className="container">
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">

                            <div>
                                <h2>Order</h2>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header text-bg-light d-flex justify-content-between">
                                <h3 className="mb-0">
                                    Order ID - {order.id}
                                </h3>
                                <h3 className="mb-0">
                                    Date :- {formattedDate}
                                    {/* <Link to="/orders/print" className="btn btn-success">Print</Link> */}
                                </h3>
                                <Link to="/orders" className="btn btn-primary">Back</Link>
                            </div>
                            <div className="card-body">
                                <table className="table table-responsive table-bordered mb-3">
                                    <tbody ><tr>
                                        <th className="text-black">ID</th>
                                        <td>{order.id}</td>
                                        <th className="text-black">Date</th>
                                        <td>{formattedDate}</td>
                                    </tr>
                                        <tr>
                                            <th className="text-black">Customer</th>
                                            <td>{order.customer_name}</td>
                                            <th className="text-black">Amount</th>
                                            <td>{total}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-black">No Of Item</th>
                                            <td>1</td>
                                        </tr>
                                    </tbody></table>
                                <h3 className="mb-3">items</h3>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th className="text-black">NO</th>
                                            <th className="text-black">Name</th>
                                            <th className='text-end text-black'>Quantity</th>
                                            <th className='text-end text-black'>Price</th>
                                            <th className='text-end text-black'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.map((i) => {
                                            return displayItem(i);
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan={5} className="text-end">Total : {total} </th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}