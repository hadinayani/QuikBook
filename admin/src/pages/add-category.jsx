
import SiteTitle from "./siteTitle";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showError, showMessage, showNetworkError } from "./message";
import { useNavigate, Link } from "react-router";
import VerifyLogin from "./verifylogin";


export default function AddCategory() {

    VerifyLogin();
    // create satate variable
    let [title, setTitle] = useState('');
    let [photo, setPhoto] = useState('');

    let navigate = useNavigate();

    let saveCategory = function (i) {
        console.log(title, photo);
        let api = "http://localhost:5000/category";
        let fdata = new FormData();
        fdata.append("name",title);
        fdata.append("images",photo);
        axios({
            method: 'post',
            url: api,
            responseType: 'json',
            data:fdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then((response) => {
            // console.log(response.data);
            let error = response.data[0]['error'];
            let save = response.data[1]['success'];
            if (error === 'no') {
                if (save === 'yes') {
                    showMessage(response.data[2]['message']);
                    setTimeout(() => {
                        navigate('/category');
                    }, 2000);
                }
                else {
                    showError(response.data[2]['messsage']);   
                }

            }
            else {
                showError(error);
            }
        }).catch((error) => showNetworkError(error));

        i.preventDefault();
    }

    return (
        <main className="main-content-wrapper">
            <SiteTitle title="Add New Category" />

            {/* container */}
            <div className="container">
                <ToastContainer />
                {/* row */}
                <div className="row ">
                    <div className="col-md-12">
                        <div className="d-md-flex justify-content-between align-items-center">
                            {/* page header */}
                            <div>
                                <h2>Add New Category</h2>

                                {/* breacrumb */}
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Categories / Add New Category</li>
                                </ol>
                            </div>
                            <div>
                            <Link to="/category" className="btn btn-primary">Back</Link>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={saveCategory}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Category Name</label>
                                        <input type="text" className="form-control" id="title" name="title" placeholder="Category Name" required value={title} onChange={(t) => setTitle(t.target.value)} />
                                    </div>
                                    
                                   
                                    <div className="mb-3">
                                        <label htmlFor="photo" className="form-label">Photo</label>
                                        <input className="form-control" type="file" id="photo" name="photo" required onChange={(p) => setPhoto(p.target.files[0])} />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">Add New Category</button>
                                        <button type="reset" className="btn btn-dark ms-1" onClick={() => {
                                            setTitle("");
                                        }}>Clear All</button>
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