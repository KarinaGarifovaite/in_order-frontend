import React, { useEffect, useState, useContext } from 'react';
import UserControl from '../UserControl/UserControl';
import { UserContext } from '../../App';

function Header() {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user]);

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
