import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './singlefetch.css'
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

// Custom StarRating component
function StarRating({ rating }) {
  const starRating = rating ? `${rating}` : "4.3/5";

  const starRatingStyle = {
    fontSize: "1.3rem",
    color: "yellow",
  };

  return (
    <span style={starRatingStyle}>&#9733; {starRating}</span>
  );
}

export default function SingleProduct() {
  const { isLoggedIn, userr, checkUserLoggedIn, handleLogout } = useContext(UserContext);
  const [singleProduct, setSingleProduct] = useState({});
  const { userId } = useParams();
  const filterCriteria = JSON.parse(localStorage.getItem('searchData'));

  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const fetchDabba = async () => {
    try {
      const response = await axios.post(`http://localhost:8800/api/dabbawala/find/${userId}`);
      setSingleProduct(response.data);
      setComments(response.data.reviews);
      localStorage.setItem('currProduct', JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDabba();
  }, []);

  const addComment = async (commentText, rating) => {
    try {
      const formData = {
        userId: userId,
        userName: userr.name,
        content: commentText,
        rating: rating,
      };

      const response = await axios.post(`http://localhost:8800/api/dabbawala/addreview`, formData);

      if (response.status === 200) {
        fetchDabba();
        setComment("");
        setUserRating(0);
      } else {
        console.error("Error adding review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const deleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const displayRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
      }
    }
    return stars;
  };

  if (!singleProduct || !singleProduct[filterCriteria.category]) {
    return <div>Loading...</div>;
  }

  return (
    <section className="xl:max-w-6xl xl:mx-auto py-10 lg:py-20 p-5">
      <div className="card-container shadow-md p-4 rounded-lg custom-shadow">
        <img src={singleProduct.profilePicture} alt={singleProduct.name} className="w-50% h-auto pt-4 mx-auto" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-4 lg:mb-8 px-10 hii ">{singleProduct.name}</h1>
            <p className="text-slate-100 text-white px-10">
              <strong className="hii" style={{ fontSize: "1.2rem" }}>Food Name:{singleProduct[filterCriteria.category].name}</strong> 
            </p>
            <p className="text-slate-100 px-10">
              <strong className="hii" style={{ fontSize: "1.2rem" }}>Menu:</strong>
            </p>
            {singleProduct[filterCriteria.category].menu &&
              singleProduct[filterCriteria.category].menu.split("\n").map((line, index) => (
                <p key={index} className="text-slate-300  px-10 hii" style={{ fontSize: "1.2rem" }}>
                  {line}
                </p>
              ))}
            <div className="mt-0">
              <p className="text-slate-100 text-white font px-10">
                <strong className="hii" style={{ fontSize: "1.2rem" }}>Location: {singleProduct.locations.join(", ")}</strong>
              </p>
              <p className="text-slate-100 text-white font px-10">
                <strong className="hii" style={{ fontSize: "1.2rem" }}>Pricing: {singleProduct[filterCriteria.category].price}</strong>
              </p>
              <p className="text-slate-100 text-white font mb-2 px-10">
                <strong className="hii" style={{ fontSize: "1.2rem" }}>Rating: <StarRating rating={singleProduct.rating} /></strong>
              </p>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <h2 className="text-lg lg:text-xl text-white">Add a Comment</h2>
              <div className="mb-2">{displayRating(userRating)}</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(comment, userRating);
                }}
              >
                <textarea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here"
                  className="w-full rounded-lg p-2 bg-slate-200 text-slate-800"
                ></textarea>
                <div className="mb-2">
                  <label htmlFor="rating" className="text-white">
                    Rate this:{" "}
                  </label>
                  <input
                    type="number"
                    id="rating"
                    min="1"
                    max="5"
                    value={userRating}
                    onChange={(e) => setUserRating(e.target.value)}
                    className="w-12 h-8 text-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Add Comment
                </button>
              </form>
            </div>
            <h2 className="text-lg lg:text-xl text-white mt-4">Comments</h2>
            <ul>
              {comments ? comments.map((review, index) => (
                <li key={index} className="text-slate-300 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>{review.userName}{" : "}</strong>
                      {review.content}{" "}
                      <br/>
                      <span>
                        Rating: {displayRating(review.rating)}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteComment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &#10006;
                    </button>
                  </div>
                  <br/>
                </li>
              )) : <p>No reviews yet for this dabbawala</p>}
            </ul>
          </div>
        </div>
        <div className="text-center my-5">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={() => navigate("/payment-form", {
              state: { userId, frequency: filterCriteria.frequency, prices: singleProduct[filterCriteria.category].price, foodName: singleProduct[filterCriteria.category].name }
            })}
          >
            Payment
          </button>
        </div>
        <ul className="flex items-center justify-end mt-5">
          <li>
            <Link to="/fetch-products" className="text-slate-200 hover:text-white">
              &larr; Back
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
