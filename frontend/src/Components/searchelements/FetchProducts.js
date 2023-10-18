import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../../db.json";
import { useNavigate } from "react-router-dom";

export default function FetchProducts() {
  const [items] = useState(data);
  const navigate = useNavigate();


  return (
    <>
      <section className="px-5 py-10 lg:py-20 xl:max-w-6xl xl:mx-auto grid grid-cols-1 gap-5 lg:gap-10 xl:gap-20">
        {items.products.map(({ id, name, desc, location, Pricing, small, large }, index) => (
          <article
            key={id}
            className={`grid grid-cols-1 gap-1 md:grid-cols-2 md:place-items-center lg:gap-10 xl:gap-20 ${
              desc ? "mb-5" : ""
            }`}
          >
            <div>
              <picture>
                <source media="(min-width: 768px)" srcSet={large} />
                <img src={small} alt={name} />
              </picture>
            </div>

            <div>
              <h2 className="font-bold text-4xl mb-5 text-white">{name}</h2>
              <p className="text-slate-100 mb-2">
                <strong>Menu:</strong> 
              </p>
              {desc && (
                <p className="text-slate-300 mb-5  " dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, "<br>") }} />
              )}
              <p className="text-slate-300 mb-2">
                <strong>Location:</strong> {location}
              </p>
              <p className="text-slate-300 mb-10">
                <strong>Pricing:</strong> {Pricing}
              </p>
              <ul className="flex items-center justify-between">
                <li>
                  <Link
                    to={`/${name}`}
                    className="border-2 border-white black py-2 px-4 text-white"
                  >
                    More Details
                  </Link>
                </li>
                <li>
                <button
  className="bg-white text-slate-800 py-2 px-4"
  onClick={() => navigate("/payment-form")} 
>
  Payment
</button>
                </li>
              </ul>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
