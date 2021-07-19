import React from 'react';
import Button from '../components/Button/Button';

function LandingPage() {
  return (
    <main className='main'>
      <h1 className='main__title'>
        <span className='main__title--1'>Keep Your Shopping List</span>
        <span className='main__title--2'>in order.</span>
      </h1>
      <Button path='/log'>Get started!</Button>
    </main>
  );
}

export default LandingPage;
