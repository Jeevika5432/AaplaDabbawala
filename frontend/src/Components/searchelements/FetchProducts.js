import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom StarRating component
function StarRating({ rating }) {
  const starRating = rating ? `${rating}` : "4.3/5";

  const starRatingStyle = {
    fontSize: "1.3rem", // Adjust the font size as needed
  };

  return (
    <div className="flex items-center">
      <div className="rating-box">
        <span className="rating-text text-white" style={starRatingStyle}>
          {starRating} <i className="fas fa-star text-yellow-500"></i>
        </span>
      </div>
    </div>
  );
}

export default function FetchProducts() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { state } = location;

  const filterCriteria = JSON.parse(localStorage.getItem('searchData'));

  // Fetch items based on filter criteria (veg/non-veg/jain)
  useEffect(() => {
    itemFunction();
  }, []);


  const itemFunction = async () => {
    // Define your filter criteria based on selected options (e.g., state.category)
    const filterCriteria1 = {
      category: filterCriteria.category,
      location: filterCriteria.destination
    };

    console.log(filterCriteria1)

    try {
      const response = await axios.post("http://localhost:8800/api/dabbawala/all", filterCriteria1);

      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="px-5 py-10 lg:py-20 xl:max-w-6xl xl:mx-auto grid grid-cols-1 gap-5 lg:gap-10 xl:gap-20">
        {items.map((item) => (
          <article
            key={item._id}
            className={`grid grid-cols-1 gap-1 md:grid-cols-2 md:place-items-center lg:gap-10 xl:gap-20 card-container shadow-md p-4 bg-black bg-opacity-50 rounded-lg ${item.desc ? "mb-5" : ""}`}
          >
            <div>
              <picture>
                <source media="(min-width: 1200px)" srcSet={item.profilePicture} />
                <img src={item.profilePicture} alt={item.name} style={{ width: "1200px", height: "auto" }} />
                {/* Adjust the width and height values to increase the image size */}
              </picture>
            </div>

            <div>
              <h2 className="font-bold text-4xl mb-5 text-white">{item.name}</h2>
              <p className="text-slate-100 mb-2">
                <strong>Menu:</strong>
              </p>
              <p
                className="text-slate-300 mb-5">
                {item[filterCriteria.category].menu}
              </p>
              <p className="text-slate-300 mb-2">
                <strong>Locations:</strong> {item.locations.join(", ")}
              </p>
              <p className="text-slate-300 mb-10">
                <strong>Pricing:</strong> {item[filterCriteria.category].price}
              </p>
              <div className="flex items-center justify-between">
                <Link to={`/fetch-products/${item._id}`} className="border-2 border-white black py-2 px-4 text-white">
                  More Details
                </Link>
                <StarRating rating={item.rating} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
