import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
function ShoppingList() {
  const { user } = useContext(UserContext);
  const [filteredBy, setFilteredBy] = useState('all');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (user) setFilteredList(user.shoppingList);
  }, [user]);

  useEffect(() => {
    let newList;
    if (filteredBy === 'all') {
      newList = user.shoppingList;
    }
    if (filteredBy === 'primary') {
      newList = user.shoppingList.filter((item) => item.primary);
    }
    if (
      filteredBy === 'groceries' ||
      filteredBy === 'home' ||
      filteredBy === 'other' ||
      filteredBy === 'clothes'
    ) {
      newList = user.shoppingList.filter(
        (item) => item.category === filteredBy
      );
    }
    setFilteredList(newList);
  }, [filteredBy, user.shoppingList]);

  const deleteItemHandler = (idx) => {
    const newList = user.shoppingList.filter((_, i) => i !== idx);

    fetch('http://localhost:5000/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'in_order-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        shoppingList: newList,
      }),
    });
  };

  let list =
    user &&
    filteredList.map((item, idx) => (
      <ShoppingItem
        key={idx}
        title={item.title}
        description={item.description}
        category={item.category}
        primary={item.primary}
        onDelete={() => deleteItemHandler(idx)}
      />
    ));

  let output =
    user && filteredList.length === 0 ? (
      <h4 className='shopping-list__empty'>Your Shopping List is Empty</h4>
    ) : (
      list
    );

  const onFilterValueChange = (e) => {
    setFilteredBy(e.target.value);
  };

  return (
    <>
      <div className='shopping-list__sort'>
        <label htmlFor='filter'>Filter by:</label>
        <select
          value={filteredBy}
          name='filter'
          id='filter'
          onChange={onFilterValueChange}
        >
          <option value='all'>All</option>
          <option value='primary'>Primary</option>
          <option value='groceries'>Groceries</option>
          <option value='home'>Home</option>
          <option value='clothes'>Clothes</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <ul className='shopping-list'>{output}</ul>
    </>
  );
}

export default ShoppingList;
