import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faUtensils, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("any");
  const [frequency, setFrequency] = useState("oneTime");

  const navigate = useNavigate();

  const handleInput = () => {
    if (destination === "") {
      alert("Please enter a destination.");
    } else {
      handleSearch();
    }
  };

  const handleSearch = () => {
    localStorage.setItem('searchData', JSON.stringify({
      destination: destination,
      category: category,
      frequency: frequency
    }));
    navigate("/fetch-products", {
      state: { destination, category, frequency },
    });
  };

  return (
    <div className="searchbarContainer">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faHotel} className="headerIcon" />
          <input
            type="text"
            placeholder="What is your location?"
            className="headerSearchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faUtensils} className="headerIcon" /> {/* Added food icon */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="categoryDropdown"
          >
            <option value="any">Any</option>
            <option value="veg">Veg</option>
            <option value="nonVeg">Non-Veg</option>
            <option value="jain">Jain</option>
          </select>
        </div>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="frequencyDropdown"
          >
            <option value="monthly">Monthly Subscriptions</option>
            <option value="oneTime">One-Time Order</option>
          </select>
        </div>
        <div className="headerSearchItem but">
          <button className="headerBtn" onClick={handleInput}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
