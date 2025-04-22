import React, { Component } from "react";
import { showError, showMessage, showNetworkError } from "./message";
import WithHook from "./hoc";
import axios from 'axios';
import SiteTitle from "./sitetitle";
import { ToastContainer } from "react-toastify";
// import 

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: "",
      quantity: 1,
      productdetail: [],
      title: "",
    };
  }

  handleImageSelect = (img) => {
    this.setState({ selectedImage: img });
  };

  addtoCart = () => {
    if (this.props.cookies['userid'] !== undefined) {
      let temp = 0;
      temp++;
      let userid = this.props.cookies['userid'];
      const { id } = this.props.params;


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
      showError("Plz Login")
      setTimeout(() => {
        this.props.navigate("/login");
      }, 1500)
    }
  };



  componentDidMount() {
    const { id } = this.props.params;
    const api = `http://localhost:5000/products?id=${id}`;


    axios({
      url: api,
      method: "get",
      responseType: "json",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data)
        let error = response.data[0]["error"];
        let total = response.data[1]["total"];
        if (error === "no") {
          if (total === 0) {
            alert("No product detail found");
          } else {
            response.data.splice(0, 2);
            const product = response.data[0];

            const baseImagePath = "http://127.0.0.1:5000/api/images/products/";
            const imageList = product.photo
              ? [`${baseImagePath}${product.photo.trim()}`]
              : [];

            this.setState({
              productdetail: [product],
              title: product.name,
              images: imageList,
              selectedImage: imageList[0] || "",
            });
          }
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        alert("Network error");
      });
  }

  render() {
    const { images, selectedImage, productdetail } = this.state;

    return (
      <>
        <section className="mt-8">
          <div className="container">
            <SiteTitle title={this.state.title} />
            <ToastContainer />
            <div className="row">
              <div className="col-md-5 col-xl-6">
                <div className="product">
                  <div
                    className="zoom"
                    style={{ backgroundImage: `url(${selectedImage})` }}
                  >
                    <img
                      src={selectedImage}
                      alt="Selected Product"
                      className="img-fluid"
                    />
                  </div>
                  <div className="product-tools">
                    <div className="thumbnails row g-3">
                      {images.map((img, index) => (
                        <div key={index} className="col-3">
                          <img
                            src={img}
                            alt={this.state.title}
                            className={`thumbnails-img ${selectedImage === img
                              ? "border border-success"
                              : ""
                              }`}
                            onClick={() => this.handleImageSelect(img)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-7 col-xl-6">
                {productdetail.map((item, index) => (
                  <div key={index} className="ps-lg-10 mt-6 mt-md-0">
                    <a
                      href="#"
                      className="mb-4 d-block text-success"
                    >
                      {item.category_name}
                    </a>
                    <h1 className="mb-1">{item.name}</h1>

                    <div className="fs-4">
                      <span className="fw-bold text-dark">
                        ₹ {item.price}
                      </span>
                    </div>
                    <hr className="my-6" />

                    <div className="mt-3 d-flex align-items-center">
                      <button
                        onClick={this.addtoCart}
                        className="btn btn-primary me-3"
                      >
                        Add to cart
                      </button>
                    </div>
                    <hr className="my-6" />
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>Weight:</td>
                          <td>{item.weight}</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>{item.category_name}</td>
                        </tr>
                        
                      </tbody>
                    </table>
                    <div className="my-8 border-top">
                      <div className="mb-5 mt-4">
                        <h4 className="mb-2">Description</h4>
                        {productdetail.map((item, index) => (
                          <p key={index} className="mb-0 ms-2">
                            {item.description}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        
      </>
    );
  }
}

export default WithHook(SingleProduct);
