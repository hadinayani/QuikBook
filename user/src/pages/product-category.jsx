import React from "react";
import SiteTitle from "./sitetitle";
import axios from 'axios';
import { showError, showNetworkError,showMessage } from "./message";
import WithHook from "./hoc";
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";


class ProductCategory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            categorytitle: ''
        }

    }

    addtoCart = (id) => {
      
            if (this.props.cookies['userid'] !== undefined) {
                let temp = 0;
                temp++;
                let userid = this.props.cookies['userid'];
                // const { id } = this.props.params;
                
    
                let api = "http://localhost:5000/addtocart";
                let form = new FormData();
    
                form.append('customerid', userid);
                form.append('productid', id);
    
    
                axios({
                    method: 'post',
                    responseType: 'json',
                    url: api,
                    data: form,
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    console.log(response.data)
                    let error = response.data[0]['error'];
                    let message = response.data[2]['message'];
    
    
                    if (error === 'yes')
                        showError(error);
                    else {
                        showMessage(message);
                    }
                })
    
            }
    
            else {
                showMessage("Plz Login")
                setTimeout(() => {
                    this.props.navigate("/login");
                }, 2000)
            }
        
    };
    componentDidMount() {
        const { id } = this.props.params;
        // alert(id);
        let api = "http://localhost:5000/products?categoryid=" + id;
        console.log(api);
        axios({
            url: api,
            method: 'get',
            responseType: 'json',
        }).then((response) => {

            let error = response.data[0]['error'];
            if (error === 'no') {
                let total = response.data[1]['total'];
                if (total === 0) {
                    alert("No product found");
                }
                else {
                    response.data.splice(0, 2);
                    this.setState({
                        products: response.data,
                        categorytitle: response.data[0]['category_name']
                    })

                }
            }
        }).catch((error) => {
            showNetworkError(error);
        })
    }

    render() {
        return (
            <>
                <section className="mt-8 mb-lg-14 mb-8">
                    <SiteTitle title={this.state.categorytitle} />
                    <div className="container">
                        <ToastContainer />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card mb-4 bg-light border-0">
                                    <div className="card-body p-9">
                                        <h2 className="mb-0 fs-1">{this.state.categorytitle}</h2>
                                    </div>
                                </div>

                                <div className="d-lg-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-3 mb-md-0">
                                            <span className="text-dark">{this.state.products.length}</span> Products found
                                        </p>
                                    </div>
                                </div>

                                <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 mt-2">
                                    {this.state.products.map((item) => {
                                        return (
                                            <div className="col">
                                                <div className="card card-product">
                                                    <div className="card-body">
                                                        <div className="text-center position-relative">
                                                            <Link to={"/productdetails/" + item.id}>
                                                                <img
                                                                    src={item.image_url || "http://127.0.0.1:5000/api/images/products/" + item.photo}

                                                                    alt={item.name}
                                                                    className="mb-3 img-fluid product-img"
                                                                />
                                                            </Link>
                                                        </div>

                                                        <div className="text-small mb-1">
                                                            <a href="#!" className="text-decoration-none text-muted">
                                                                <small>{item.category_name}</small>
                                                            </a>
                                                        </div>
                                                        <h2 className="fs-6">
                                                            <Link to={"/productdetails/" + item.id} className="text-inherit text-decoration-none">
                                                                {item.name}
                                                            </Link>
                                                        </h2>
                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                            <div>
                                                                <span className="text-dark">&#8377; {item.price}</span>
                                                            </div>
                                                            <div>
                                                                <button onClick={() => this.addtoCart(item.id)} className="btn btn-primary btn-sm">
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

}

export default WithHook(ProductCategory);
