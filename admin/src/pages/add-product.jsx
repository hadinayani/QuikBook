import SiteTitle from "./siteTitle";
import axios from "axios";
import { useState, useEffect } from "react";
import { showError, showMessage, showNetworkError } from "./message";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import VerifyLogin from "./verifylogin";

export default function AddProduct() {

    VerifyLogin();
    let [name, setName] = useState('');
    let [detail, setDetail] = useState('');
    let [price, setPrice] = useState('');
    let [quantity, setQuantity] = useState('');
    let [weight, setWeight] = useState('');
    let [photo, setPhoto] = useState('');
    let [categories, setCategory] = useState('');

    let navigate = useNavigate();

    let [category, setCategories] = useState([]);
    useEffect(() => {
        if (category.length === 0) {
            let api = "http://localhost:5000/category";

            axios({
                url: api,
                method: 'get',
                responseType: 'json',
            }).then((response) => {
                console.log(response.data);
                let e = response.data[0]['error'];
                if (e === 'no') {
                    let total = response.data[1]['total'];
                    if (total === 0) {
                        alert("No category found. Plz add category");
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

    });

    let saveProducts = function (p) {

        console.log(name, price, categories);
        let api = "http://localhost:5000/products";

        let data = new FormData();
        data.append("name", name);
        data.append("categoryid", categories);
        data.append("description", detail);
        data.append("price", price);
        data.append("stock", quantity);
        data.append("weight", weight);
        data.append("photo", photo);
        console.log(data);
        axios({
            method: 'post',
            responseType: 'json',
            url: api,
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then((response) => {
            let error = response.data[0]['error'];
            let save = response.data[1]['success'];

            if (error === 'no') {
                if (save === 'yes') {
                    showMessage(response.data[2]['message']);
                    setTimeout(() => {
                        navigate('/products')
                    }, 2000);
                }
                else {
                    showError(response.data[2]['message']);
                }
            }
            else {
                showError(error);
            }
        }).catch((error) => showNetworkError(error));

        p.preventDefault();
    }
    return (
        <main className="main-content-wrapper">
            <SiteTitle title="Add New Product" />


            <div className="container">
                <ToastContainer />
                <div className="row ">
                    <div className="col-md-12">
                        <div className="d-md-flex justify-content-between align-items-center">

                            <div>
                                <h2>Add New Product</h2>

                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Products / Add New Product</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={saveProducts}>
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Product Name</label>
                                            <input type="text" className="form-control" id="pname" name="pname" placeholder="Product Name" required value={name} onChange={(p) => setName(p.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Select Product Category</label>
                                            <select className="form-select" id="category" name="category" value={categories} onChange={(c) => setCategory(c.target.value)} required>
                                                <option value="">Select Category</option>
                                                {category.map((item) => {
                                                    return (<option value={item.id}>{item.name}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" value={detail} onChange={(d) => setDetail(d.target.value)} rows={3}>

                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Price</label>
                                            <input type="number" className="form-control" id="price" name="price" placeholder="Price" required value={price} onChange={(p) => setPrice(p.target.value)} />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Quantity</label>
                                            <input type="number" className="form-control" id="quantity" name="quantity" placeholder="Quantity" required value={quantity} onChange={(q) => setQuantity(q.target.value)} />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Weight</label>
                                            <input type="number" className="form-control" id="weight" name="weight" placeholder="Weight" required value={weight} onChange={(w) => setWeight(w.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">

                                        <div className="col-md-4 mb-2">
                                            <label className="form-label">Photo</label>
                                            <input type="file" className="form-control" id="photo" name="photo" required onChange={(p) => setPhoto(p.target.files[0])} multiple />
                                        </div>

                                        <div className="col-md-4 d-grid ">
                                            <button type="submit" className="btn btn-primary">Add New Product</button> <br />
                                            <button type="reset" className="btn btn-light" onClick={() => {
                                                setCategory("");
                                                setDetail("");
                                                setName("");
                                                setPrice("");
                                                setPhoto("");
                                                setQuantity("");
                                                setWeight("");

                                            }}>Clear All</button>
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