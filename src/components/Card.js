// src/components/Card.js
import React from 'react';

function Card({ image }) {
  return (
    <img src={image} alt="card" style={{ width: '100px', margin: '10px' }} />
  );
}

export default Card;