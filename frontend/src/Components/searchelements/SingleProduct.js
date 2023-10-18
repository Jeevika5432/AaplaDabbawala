import React, { useState, useEffect } from "react";
import data from "../../db.json";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState({});
  const { name } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    const findProduct = () => {
      const newProduct = data.products.find((product) => product.name === name);
      setSingleProduct(newProduct);
    };

    findProduct();
  }, [name]);

  const formatDesc = (desc) => {
    return desc.split("\n").map((line, index) => (
      <p key={index} className="text-slate-300 mb-2">
        {line}
      </p>
    ));
  };

  return (
    <>
      <section className="xl:max-w-6xl xl:mx-auto py-10 lg:py-20 p-5">
        <img src={singleProduct.large} alt={name} className="mt-5"/>
        <h1 className="text-4xl my-5 lg:mb-10 text-white font-bold md:text-5xl lg:text-6xl">
          {name}
        </h1>
        <p className="text-slate-100 mb-2">
          <strong>Menu:</strong>
        </p>
        {singleProduct.desc && formatDesc(singleProduct.desc)}

        <div className="mt-3">
          <p className="text-slate-100 text-white font">
            <strong>Location:</strong> {singleProduct.location}
          </p>
          <p className="text-slate-100 text-white font">
            <strong>Pricing:</strong> {singleProduct.Pricing}
          </p>
        </div>

        <ul className="flex items-center mt-10">
          <li className="mr-5">
          <button
  className="bg-white text-slate-800 py-2 px-4"
  onClick={() => navigate("/payment-form")} // Replace with the correct path
>
  Payment
</button>
          </li>
          <li>
            <Link to="/fetch-products" className="text-slate-200 hover:text-white">
              &larr; Back
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
