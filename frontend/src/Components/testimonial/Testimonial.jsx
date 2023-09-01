import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonial.css";
import { Avatar, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronLeftIcon style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};

const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronRightIcon style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <div className="testimonials">
        <div className="testimonial">
          <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
            <Card
              img="https://images.pexels.com/photos/3126593/pexels-photo-3126593.jpeg?auto=compress&cs=tinysrgb&w=600"
              rating={5}
              name="Sanjana Kumari"
              review="The hostel was fantastic! The staff was incredibly friendly and helpful, the rooms were clean and comfortable, and the atmosphere was so lively and fun. I had an amazing time and would definitely stay here again."
            />
            <Card
              img="https://images.pexels.com/photos/1580272/pexels-photo-1580272.jpeg?auto=compress&cs=tinysrgb&w=600"
              rating={4}
              name="Vaishnavi Singh"
              review="I had a great experience staying at this hostel. The location is perfect, and the rooms are spacious and well-maintained. The staff was attentive and friendly, and I would highly recommend this place to anyone visiting the area."
            />
            <Card
              img="https://images.pexels.com/photos/1530623/pexels-photo-1530623.jpeg?auto=compress&cs=tinysrgb&w=600"
              rating={3}
              name="Rohit Kumar Mahto"
              review="The hostel was okay. The rooms were clean, but the facilities were somewhat lacking. The staff was helpful, but the overall experience was not as good as I expected. I might consider other options for my next stay."
            />
          </Slider>
        </div>
      </div>
    </div>
  );
};

const Card = ({ img, rating, name, review }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="star">
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="card">
      <div className="card-content" style={{ paddingLeft: "10px" }}>
        <Avatar
          imgProps={{ style: { borderRadius: "50%" } }}
          src={img}
          style={{
            width: 120,
            height: 120,
            border: "1px solid lightgray",
            padding: 7,
            marginRight: 20,
          }}
        />
        <div className="review-text" style={{ marginLeft: "10px", paddingRight: "10px" }}>
          <Typography variant="subtitle1" component="p" style={{ fontWeight: 500, color: "green", paddingBottom: "10px" }}>
            {name}
          </Typography>
          <div className="rating" style={{ fontWeight: 500, paddingBottom: "20px" }}>{renderStars()}</div>
          <Typography variant="body1" component="p" style={{ paddingBottom: "20px" }}>
            {review}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

