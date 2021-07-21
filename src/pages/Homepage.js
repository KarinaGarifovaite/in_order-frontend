import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ItemForm from '../components/ItemForm/ItemForm';
import ShoppingList from '../components/ShoppingList/ShoppingList';

function Homepage() {
  const [showForm, setShowForm] = useState(false);

  const showItemForm = () => {
    setShowForm(true);
  };

  const closeItemFormHandler = (e) => {
    if (e.target.classList.contains('overlay')) setShowForm(false);
  };

  return (
    <main className='homepage'>
      <Header />
      <section className='homepage__add-btn'>
        <Button onClick={showItemForm}>
          <AiOutlinePlusCircle className='button__icon' /> Add to List
        </Button>
      </section>
      <section className='homepage__shopping-list'>
        <h2 className='homepage__shopping-list--title'>Shopping List</h2>
        <ShoppingList />
      </section>
      {showForm && <ItemForm hideForm={closeItemFormHandler} />}
    </main>
  );
}

export default Homepage;
