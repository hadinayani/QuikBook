import { Link, useParams } from "react-router";
import Menu from "./menu";
import SiteTitle from "./siteTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { showError, showNetworkError, showMessage } from "./message";
import { ToastContainer } from "react-toastify";
import VerifyLogin from "./verifylogin";

export default function EditCategory() {

    VerifyLogin();
    let { id } = useParams();

    let [title, setTitle] = useState("");
    let [photo, setPhoto] = useState(''); // store old photo
    let [nphoto, setnPhoto] = useState("");
    let [isFetch, setIsfetch] = useState(false);
    let navigate = useNavigate();

    let updateCategoty = function (e) {

        e.preventDefault();

        let api = "http://localhost:5000/category";

        let formData = new FormData();

        formData.append("name", title);
        formData.append("images",nphoto);
        formData.append("id", id);

        axios({
            url: api,
            method: 'put',
            responseType: 'json',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then((response) => {
            console.log(response.data)
            let error = response.data[0]['error'];

            if (error === 'yes') {
                showError(error)
            }
            else {
                showMessage(response.data[2]['message']);

                setTimeout(() => {
                    navigate('/category');
                }, 3000);
            }
        }).catch((error) => showNetworkError(error));
    }

    useEffect(() => {
        if (isFetch === false) {
            let api = "http://localhost:5000/category?id=" + id;

            axios({
                url: api,
                responseType: "json",
                method: "get",
            }).then((response) => {
                console.log(response.data);
                let error = response.data[0]['error'];
                let total = response.data[1]['total'];

                if (error === "yes") {
                    showError(error);
                }
                else {

                    if (total === 0) {
                        showError("No Category Found");
                    }
                    else {
                        setTitle(response.data[2]['name']);
                        setPhoto(response.data[2]['images']);
                        setIsfetch(true);
                    }
                }
            }).catch((error) => showNetworkError(error))
        }
    })

    return (
        <main className="main-content-wrapper">
            <SiteTitle title={title} />
            <div className="container">


                <div className="row ">
                    <div className="col-md-12">
                        <div className="d-md-flex justify-content-between align-items-center">
                            <ToastContainer />
                            <div>
                                <h2>Edit Category</h2>

                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Categories / Edit  Category</li>
                                </ol>
                            </div>
                            <div>
                                <Link to="/category" className="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <span>Existing Photo</span>
                        <img src={'http://127.0.0.1:5000/api/images/category/' + photo}alt= {title} style={{ "maxWidth": "160px" }} />
                    </div>
                    <div className="col-10">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={updateCategoty}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Category Name</label>
                                        <input type="text" className="form-control" id="title" name="title" placeholder="Category Name" required value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="photo" className="form-label">Photo</label>
                                        <input className="form-control" type="file" id="photo" name="photo" required onChange={(n) => setnPhoto(n.target.files[0])} />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                        <button type="reset" className="btn btn-light text-black ms-1" onClick={() => {
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
