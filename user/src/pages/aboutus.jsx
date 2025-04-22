import SiteTitle from "./sitetitle";

export default function AboutUs() {
    return (
        <>
            <div>
                <SiteTitle title='About Us' />
                <section className="container my-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 fs-5">
                            <h2 className="fw-bold text-primary">About Us</h2>
                            <p className="text-muted">
                                Welcome to <strong>QuikBook</strong>, your one-stop destination for seasonal products and festive sweets! We bring you the best items for every celebration, ensuring your festivals are filled with joy and traditions.
                            </p>
                            <p>
                                From dazzling <strong>firecrackers for Diwali</strong> to <strong>colorful kites for Uttarayan</strong>, from <strong>Holi colors</strong> to <strong>Christmas decorations</strong>—we have everything you need to make your celebrations memorable.
                            </p>
                        </div>
                        <div className="col-lg-3">
                            <img src="/images/Diwali-sweets-min.jpg" className="img-fluid rounded" style={{ width: "300px", height: "200px", objectFit: "cover" }}
                                alt="Festive Products" />
                        </div>
                        <div className="col-lg-3">
                            <img src="/images/Christmas_Gift_Hamper.png" className="img-fluid rounded" style={{ width: "300px", height: "200px", objectFit: "cover" }}
                                alt="Festive Products" />
                        </div>
                    </div>
                </section>
                <section className="container my-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-4 border rounded shadow-sm">
                                <h3 className="text-success"> Seasonal Products</h3>
                                <ul className="list-unstyled">
                                    <li>Firecrackers for Diwali</li>
                                    <li>Kites &amp; Manja for Uttarayan</li>
                                    <li>Holi Colors &amp; Pichkaris</li>
                                    <li>Christmas Decorations</li>
                                    <li>Navratri &amp; Garba Accessories</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4 border rounded shadow-sm">
                                <h3 className="text-warning"> Festive Sweets</h3>
                                <ul className="list-unstyled">
                                    <li>Laddu &amp; Kaju Katli for Diwali</li>
                                    <li>Gajak &amp; Til Chikki for Makar Sankranti</li>
                                    <li>Gujiya &amp; Thandai for Holi</li>
                                    <li>Modaks for Ganesh Chaturthi</li>
                                    <li>Special Milk Sweets for Eid</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container my-5 text-center">
                    <h3 className="fw-bold text-danger">Contact Us &amp; Celebrate Every Season!</h3>
                    <p className="text-muted">We bring joy, colors, and sweetness to every festival.</p>
                    <p className="fw-bold">  Contact: <a href="tel:+911234567890" classname="text-danger text-decoration-none">+91 1234567890</a></p>
                </section>
            </div>
        </>
    )
}