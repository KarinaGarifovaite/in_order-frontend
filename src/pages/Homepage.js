import React from 'react';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function Homepage() {
  return (
    <main className='homepage'>
      <Header />
      <section className='homepage__add-btn'>
        <Button>
          <AiOutlinePlusCircle className='button__icon' /> Add to List
        </Button>
      </section>
      <section className='homepage__shopping-list'>
        <h2>Shopping List</h2>
        <h4>Your shopping list is empty</h4>
      </section>
    </main>
  );
}

export default Homepage;
