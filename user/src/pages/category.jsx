import React from "react";
import SiteTitle from "./sitetitle";
import axios from "axios";
import { showError, showNetworkError } from "./message";
import { Link } from 'react-router-dom';

class Category extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        let api = "http://localhost:5000/category";

        axios({
            url: api,
            method: 'get',
            responseType: 'json',
            headers: 'application/json'
        }).then((response) => {
            console.log(response.data);
            let e = response.data[0]['error'];
            if (e === 'no') {
                let total = response.data[1]['total'];
                if (total === 0) {
                    showError("No category found. Plz add category");
                }
                else {
                    response.data.splice(0, 2);
                    this.setState({
                        categories: response.data
                    });
                }
            }
        }).catch((e) => {
            showNetworkError(e);
        })
    }

    render() {
        return (
            <section className="mt-8 mb-lg-14 mb-8">
                <SiteTitle title="Shop by Categories" />
                <div className="container">
                    {/* row */}
                    <div className="row">
                        {/* col */}
                        <div className="col-lg-12">
                            {/* page header */}
                            <div className="card mb-4 bg-light border-0">
                                {/* card body */}
                                <div className="card-body p-9">
                                    {/* title */}
                                    <h2 className="mb-0 fs-1">Shop by Category</h2>
                                </div>
                            </div>
                            {/* list icon */}
                            <div className="d-lg-flex justify-content-between align-items-center">
                                <div>
                                    <p className="mb-3 mb-md-0">
                                        <span className="text-dark">{this.state.categories.length}</span> Categories found
                                    </p>
                                </div>
                            </div>
                            <div className="row g-4 row-cols-lg-4 row-cols-1 row-cols-md-2 mt-2">
                                {this.state.categories.map((item) => {
                                    return (<div className="col">
                                        <div className="card card-product">
                                            <div className="card-body">
                                                <div className="text-center position-relative">

                                                    <Link to={"/productcategory/" + item.id}>
                                                        <img src={"http://127.0.0.1:5000/api/images/category/" + item.images} alt={item.name} className="mb-3 img-fluid category-img" />
                                                    </Link>
                                                </div>

                                                <h2 className="fs-4">
                                                    <Link to={"/productcategory/" + item.id} className="text-inherit text-decoration-none">{item.name}</Link>
                                                </h2>

                                            </div>
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Category;
