import React from "react";
import { Link } from "react-router-dom";
import SiteTitle from "./sitetitle";
import WithHook from "./hoc";
import axiox from 'axios';
import { showError, showMessage, showNetworkError } from "./message";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        const customerid = this.props.cookies['userid'];
        if (!customerid) {
            this.props.navigate('/login');
            return;
        }
    
        axios.get(`http://localhost:5000/orderhistory?customerid=${customerid}`)
            .then(response => {
                const data = response.data;
                console.log(data);
    
                if (data[0].error === "yes") {
                    toast.error(data[1].message);
                } else {
                    data.splice(0, 2); // Removing error and total
    
                    const groupedOrders = {};
                    data.forEach(item => {
                        const orderId = item.order_id;
                        if (!groupedOrders[orderId]) {
                            groupedOrders[orderId] = {
                                order_id: orderId,
                                orderDate: item.orderDate,
                                total_amount: item.amount,
                                order_status: item.order_status,
                                products: []
                            };
                        }
    
                        // Pushing the full product details into the products array
                        item.products.forEach(product => {
                            groupedOrders[orderId].products.push({
                                product_name: product.product_name,
                                product_image: product.product_image,
                                product_price: product.product_price,
                                quantity: product.quantity,
                                total_amount: product.total_amount
                            });
                        });
                    });
    
                    this.setState({ orders: Object.values(groupedOrders) });
                }
            })
            .catch(error => {
                toast.error("Network error while fetching order history.");
                console.error(error);
            });
    }
    

    deleteOrder = (order_id) => {
        axios.delete(`http://localhost:5000/deleteorder?orderid=${order_id}`)
            .then(response => {
                toast.success("Order deleted successfully.");
                this.setState({
                    orders: this.state.orders.filter(order => order.order_id !== order_id)
                });
            })
            .catch(error => {
                toast.error("Failed to delete the order.");
                console.error(error);
            });
    }

    render() {
        return (
            <div className="container py-5">
                <ToastContainer />
                <h2 className="mb-4 text-center">Order History</h2>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Products</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(order => (
                                <tr key={order.order_id}>
                                    <td>#{order.order_id}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${
                                            order.order_status === 'Delivered' ? 'bg-success' :
                                            order.order_status === 'Cancelled' ? 'bg-danger' : 'bg-secondary'
                                        }`}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td>{order.products.map(product => product.product_name).join(", ")}</td>

                                    <td>{order.total_amount}</td>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={() => this.deleteOrder(order.order_id)}>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default WithHook(OrderHistory);