import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const ProductCarousel = () => {
    return (
        <div id="multiItemCarousel" className="carousel slide position-relative" data-bs-ride="carousel">
            <div className="carousel-inner">
                {/* First Slide */}
                <div className="carousel-item active">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 1" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product 1</h5>
                                    <p className="card-text">$100</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 2" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product 2</h5>
                                    <p className="card-text">$120</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 3" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product 3</h5>
                                    <p className="card-text">$90</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Slide */}
                <div className="carousel-item">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 4" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product 4</h5>
                                    <p className="card-text">$110</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 5" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product 5</h5>
                                    <p className="card-text">$130</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product 6" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product 6</h5>
                                    <p className="card-text">$140</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Previous Button */}
            <button className="carousel-control-prev" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon">
                    <FaChevronLeft size={1} color="white" />
                </span>
            </button>

            {/* Next Button */}
            <button className="carousel-control-next" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon">
                    <FaChevronRight size={1} color="white" />
                </span>
            </button>
        </div>
    );
};

export default ProductCarousel;
