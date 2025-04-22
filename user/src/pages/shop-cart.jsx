import React, { Component } from "react";
import { Link } from "react-router-dom";
import SiteTitle from "./sitetitle";
import WithHook from "./hoc";
import axiox from 'axios';
import { showError, showMessage, showNetworkError } from "./message";
import axios from "axios";
import { ToastContainer } from "react-toastify";
class ShopCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            total: 0,
            orderid: ''
        }
    }

    deleteCart = (item) => {

        console.log(item);

        let api = "http://localhost:5000/cart?itemid=" + item.item_id;

        axios({
            url: api,
            responseType: 'json',
            method: 'delete'
        }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            if (error === 'yes') {
                showError(error);
            }
            else {
                showMessage(response.data[2]['message']);
                var itemtotal = 0;
                var temp = this.state.items.filter((current) => {
                    // console.log(current.item_id)
                    if (current.item_id !== item.item_id)
                        return item;
                    else {
                        itemtotal = current.product_price * current.quantity;
                    }
                });
                this.setState = {
                    items: temp,
                    total: this.state.total - itemtotal
                }
            }
        }).catch((error) => showNetworkError(error))

    }

    checkoutCart = () => {
        if ((this.props.cookies['userid']) !== undefined) {
            const customerid = this.props.cookies['userid'];

            if (!customerid) {
                showError("User not logged in!");
                return;
            }

            let api = "http://localhost:5000/checkout";

            axios({
                url: api,
                method: 'post',
                responseType: 'json',
                data: { customerid }
            })
                .then((response) => {
                    console.log(response.data);
                    const error = response.data[0]['error'];

                    if (error === "yes") {
                        showError(response.data[1]['message']);
                    } else {
                        showMessage(response.data[1]['message']);

                        setTimeout(() => {
                            this.props.navigate('/history');
                        },2000)


                        this.setState({
                            items: [],
                            total: 0,
                            orderid: response.data[2]?.orderid || null
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    showNetworkError(error);
                });
        }
        else {
            showMessage("plz Login");
            setTimeout(() => {
                this.props.navigate('/login');
            })
        }
    }


    componentDidMount() {
        if ((this.props.cookies['userid']) !== undefined) {
            const userid = this.props.cookies['userid'];
            let productid = this.props.params;

            let api = "http://localhost:5000/cart?userid=" + userid + '&productid=' + productid;
            // alert(userid);

            axiox({
                url: api,
                responseType: 'json',
                method: 'get'
            }).then((response) => {
                console.log(response.data);

                let error = response.data[0]['error'];
                let total = response.data[1]['total'];

                if (error === 'yes') {
                    showError(error);
                }
                else {
                    if (total === 0)
                        showError("Cart Is Emapty");
                    else {
                        response.data.splice(0, 2);

                        let temp = 0;
                        response.data.map((current) => {
                            temp += (current.product_price * current.quantity)
                        });
                        this.setState({
                            items: response.data,
                            total: temp
                        });
                    }
                }
            }).catch((error) => showNetworkError(error));
        }
        else {

            setTimeout(() => {
                this.props.navigate('/login');

            })
        }
    }
    render() {

        return (
            <>
                <section className="mb-lg-14 mb-8 mt-8">
                    <SiteTitle title='Cart' />
                    <ToastContainer />
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="card py-1 border-0 mb-8">
                                    <div>
                                        <h1 className="fw-bold">Shop Cart</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-8 col-md-7">
                                <div className="py-3">
                                    <ul className="list-group list-group-flush">
                                        {this.state.items.map((cart) => {
                                            return (
                                                <li className="list-group-item py-3 ps-0 ">
                                                    {/* First item */}
                                                    <div className="row align-items-center mb-4 ">
                                                        <div className="col-6 col-md-6 col-lg-7">
                                                            <div className="d-flex">
                                                                <img src={"http://127.0.0.1:5000/api/images/products/" + cart.product_image} alt="Ecommerce" className="icon-shape icon-xxl" />
                                                                <div className="ms-3">
                                                                    <a href="shop-single.html" className="text-inherit">
                                                                        <h6 className="mb-0">{cart.product_name}</h6>
                                                                    </a>
                                                                    <span><small className="text-muted">{cart.category_name.toUpperCase()}</small></span>
                                                                    <div className="mt-1 small lh-1">
                                                                        <button className=" btn text-decoration-none " onClick={() => this.deleteCart(cart)}>
                                                                            <span className="me-1 align-text-bottom">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 text-success">
                                                                                    <polyline points="3 6 5 6 21 6" />
                                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                                    <line x1={10} y1={11} x2={10} y2={17} />
                                                                                    <line x1={14} y1={11} x2={14} y2={17} />
                                                                                </svg>
                                                                            </span>
                                                                            <span className="">Remove</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 col-md-4 col-lg-3">
                                                            <span>{cart.quantity + ' X ' + cart.product_price}</span>
                                                        </div>
                                                        <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                                                            <span className="fw-bold">&#8377; {cart.product_price * cart.quantity}</span>
                                                        </div>
                                                    </div>


                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="col-12 col-lg-4 col-md-5">
                                <div className="mb-5 card mt-6">
                                    <div className="card-body p-6">
                                        <h2 className="h5 mb-4">Order Summary</h2>
                                        <div className="card mb-2">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                                    <div className="me-auto">
                                                        <div>Item Subtotal</div>
                                                    </div>
                                                    <span>&#8377; {this.state.total}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                                    <div className="me-auto">
                                                        <div className="fw-bold">Subtotal</div>
                                                    </div>
                                                    <span className="fw-bold">&#8377; {this.state.total}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="d-grid mb-1 mt-4">
                                            <button onClick={this.checkoutCart} className="btn btn-primary btn-lg d-flex justify-content-between align-items-center" type="submit">
                                                Conform Order
                                                <span className="fw-bold">&#8377; {this.state.total}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );


    }
}

export default WithHook(ShopCart);
