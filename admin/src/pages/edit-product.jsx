import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SiteTitle from "./siteTitle";
import { showError, showMessage, showNetworkError } from "./message"; // adjust if needed
import VerifyLogin from "./verifylogin";

export default function EditProduct() {
    VerifyLogin();
    let { id } = useParams();
    let [title, setTitle] = useState("");
    let [detail, setDetail] = useState("");
    let [price, setPrice] = useState("");
    let [quantity, setQuantity] = useState("");
    let [weight, setWeight] = useState("");
    let [photo, setPhoto] = useState("");
    let [nphoto, setnphoto] = useState("");
    let [category, setCategory] = useState(""); // selected category
    let [categories, setCategories] = useState([]); // fetched categories
    let [isFetch, setIsfetch] = useState(false);
    let navigate = useNavigate();

    let fetchCategory = function () {
        if (categories.length === 0) {
            let api = "http://localhost:5000/category";

            axios({
                url: api,
                method: 'get',
                responseType: 'json',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                console.log(response.data);
                let e = response.data[0]['error'];
                if (e === 'no') {
                    let total = response.data[1]['total'];
                    if (total === 0) {
                        alert("No category found. Please add a category.");
                    } else {
                        response.data.splice(0, 2);
                        setCategories(response.data);
                    }
                }
            }).catch((e) => {
                showNetworkError(e);
            });
        }
    };

    useEffect(() => {
        if (isFetch === false) {
            let api = "http://localhost:5000/products?id=" + id;

            axios({
                url: api,
                method: 'get',
                responseType: 'json',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                console.log(response.data);
                let error = response.data[0]['error'];
                if (error === 'no') {
                    let total = response.data[1]['total'];
                    if (total === 0) {
                        showError("No product found");
                    } else {
                        setTitle(response.data[2]['name']);
                        setDetail(response.data[2]['description']);
                        setPrice(response.data[2]['price']);
                        setQuantity(response.data[2]['stock']);
                        setWeight(response.data[2]['weight']);
                        setCategory(response.data[2]['categoryid']);
                        setPhoto(response.data[2]['photo']);
                        fetchCategory();
                        setIsfetch(true);
                    }
                }
            }).catch((error) => {
                showNetworkError(error);
            });
        }
    });

    let updateProduct = function (e) {
        e.preventDefault();
    
        const api = "http://localhost:5000/products";
    
        // Use FormData to send file + text fields
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', title);
        formData.append('categoryid', category);
        formData.append('description', detail);
        formData.append('price', price);
        formData.append('stock', quantity);
        formData.append('weight', weight);
        formData.append('photo', nphoto); // 'photo' must be a File object (from file input)
    
        console.log('Uploading with FormData:', Object.fromEntries(formData));
    
        axios({
            url: api,
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then((response) => {
            console.log(response.data);
            let error = response.data[0]['error'];
            let save = response.data[1]['success'];
            if (error === 'no') {
                if (save === 'yes') {
                    showMessage(response.data[2]['message']);
                    setTimeout(() => {
                        navigate('/products');
                    }, 2000);
                } else {
                    showError(response.data[2]['message']);
                }
            } else {
                showError(error);
            }
        }).catch((error) => showNetworkError(error));
    };
    
    return (
        <main className="main-content-wrapper">
            <SiteTitle title="Edit Product" />

            <div className="container">
                <ToastContainer />
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-md-flex justify-content-between align-items-center">
                            <div>
                                <h2>Edit Product</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Products / Edit Product</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <img src={'http://127.0.0.1:5000/api/images/products/' + photo} alt={title} className="img-fluid" />
                    </div>
                    <div className="col-10">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={updateProduct}>
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Product Name"
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Select Product Category</label>
                                            <select
                                                className="form-select"
                                                required
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={detail}
                                                onChange={(e) => setDetail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Price"
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Quantity</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Quantity"
                                                required
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Weight</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Weight"
                                                required
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Photo</label>
                                            <input type="file" className="form-control" id="photo" name="photo" required  onChange={(e) => setnphoto(e.target.files[0])} />
                                        </div>

                                        <div className="col-md-4 d-grid">
                                            <button type="submit" className="btn btn-primary">Update Product</button> <br />
                                            <button type="reset" className="btn btn-light" onClick={() => {
                                                setCategory("");
                                                setDetail("");
                                                setTitle("");
                                                setPrice("");
                                                // setPhoto("");
                                                setQuantity("");
                                                setWeight("");
                                            }
                                            }>Clear All</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
