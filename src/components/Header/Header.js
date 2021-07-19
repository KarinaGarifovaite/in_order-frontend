import React, { useEffect, useState } from 'react';
import UserControl from '../UserControl/UserControl';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'in_order-token': localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const greeting = (name) => {
    const time = new Date().getHours();

    if (time <= 12) {
      return `Good morning, `;
    } else if (time < 17) {
      return `Good afternoon, `;
    } else {
      return `Good evening, `;
    }
  };

  const transformedName = (name) => {
    const transformedName = name[0].toUpperCase() + name.slice(1);
    return transformedName;
  };

  return (
    <header className='header'>
      <UserControl />
      {user && (
        <h2 className='header__greeting'>
          {greeting()}
          <span className='header__greeting--name'>
            {transformedName(user.name)}!
          </span>
        </h2>
      )}
    </header>
  );
}

export default Header;
