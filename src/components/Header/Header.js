import React, { useEffect, useState, useContext } from 'react';
import UserControl from '../UserControl/UserControl';
import { UserContext } from '../../App';

function Header() {
  // user context
  const userContext = useContext(UserContext);

  // state
  const [user, setUser] = useState(null);

  // setting user
  useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user]);

  // functions

  // helper greeting function to get current hours and change text depending on that
  const greeting = () => {
    const time = new Date().getHours();

    if (time <= 12) {
      return `Good morning, `;
    } else if (time < 17) {
      return `Good afternoon, `;
    } else {
      return `Good evening, `;
    }
  };

  // helper function to transform name with first uppercased letter
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
