import SiteTitle from "./siteTitle";
import $, { error } from "jquery";
import "datatables.net";
import { Link } from "react-router";
import axios from 'axios';
import { useEffect, useState } from "react";
import { getBase, getImageBase } from "./common";
import { showError, showMessage, showMessagem, showNetworkError } from "./message";
import { ToastContainer } from "react-toastify";
import VerifyLogin from "./verifylogin";


export default function Products() {

    VerifyLogin();
    // create state array
    let [product, setProducts] = useState([]);

    useEffect(() => {

        
        if (product.length === 0) {
            let api = "http://localhost:5000/products";
            axios({
                url: api,
                method: 'get',
                responseType: 'json',
                headers: 'application/json'
            }).then((response) => {
                console.log(response.data)
                let error = response.data[0]['error'];
                if (error === 'no') {
                    let total = response.data[1]['total'];
                    if (total === 0) {
                        showError("No product found");
                    }
                    else {
                        response.data.splice(0, 2);
                        setProducts(response.data);
                    }
                }
            }).catch((error) => {
                showNetworkError(error);
            })
        }
        else {
            $("#myTable").DataTable();
        }
    });

    let deleteProduct = function (iID) {
        let apiAdd = "http://localhost:5000/products?id=" + iID;
    
        // Destroy DataTable before updating state
        const table = $('#myTable').DataTable();
        table.destroy();
    
        axios({
            url: apiAdd,
            method: 'delete',
            responseType: 'json',
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then((response) => {
            let error = response.data[0]['error'];
            if (error === "yes") {
                showError(error);
            } else {
                // Filter out the deleted product from the state
                let temp = product.filter((i) => i.id !== iID);
                setProducts(temp);  // Update the product list in state
                showMessage(response.data[2]['message']);
            }
        }).catch((error) => showNetworkError(error));
    }
    

    let displayData = function (item) {
        return (
            <tr>

                <td><span className="text-reset">{item.id}</span></td>
                <td><span className="text-reset">{item.name}</span></td>
                <td>

                    <span className="text-reset">{item.category_name}</span>
                </td>
                <td>
                    <a href={"http://127.0.0.1:5000/api/images/products/" + item.photo} data-fancybox="gallery" data-caption={item.title}>
                        <img src={"http://127.0.0.1:5000/api/images/products/" + item.photo} alt={item.title} style={{ "maxWidth": "80px" }} />
                    </a>
                </td>
                <td>
                    <span className="text-reset">&#8377; {item.price}</span>
                </td>
                <td>
                    <span className="text-reset">{item.stock}</span>
                </td>

                <td>
                    <Link to={"/products/view/" + item.id} className="btn btn-light btn-sm"><i class="fa-solid fa-eye"></i> View</Link>

                    <Link to={"/products/edit/" + item.id} className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>

                    <button className="btn btn-danger btn-sm ms-1" onClick={() => deleteProduct(item.id)}><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            </tr>
        )
    }
    return (
        <main className="main-content-wrapper">
            <SiteTitle title="View Products" />
            <div className="container">
                <ToastContainer />
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">

                            <div>
                                <h2>Products</h2>


                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Products / View Products</li>
                                </ol>

                            </div>

                            <div>
                                <Link to="/products/add" className="btn btn-primary">Add New Product</Link>
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
                                                <th>Product Name</th>
                                                <th>Category Name</th>
                                                <th>Image</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.map((i) => displayData(i))}
                                            {/* <tr>

                                                <td><span className="text-reset">1</span></td>
                                                <td><span className="text-reset">Kaju Katri</span></td>
                                                <td>

                                                    <span className="text-reset">Sweets</span>
                                                </td>
                                                <td>
                                                    <a href={getImageBase() + "product/" + item.photo} data-fancybox="gallery" data-caption={item.title}>
                                                        <img src="/images/Kaju_katli.jpg"alt="" style={{ "maxWidth": "80px" }} />
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="text-reset">&#8377; 400</span>
                                                </td>
                                                <td>
                                                    <span className="text-reset">500 GM</span>
                                                </td>

                                                <td>
                                                    <Link to={"/products/view/" } className="btn btn-light btn-sm"><i class="fa-solid fa-eye"></i> View</Link>

                                                    <Link to="/products/edit" className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>

                                                    <button className="btn btn-danger btn-sm ms-1"><i class="fa-solid fa-trash"></i> Delete</button>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td><span className="text-reset">2</span></td>
                                                <td><span className="text-reset">Kites</span></td>
                                                <td>

                                                    <span className="text-reset">Kites & Threads</span>
                                                </td>
                                                <td>
                                                    <a href={getImageBase() + "product/" + item.photo} data-fancybox="gallery" data-caption={item.title}>
                                                        <img src="/images/kite.png"alt="" style={{ "maxWidth": "80px" }} />
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="text-reset">&#8377; 20</span>
                                                </td>
                                                <td>
                                                    <span className="text-reset">5 Pc</span>
                                                </td>

                                                <td>
                                                    <Link to={"/products/view/" } className="btn btn-light btn-sm"><i class="fa-solid fa-eye"></i> View</Link>

                                                    <Link to="/products/edit" className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>

                                                    <button className="btn btn-danger btn-sm ms-1"><i class="fa-solid fa-trash"></i> Delete</button>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td><span className="text-reset">3</span></td>
                                                <td><span className="text-reset">Sutli Bomb</span></td>
                                                <td>

                                                    <span className="text-reset">Fire Crakers</span>
                                                </td>
                                                <td>
                                                    <a href={getImageBase() + "product/" + item.photo} data-fancybox="gallery" data-caption={item.title}>
                                                        <img src="/images/sutli.jpeg"alt="" style={{ "maxWidth": "80px" }} />
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className="text-reset">&#8377; 150</span>
                                                </td>
                                                <td>
                                                    <span className="text-reset">10 Pc</span>
                                                </td>

                                                <td>
                                                    <Link to={"/products/view/" } className="btn btn-light btn-sm"><i class="fa-solid fa-eye"></i> View</Link>

                                                    <Link to="/products/edit" className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>

                                                    <button className="btn btn-danger btn-sm ms-1"><i class="fa-solid fa-trash"></i> Delete</button>
                                                </td>
                                            </tr> */}
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