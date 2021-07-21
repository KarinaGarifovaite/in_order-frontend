import React from 'react';
import { AiFillStar } from 'react-icons/ai';
function ShoppingItem(props) {
  const { title, description, category, primary } = props;
  return (
    <li>
      {primary && <AiFillStar />}
      <h3>{title}</h3>
      <small>{category}</small>
      <p>{description}</p>
    </li>
  );
}

export default ShoppingItem;
