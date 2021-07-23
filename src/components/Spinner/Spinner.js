import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';

function Spinner() {
  return (
    <div className='spinner'>
      <GiShoppingCart className='spinner__icon-cart' />
    </div>
  );
}

export default Spinner;
