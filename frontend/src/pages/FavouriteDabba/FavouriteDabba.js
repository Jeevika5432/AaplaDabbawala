import React from 'react';
import './FavouriteDabba.css';


const FavouritePage = () => {

  const dummydabbas = [
    {
      id: 1,
      name: 'Veg Dabba 1',
      location: 'City Center',
      price: '$200',
      image:
        'https://images.pexels.com/photos/4624741/pexels-photo-4624741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 2,
      name: 'Non Veg Dabba 2',
      location: 'Beachside',
      price: '$180',
      image:
        'https://images.pexels.com/photos/5471151/pexels-photo-5471151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 3,
      name: 'Jain Dabba 3',
      location: 'Hill Station',
      price: '$220',
      image:
        'https://images.pexels.com/photos/4624741/pexels-photo-4624741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
  ];


  return (
    <div className="favourite-page">
      <h2 className="title">Favourite Dabbas</h2>
      <div className="dabba-list">
        {dummydabbas.map((dabba) => (
          <div className="dabba-card" key={dabba.id}>
            <img className="dabba-image" src={dabba.image} alt={dabba.name} />
            <div className="dabba-details">
              <h3 className="dabba-name">{dabba.name}</h3>
              <p className="dabba-location">{dabba.location}</p>
              <p className="dabba-price">{dabba.price} per night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritePage;
