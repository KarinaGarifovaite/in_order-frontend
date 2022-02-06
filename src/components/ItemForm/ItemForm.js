import React, { useState, useContext } from 'react';
import FormControl from '../FormControl/FormControl';
import Button from '../Button/Button';
import { UserContext } from '../../App';

function ItemForm(props) {
  // props
  const { hideForm } = props;

  // user context
  const { user } = useContext(UserContext);

  // states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    primary: false,
  });
  const [message, setMessage] = useState('');

  //functions

  // setting form info
  const setItemInfo = (e) => {
    e.target.name === 'primary'
      ? setFormData({ ...formData, [e.target.name]: e.target.checked })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submiting new item to backend
  const itemInfoSubmitHandler = (e) => {
    e.preventDefault();
    if (formData.title === '' || formData.category === '') {
      return setMessage('* fields are required!');
    }
    fetch('http://localhost:5000/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'in_order-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        shoppingList: [...user.shoppingList, formData],
      }),
    });
    // cleaning form inputs
    setFormData({
      title: '',
      description: '',
      category: '',
      primary: false,
    });

    setMessage('Added to the list!');

    // cleaning message after 1s
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };
  return (
    <div className='overlay' onClick={hideForm}>
      <form className='form absolute' onSubmit={itemInfoSubmitHandler}>
        <h4>Add Item to Shopping List</h4>
        <FormControl
          labelText='*Title'
          placeholder='Title'
          type='text'
          id='title'
          value={formData.title}
          onChange={setItemInfo}
        />
        <FormControl
          labelText='Descripion'
          placeholder='Descripion'
          type='text'
          id='description'
          value={formData.description}
          onChange={setItemInfo}
        />
        <div className='form-control'>
          <label htmlFor='category'>*Category:</label>

          <select
            value={formData.category}
            name='category'
            id='category'
            onChange={setItemInfo}
          >
            <option value='' disabled>
              ---
            </option>
            <option value='groceries'>Groceries</option>
            <option value='home'>Home</option>
            <option value='clothes'>Clothes</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <FormControl
          labelText='Primary'
          placeholder='Primary'
          type='checkbox'
          id='primary'
          value={formData.primary}
          checked={formData.primary}
          onChange={setItemInfo}
        />
        {message && <p className='error-message'>{message}</p>}
        <Button>Add</Button>
      </form>
    </div>
  );
}

export default ItemForm;
