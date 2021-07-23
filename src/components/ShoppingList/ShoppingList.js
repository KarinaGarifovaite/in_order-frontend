import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
function ShoppingList() {
  // user context
  const { user } = useContext(UserContext);

  // states
  const [filteredBy, setFilteredBy] = useState('all');
  const [filteredList, setFilteredList] = useState([]);

  // useEffects

  // for setting users shopping list as initial filteredList
  useEffect(() => {
    if (user) setFilteredList(user.shoppingList);
  }, [user]);

  // for displaying only specific list items
  useEffect(() => {
    if (!user) return;

    let newList;
    // showing all items;
    if (filteredBy === 'all') {
      newList = user.shoppingList;
    }
    //showing items with primary: true;
    if (filteredBy === 'primary') {
      newList = user.shoppingList.filter((item) => item.primary);
    }

    // showing items with specific category;
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

    // setting filtered list, depending on the filter used,
    setFilteredList(newList);
  }, [filteredBy, user]);

  // deleting item from the user shopping list and updating backend;
  const deleteItemHandler = (item) => {
    const theItem = user.shoppingList.find((el) => el === item);
    const newList = user.shoppingList.filter((item) => item !== theItem);

    fetch('https://in-order-app.herokuapp.com/user', {
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

  // setting filterBy value
  const onFilterValueChange = (e) => {
    setFilteredBy(e.target.value);
  };

  // helper variables
  let list =
    user &&
    filteredList.map((item, idx) => (
      <ShoppingItem
        key={idx}
        title={item.title}
        description={item.description}
        category={item.category}
        primary={item.primary}
        onDelete={() => deleteItemHandler(item)}
      />
    ));

  let output =
    user && filteredList.length === 0 ? (
      <h4 className='shopping-list__empty'>Your Shopping List is Empty</h4>
    ) : (
      list
    );

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
