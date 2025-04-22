import SiteTitle from "./siteTitle";
import $, { error } from "jquery";
import "datatables.net";
import { Link } from "react-router";
import { getBase, getImageBase } from "./common";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showError, showMessage, showNetworkError } from "./message";
import VerifyLogin from "./verifylogin";

export default function Category() {

    // create state array

    VerifyLogin();
    let [category, setCategories] = useState([]);

    useEffect(() => {
        if (category.length === 0) {
            let api = "http://localhost:5000/category";

            axios({
                url: api,
                method: 'get',
                responseType: 'json',
            }).then((response) => {
                console.log(response.data)
                let e = response.data[0]['error'];
                if (e === 'no') {
                    let total = response.data[1]['total'];
                    if (total === 0) {
                        showError("No category found. Plz add category");
                    }
                    else {
                        response.data.splice(0, 2);
                        setCategories(response.data);
                    }
                }
            }).catch((e) => {
                showNetworkError(e);
            })
        }
        else {
            $("#myTable").DataTable();
        }
    });

    let deleteCategory = function (iID) {
        // alert(iID);

        let api = "http://localhost:5000/category?id=" + iID;

        axios({
            url: api,
            method: 'delete',
            responseType: 'json',
        }).then((response) => {

            let error = response.data[0]['error'];
            if (error !== 'no') {
                showError(error);
            }
            else {
                let temp = category.filter((item) => {
                    if (item.id !== iID)
                        return item;
                });
                setCategories(temp);
                showMessage(response.data[2]['message']);
            }
        }).catch((error) => {
            showNetworkError(error);
        });


    }

    let Display = function (i) {
        const formattedDate = new Date(i.created_at).toLocaleDateString();
        return (

            <tr>

                <td>{i.id}</td>
                <td><span className="text-reset">{i.name}</span></td>
                <td>
                    <a href={'http://127.0.0.1:5000/api/images/category/' + i.images} data-fancybox="gallery" data-caption={i.title} >
                        <img src={'http://127.0.0.1:5000/api/images/category/' + i.images} alt={i.title} style={{ "maxWidth": "80px" }} />
                    </a>
                </td>
                <td><span className="text-reset">{formattedDate}</span></td>
                <td>
                    <Link to={"/category/edit/" + i.id} className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                    <button className="btn btn-danger btn-sm ms-1" onClick={(e) => deleteCategory(i.id)} ><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            </tr>

        );
    }



    return (
        <>
            <main className="main-content-wrapper">
                <SiteTitle title="View Categories" />
                <div className="container">
                    <ToastContainer />
                    <div className="row mb-8">
                        <div className="col-md-12">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">

                                <div>
                                    <h2>Categories</h2>


                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item">Categories / View Categories</li>
                                    </ol>

                                </div>

                                <div>
                                    <Link to="/category/add" className="btn btn-primary">Add New Category</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-12 mb-5">

                            <div className="card h-100 card-lg">


                                <div className="card-body p-0">

                                    <div className="table-responsive">
                                        <table id="myTable" className="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Photo</th>
                                                    <th>Created At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {category.map((i) => Display(i))}

                                                {/* <tr>

                                                    <td>1</td>
                                                    <td><span className="text-reset">Fire Crackers</span></td>
                                                    <td>
                                                        <a href={getImageBase() + "category/" + i.photo} data-fancybox="gallery" data-caption={i.title} >
                                                        <img src="images/fire crackers.jpeg" alt="" style={{ "maxWidth": "80px" }} />
                                                        </a>
                                                    </td>
                                                    <td><span className="text-reset">26/02/2025</span></td>
                                                    <td>
                                                        <Link to={"/category/edit/"} className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                                                        <button className="btn btn-danger btn-sm ms-1" onClick={(e) => deleteCategory()} ><i class="fa-solid fa-trash"></i> Delete</button>
                                                    </td>
                                                </tr>
                                                <tr>

                                                    <td>2</td>
                                                    <td><span className="text-reset">Sweets</span></td>
                                                    <td>
                                                        <a href={getImageBase() + "category/" + i.photo} data-fancybox="gallery" data-caption={i.title} >
                                                        <img src="images/sweets.jpg" alt="" style={{ "maxWidth": "80px" }} />
                                                        </a>
                                                    </td>
                                                    <td><span className="text-reset">27/02/2025</span></td>
                                                    <td>
                                                        <Link to={"/category/edit/"} className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                                                        <button className="btn btn-danger btn-sm ms-1" onClick={(e) => deleteCategory()} ><i class="fa-solid fa-trash"></i> Delete</button>
                                                    </td>
                                                </tr>
                                                <tr>

                                                    <td>3</td>
                                                    <td><span className="text-reset">Holi Colors</span></td>
                                                    <td>
                                                        <a href={getImageBase() + "category/" + i.photo} data-fancybox="gallery" data-caption={i.title} >
                                                        <img src="images/holi.jpeg" alt="" style={{ "maxWidth": "80px" }} />
                                                        </a>
                                                    </td>
                                                    <td><span className="text-reset">02/03/2025</span></td>
                                                    <td>
                                                        <Link to={"/category/edit/"} className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                                                        <button className="btn btn-danger btn-sm ms-1" onClick={(e) => deleteCategory()} ><i class="fa-solid fa-trash"></i> Delete</button>
                                                    </td>
                                                </tr>
                                                <tr>

                                                    <td>4</td>
                                                    <td><span className="text-reset">Kites & Threads</span></td>
                                                    <td>
                                                        <a href={getImageBase() + "category/" + i.photo} data-fancybox="gallery" data-caption={i.title} >
                                                        <img src="images/kites.png" alt="" style={{ "maxWidth": "80px" }} />
                                                        </a>
                                                    </td>
                                                    <td><span className="text-reset">02/03/2025</span></td>
                                                    <td>
                                                        <Link to={"/category/edit/"} className="btn btn-warning btn-sm ms-1"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                                                        <button className="btn btn-danger btn-sm ms-1" onClick={(e) => deleteCategory()} ><i class="fa-solid fa-trash"></i> Delete</button>
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
        </>

    );
}