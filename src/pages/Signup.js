import React, { useState, useRef } from 'react';
import FormControl from '../components/FormControl/FormControl';
import Button from '../components/Button/Button';
function Signup() {
  const containerRef = useRef();
  const [title, setTitle] = useState(
    'This is your first step to organise your shopping list!'
  );
  const [mode, setMode] = useState('signup');
  const [newUser, setNewUser] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    passwordOne: '',
    passwordTwo: '',
    gender: '',
  });

  const changeModeHandler = () => {
    containerRef.current.classList.add('turn');
    setNewUser((prevState) => !prevState);
    if (newUser) {
      setMode('login');
      setTitle('Glad you back!');
    } else {
      setMode('signup');
      setTitle('This is your first step to organise your shopping list!');
    }
    setTimeout(() => {
      containerRef.current.classList.remove('turn');
    }, 800);
  };

  const setUserInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    // if (mode === 'signup') {
    //   fetch('signup', {
    //     method: 'POST',
    //     'Content-Type': 'application/json',
    //     body: JSON.stringify({
    //       username: formData.username,
    //       name: formData.name,
    //       gender: formData.gender,
    //       passwordOne: formData.passwordOne,
    //       passwordTwo: formData.passwordTwo,
    //     }),
    //   }).then((res) => {
    //     if (!res.ok) {
    //       //...
    //     } else {
    //       res.json();
    //     }
    //   });
    // } else if (mode === 'login') {
    //   fetch('login', {
    //     method: 'POST',
    //     'Content-Type': 'application/json',
    //     body: JSON.stringify({
    //       username: formData.username,
    //       passwordOne: formData.passwordOne,
    //     }),
    //   }).then((res) => {
    //     if (!res.ok) {
    //       //...
    //     } else {
    //       res.json();
    //     }
    //   });
    // }
  };
  return (
    <main className='signup'>
      <div className='signup__container' ref={containerRef}>
        <h2 className='signup__container--title'>{title}</h2>
        <h3 className='signup__container--title-2'>
          {mode === 'signup' ? 'Sign up!' : 'Login!'}
        </h3>
        <form autoComplete='off' className='form' onSubmit={onSubmitHandler}>
          <FormControl
            labelText='*Username:'
            placeholder='Choose username'
            type='text'
            id='username'
            value={formData.username}
            onChange={setUserInfo}
          />
          {newUser && (
            <FormControl
              labelText='*Name:'
              placeholder='Enter your name'
              type='text'
              id='name'
              value={formData.name}
              onChange={setUserInfo}
            />
          )}
          <FormControl
            labelText='*Password:'
            placeholder='Password'
            type='password'
            id='passwordOne'
            value={formData.passwordOne}
            onChange={setUserInfo}
          />
          {newUser && (
            <FormControl
              labelText='*Repeat password:'
              placeholder='Repeat password'
              type='password'
              id='passwordTwo'
              value={formData.passwordTwo}
              onChange={setUserInfo}
            />
          )}
          {newUser && (
            <div className='form-control'>
              <label htmlFor='gender'>*Gender:</label>
              <select
                value={formData.gender}
                name='gender'
                id='gender'
                onChange={setUserInfo}
              >
                <option>Non-binary</option>
                <option>Female</option>
                <option>Male</option>
              </select>
            </div>
          )}
          <Button text={mode === 'signup' ? 'Sign up' : 'Login'} />
        </form>
        <div className='signup__additional'>
          <h4 className='signup__additional--text'>Already have an account?</h4>
          <button
            onClick={changeModeHandler}
            className='signup__additional--button'
          >
            {mode === 'signup' ? 'Login!' : 'Sign up!'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Signup;
