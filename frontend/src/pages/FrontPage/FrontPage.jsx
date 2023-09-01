import React, { useEffect } from 'react';
import './FrontPage.css';

import SearchBar from '../../Components/searchbar/SearchBar';
import Featured from '../../Components/featured/Featured';
import FeaturedDabbawalas from '../../Components/featuredDabbawalas/FeaturedDabbawalas';
import HotelBrands from '../HotelBrand/HotelBrand';

const FrontPage = () => {
  return (
    <>
      <div className="hero-container">
        <div>
          <h1>Dabbawala Delights <br/> Taste Meets Tradition</h1>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
        <p className="description">Savor the Enchanting Magic of Dabbawala Deliveries. Embark on Your Culinary Journey!</p>
        </div>
      </div>
      <h2 className='hotel-title'>Quick Dabbawala Search</h2>
      <Featured />
      {/* <h2 className='hotel-title'>Top Dabbawalas</h2>
      <FeaturedDabbawalas /> */}
      {/* <HotelBrands /> */}
      {/* <h2 className='hotel-title'>Reviews</h2>
      <Testimonial /> */}
    </>
  );
};

export default FrontPage;