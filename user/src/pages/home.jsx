import React, { Component } from "react";
import SiteTitle from "./sitetitle";
import axios from 'axios';
import { Link, Links } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import WithHook from "./hoc";
import { showError, showMessage } from "./message";
import { ToastContainer } from "react-toastify";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: []
    };
  }

  componentDidMount() {
    const { category } = this.state;

    if (category.length === 0) {
      let api = "http://localhost:5000/category";

      axios({
        url: api,
        method: 'get',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        let e = response.data[0]['error'];
        if (e === 'no') {
          let total = response.data[1]['total'];
          if (total === 0) {
            alert("No category found. Please add category");
          } else {
            response.data.splice(0, 2);
            this.setState({ category: response.data });
          }
        }
      }).catch((e) => {
        alert(e);
      });
    }
    this.fetchProducts();
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
      alert("Plz Login")
      setTimeout(() => {
        this.props.navigate("/login");
      }, 2000)
    }

  };
  fetchProducts() {
    let api = "http://localhost:5000/products";
    console.log("Fetching products from: ", api);

    axios({
      url: api,
      method: 'get',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Check for error and handle the data
      console.log(response.data);
      let e = response.data[0]['error'];
      if (e === 'no') {
        let total = response.data[1]['total'];
        if (total === 0) {
          showError("No products found.");
        } else {
          // Remove metadata or unwanted data
          response.data.splice(0, 2);

          // Group products by category
          const productsByCategory = response.data.reduce((acc, product) => {
            if (!acc[product.category_name]) {
              acc[product.category_name] = [];
            }
            acc[product.category_name].push(product);
            return acc;
          }, {});

          // Now select 2 products from each category
          const selectedProducts = [];
          for (let category in productsByCategory) {
            const categoryProducts = productsByCategory[category];
            const twoProducts = categoryProducts.slice(0, 2); // Fetching first 2 products
            selectedProducts.push(...twoProducts);
          }

          // Update the state with selected products
          this.setState({ products: selectedProducts });
        }
      }
    }).catch((error) => {
      alert(error);
    });
  }

  products() {

    const { products } = this.state;
    return products.map((product, index) => (
      <SwiperSlide key={index}>
        <div className="card card-product h-100 mb-4">
          <div className="card-body position-relative">
            <div className="text-center position-relative">

              <Link to={"/productdetails/" + product.id}>
                <img
                  src={'http://127.0.0.1:5000/api/images/products/' + product.photo}
                  alt={product.name}
                  className=" img-fluid"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              </Link>

            </div>
            <h2 className="h5 mt-4">
              <Link to={"/productdetails/" + product.id} className="text-inherit text-decoration-none">{product.name}</Link>
            </h2>
            <div>

              <span className="text-muted small">{product.category_name}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="text-black ">&#8377; {product.price}</span>
                {/* <span className="text-decoration-line-through text-muted">${product.price + 6}</span> */}
              </div>

            </div>
            <div className="d-grid mt-4">
              <button onClick={() => this.addtoCart(product.id)} className="btn btn-primary rounded-pill">Add to Cart</button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
    ;
  }

  render() {
    const { category } = this.state;

    return (
      <>
        <SiteTitle title={"Order Online – Pick Up In Store"} />
        <ToastContainer />
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div className="carousel-inner">
            {/* First Slide */}
            <div className="carousel-item active position-relative">
              <img src="../images/holi-sale.png" className="d-block w-100 img-fluid" alt="Holi Sale" style={{ "max-height": "600px", "object-fit": "cover", "border-radius": "0.5rem" }} />
              <div className="position-absolute translate-middle-x text-center" style={{ "bottom": "16%", "left": "40%" }}></div>
            </div>

            {/* Second Slide */}
            <div className="carousel-item position-relative">
              <img src="../images/summer.png" className="d-block w-100 img-fluid" alt="Summer Sale" style={{ "max-height": "600px", "object-fit": "cover", "border-radius": "0.5rem" }} />
              <div className="position-absolute translate-middle-x text-center" style={{ "bottom": "16%", "left": "40%" }}></div>
            </div>
          </div>

          {/* Carousel Controls Inside Slides */}
          <button className="carousel-control-prev position-absolute" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{ "top": "50%", "left": "1%", "transform": "translateY(-50%)" }}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next position-absolute" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{ "top": "50%", "right": "1%", "transform": "translateY(-50%)" }}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Category */}
        <div>
          <section className="my-lg-14 my-7">
            <div className="container">
              {/* Header Row */}
              <div className="row align-items-center mb-4">
                <div className="col-md-10 col-8">
                  <h3 className="d-flex align-items-center h4">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers text-primary me-2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <span>Shop by Categories</span>
                  </h3>
                </div>
              </div>

              {/* Multi-Item Carousel */}
              <div id="multiItemCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {category.length > 0 && [...Array(Math.ceil(category.length / 3))].map((_, slideIndex) => (
                    <div className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`} key={slideIndex}>
                      <div className="row">
                        {category.slice(slideIndex * 3, slideIndex * 3 + 3).map((cat, index) => (
                          <div key={index} className="col-lg-4 col-md-6 col-12 mb-3">
                            <div className="card border-0 shadow">
                              <Link to={"/productcategory/" + cat.id}>
                                <img
                                  src={cat.image_url || 'http://127.0.0.1:5000/api/images/category/' + cat.images}
                                  className="card-img-top img-fluid"
                                  style={{ height: "200px", objectFit: "cover" }}
                                  alt={cat.name}
                                />
                              </Link>
                              <div className="card-body text-center">
                                <Link to={"/productcategory/" + cat.id} className="card-title h5">{cat.name}</Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </section>
        </div>


        {/* products */}
        <section className="mb-lg-14 my-8">
          <div className="container">

            {/* row */}
            <div className="row align-items-center mb-6">
              <div className="col-lg-10 col-9">
                <div className="d-xl-flex justify-content-between align-items-center">
                  {/* heading */}
                  <div className="d-flex">
                    <div className="mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag text-primary">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1={3} y1={6} x2={21} y2={6} />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-0 text-primary">Featured Products</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Carousel */}
            <div className="d-flex">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {this.products()}
              </Swiper>
            </div>
          </div>
        </section>

        {/* services */}
        <section className="my-lg-14 my-8">
          <div className="container">
            <div className="row align-items-center mb-6">
              <div className="col-lg-10 col-9">
                <div className="d-xl-flex justify-content-between align-items-center">
                  {/* heading */}
                  <div className="d-flex">
                    <div className="mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers text-primary me-2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-0 text-primary">Services</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-center">
              {/* Service 1 */}
              <div className="col-lg-4 col-md-6 mb-6">
                <div className="card h-100 p-4 shadow rounded-4 border-0">
                  <div className="mb-4 text-primary fs-1">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <h5 className="mb-2">Wide Product Selection</h5>

                </div>
              </div>

              {/* Service 2 */}
              <div className="col-lg-4 col-md-6 mb-6">
                <div className="card h-100 p-4 shadow rounded-4 border-0">
                  <div className="mb-4 text-primary fs-1">
                    <i className="bi bi-receipt"></i>
                  </div>
                  <h5 className="mb-2">Easy Order Booking</h5>

                </div>
              </div>

              {/* Service 3 */}
              <div className="col-lg-4 col-md-6 mb-6">
                <div className="card h-100 p-4 shadow rounded-4 border-0">
                  <div className="mb-4 text-primary fs-1">
                    <i className="bi bi-hash"></i>
                  </div>
                  <h5 className="mb-2">Instant Order ID</h5>

                </div>
              </div>

              {/* Service 4 */}
              <div className="col-lg-4 col-md-6 mb-6">
                <div className="card h-100 p-4 shadow rounded-4 border-0">
                  <div className="mb-4 text-primary fs-1">
                    <i className="bi bi-building"></i>
                  </div>
                  <h5 className="mb-2">In-Store Pickup</h5>

                </div>
              </div>

              {/* Service 5 */}
              <div className="col-lg-4 col-md-6 mb-6">
                <div className="card h-100 p-4 shadow rounded-4 border-0">
                  <div className="mb-4 text-primary fs-1">
                    <i className="bi bi-currency-rupee"></i>
                  </div>
                  <h5 className="mb-2">Pay at Pickup</h5>

                </div>
              </div>

              {/* Service 6 */}
              <div className="col-lg-4 col-md-6 mb-6">
                <div className="card h-100 p-4 shadow rounded-4 border-0">
                  <div className="mb-4 text-primary fs-1">
                    <i className="bi bi-telephone-forward"></i>
                  </div>
                  <h5 className="mb-2">Dedicated Support</h5>

                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    );
  }
}

export default WithHook(Home);
