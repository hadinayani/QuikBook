import { useEffect, useState } from "react";
import SiteTitle from "./siteTitle";
import { Link, useParams } from "react-router";
import { getBase,getImageBase } from "./common";
import { showError,showMessage,showNetworkError } from "./message";
import axios from "axios";
import VerifyLogin from "./verifylogin";

export default function ViewProduct() {

    VerifyLogin();
    // get id using useParams
    let { id } = useParams();
    let [product, setProduct] = useState(null);
    let api = "http://localhost:5000/products?id=" + id;

    useEffect(() => {
        if (product === null) {
            axios({
                url: api,
                method: 'get',
                responseType: 'json',
                headers:'application/json'
            }).then((response) => {
                console.log(response.data);
                let error = response.data[0]['error'];
                let total = response.data[1]['total'];
                if (error === 'no') {
                    if (total === 0) {
                        showError("No product detail found");
                    }
                    else {
                        response.data.splice(0, 2);
                        setProduct(response.data[0]);
                    }
                }
            }).catch((error) => {
                showNetworkError(error);
            })
        }
    })

    return (
        
        (product === null)?"":
        <main className="main-content-wrapper">
        <SiteTitle title= {product.name.toUpperCase()} />


        <div className="container">

            <div className="row ">
                <div className="col-md-12">
                    <div className="d-md-flex justify-content-between align-items-center">

                        <div>
                            <h2>View Product</h2>

                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">Products / View Product</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header text-bg-light d-flex justify-content-between">
                            <h3 className="mb-0">{product.name.toUpperCase()} </h3>
                            <Link to="/products" className="btn btn-primary">Back</Link>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <p>Photo</p>
                                    <img src={"http://127.0.0.1:5000/api/images/products/" + product.photo} alt={product.name}className="img-fluid" />
                                </div>
                                <div className="col-9">
                                    <table className="table table-sm table-bordered table-striped">
                                        <tbody><tr>
                                            <td width="25%" className="fw-bold">Id</td>
                                            <td>{product.id}</td>
                                        </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Category</td>
                                                <td>{product.category_name.toUpperCase()}</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Price</td>
                                                <td>{product.price}</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Weight</td>
                                                <td>{product.weight}t</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Stock</td>
                                                <td>{product.stock}</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Detail</td>
                                                <td>{product.description}</td>
                                            </tr>
                                           
                                        </tbody></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* <div className="col-12">
                    <div className="card">
                        <div className="card-header text-bg-light d-flex justify-content-between">
                            <h3 className="mb-0">KAJU KATRI</h3>
                            <Link to="/products" className="btn btn-primary">Back</Link>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <p>Photo</p>
                                    <img src="/images/Kaju_katli.jpg" alt="photo" className="img-fluid" />
                                </div>
                                <div className="col-9">
                                    <table className="table table-sm table-bordered table-striped">
                                        <tbody><tr>
                                            <td width="25%" className="fw-bold">Id</td>
                                            <td>1</td>
                                        </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Category</td>
                                                <td>SWEETS</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Price</td>
                                                <td>400</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Weight</td>
                                                <td>500 GM</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Stock</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td width="25%" className="fw-bold">Detail</td>
                                                <td>Weight : 500G, Price: &#8377;400</td>
                                            </tr>
                                           
                                        </tbody></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </main>

    );
}