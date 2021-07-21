import React, { useContext } from 'react';
import { UserContext } from '../../App';

function ShoppingList() {
  const { user } = useContext(UserContext);

  return (
    <ul>
      {user.shoppingList &&
        user.shoppingList.map((item) => (
          <ShoppingList
            key={item._id}
            title={item.title}
            description={item.description}
            primary={item.primary}
          />
        ))}
    </ul>
  );
}

export default ShoppingList;
