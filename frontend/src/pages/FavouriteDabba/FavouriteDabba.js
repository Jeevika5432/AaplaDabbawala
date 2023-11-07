import React from 'react';
import './FavouriteDabba.css';


const FavouritePage = () => {

  const dummydabbas = [
    {
      id: 1,
      name: 'Veg Dabba 1',
      location: 'Bhayander',
      price: '200',
      image:
        ' https://mumbaimirror.indiatimes.com/photo/76250587.cms',
    },
    {
      id: 2,
      name: 'Non Veg Dabba 2',
      location: 'Andheri',
      price: '180',
      image:
        'https://mumbaimirror.indiatimes.com/photo/76250587.cms',
    },
    {
      id: 3,
      name: 'Jain Dabba 3',
      location: 'Matunga',
      price: '220',
      image:
        '   https://th-i.thgim.com/public/migration_catalog/article10919479.ece/alternates/FREE_1200/Head%20%20Dabbawala%20diariesHis%20TEDx%20talk%20on.ART_GPO2DST7J.1%2BCM12MUMBAI_DABBAWALA.jpg',
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
              <p className="dabba-price">{dabba.price} rupees</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritePage;
