import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {
  IoFastFoodOutline,
  IoHomeOutline,
  IoBagHandleOutline,
  IoShirtOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';

function ShoppingItem(props) {
  //props
  const { title, description, category, primary, onDelete } = props;

  // state
  const [showDesc, setShowDesc] = useState(false);

  // setting correct icon
  let icon;
  if (category === 'groceries') icon = <IoFastFoodOutline />;
  if (category === 'clothes') icon = <IoShirtOutline />;
  if (category === 'home') icon = <IoHomeOutline />;
  if (category === 'other') icon = <IoBagHandleOutline />;

  // toggling description
  const showDescription = () => {
    setShowDesc((prev) => !prev);
  };

  return (
    <li className='shopping-item'>
      {primary && <AiFillStar className='shopping-item__icon' />}
      <h3 className='shopping-item__title' onClick={onDelete}>
        {title}
      </h3>
      <small className='shopping-item__category'>{icon}</small>
      <IoChevronDownOutline
        className='shopping-item__chevron'
        onClick={showDescription}
      />
      {showDesc && (
        <p className='shopping-item__description'>
          {description ? description : 'No description'}
        </p>
      )}
    </li>
  );
}

export default ShoppingItem;
