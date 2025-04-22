import SiteTitle from "./sitetitle";

export default function Contact() {
    return (

        <section className="my-lg-14 my-8">
            <SiteTitle title='Contact Us' />
            {/* container */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    {/* Contact Form */}
                    <div className="col-lg-6 col-md-8 col-12">
                        <h2 className="fw-bold text-center mb-4">Contact Us</h2>
                        <p className="text-center text-muted">
                            We’d love to hear from you! Reach out for any queries related to our seasonal products.
                        </p>

                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="number" className="form-control" placeholder="Enter your phone number" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea className="form-control" rows="4" placeholder="Write your message here..." required></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </div>
                        </form>
                        <div className="text-center mt-5">
                            <p><strong>Call Us:</strong> <a href="tel:+911234567890" className="text-decoration-none">+91 12345 67890</a></p>
                            <p><strong>Email:</strong> <a href="mailto:quikbook@gmail.com" className="text-decoration-none">quikbook@gmail.com</a></p>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="col-lg-6 col-md-8 col-12 mt-5 mt-lg-0">
                        <h4 className="text-center mb-3">Our Location</h4>
                        <div className="rounded shadow overflow-hidden">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118572.25993212717!2d72.07992048338404!3d21.765428377710254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f5081abb84e2f%3A0xf676d64c6e13716c!2sBhavnagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1742856409422!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}