import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Featured.css";
import IMG1 from "../../images/dabbawala1.jpeg"
import IMG2 from "../../images/dabbawala2.jpeg"
import IMG3 from "../../images/dabbawala3.jpeg"
import IMG4 from "../../images/dabbawala4.jpeg"
import IMG5 from "../../images/dabbawala5.jpeg"

const Featured = () => {

  const data = [
    {
      "location": "Vile Parle",
      "dabbawala": 19,
      "images": IMG1
    },
    {
      "location": "Thane",
      "dabbawala": 17,
      "images": IMG2
    },
    {
      "location": "Matunga",
      "dabbawala": 7,
      "images": IMG3
    },
    {
      "location": "Bandra",
      "dabbawala": 11,
      "images": IMG4
    },
    {
      "location": "Belapur",
      "dabbawala": 23,
      "images": IMG5
    }
  ];

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const slider = useRef(null);

  const handleClick = (location) => {
    setDestination(location);
    navigate(`/hotels-in/${location}`, { state: { destination: location, dates, options } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <Slider {...settings} className="featured-slider" ref={slider}>
        {data.map((item, index) => (
          <div className="featuredItem" key={index} onClick={() => handleClick(item.location)}>
            <img src={item.images} alt={`Featured ${item.location}`} className="featuredImg" />
            <div className="featureTitles">
              <h1>{item.location}</h1>
              <h2>{item.dabbawala} Dabbawalas</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Featured;
