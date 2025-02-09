import React from 'react';
import { Link } from 'react-router-dom';
import ceta from "../../assets/ceta1.png";
import mama from "../../assets/mama1.png";
import aqua from "../../assets/aqua1.png";
import derma from "../../assets/derma1.png";

const Brands = () => {
  const Brands = [
    { name: 'Cetaphil', path: 'cetaphil', image: ceta },
    { name: 'Mamaearth', path: 'Mamaearth', image: mama },
    { name: 'Aqualogica', path: 'Aqualogica', image: aqua },
    { name: 'DermaCo', path: 'DermaCo', image: derma },
  ];

  return (
    <>
        <h3 className='section__header'>Explore our brands</h3>
      <div className='product__grid'>
        {Brands.map((brand) => (
          <Link
            key={brand.name} // Add a unique key
            to={`/brands/${brand.path}`} // Use backticks for template literals
            className='categories__card'
          >
            <img src={brand.image} alt={brand.name} />
            <h4>{brand.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Brands;
