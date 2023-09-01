import React from 'react';
import './HotelBrand.css';
import Stat from '../Stat/Stat';

const HotelBrands = () => {
  return (
    <section className="hotel-brands">
      <div className="service-container">
        <div className='container'>
          <h2 className="hotel-title brandHeader">Our Brands</h2>

          <div className="brands">
            {/* Brand Cards */}
            <div className="brand-card">
              <div className="brand-image">
                <img src="https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/Budget-Hotels-in-Mauritius.jpg" alt="Brand 1" />
              </div>
              <div className="brand-content">
                <h3>Comfortable, economical hotels</h3>
                <p>Top reviewed hotels</p>
                <p>Centrally located</p>
                <p>Free Wi-Fi</p>
              </div>
            </div>

            <div className="brand-card">
              <div className="brand-image">
                <img src="https://en-ingles.com.ar/blog/wp-content/uploads/2017/09/GettyImages-500292184-768x512.jpg" alt="Brand 2" />
              </div>
              <div className="brand-content">
                <h3>Basics for travellers on a budget</h3>
                <p>Super low prices</p>
                <p>Compact, hygienic rooms</p>
                <p>Free Wi-Fi</p>
              </div>
            </div>

            <div className="brand-card">
              <div className="brand-image">
                <img src="https://img.freepik.com/premium-photo/quality-assurance-business-services-businessman-hand-shows-sign-top-service-quality-assurance-black-background-guarantee-standards-iso-certification-standardization-concept_162459-2370.jpg?w=1380" alt="Brand 3" />
              </div>
              <div className="brand-content">
                <h3>Premium amenities, top quality service</h3>
                <p>Contemporary, rich interiors</p>
                <p>Well-equipped rooms</p>
                <p>Courteous, highly trained staff</p>
              </div>
            </div>


          </div>
        </div>
      </div>
      <div className='statistic'>
        <Stat />
      </div>
      <hr />
    </section>
  );
};

export default HotelBrands;
