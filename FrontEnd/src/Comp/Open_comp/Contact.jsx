import React from "react";
import "./Contact.css"

const Contact = () => {
  return (
    <>
      {/* Title Section */}
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: "url('/images/bg-01.jpg')" }}
      >
        <h2 className="ltext-105 cl0 txt-center">Contact KiteAsm</h2>
      </section>

      {/* Contact Content */}
      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          <div className="flex-w flex-tr">

            {/* Contact Form */}
            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Send Us A Message
                </h4>

                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="email"
                    placeholder="Your Email Address"
                    required
                  />
                  <img
                    className="how-pos4 pointer-none"
                    src="/images/icons/icon-email.png"
                    alt="Email Icon"
                  />
                </div>

                <div className="bor8 m-b-30">
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">

              {/* Address */}
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Address</span>
                  <p className="stext-115 cl6 size-213 p-t-18">
                    New Delhi, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Let’s Talk</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    +91 93150 14029
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex-w w-full">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-envelope"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Support</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    support@kiteasm.com
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Google Map (iframe – React safe) */}
      <div className="map-container">
        <div className="map">
          <iframe
            title="KiteAsm Location"
            src="https://www.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
