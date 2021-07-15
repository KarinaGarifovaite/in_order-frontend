import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '../components/FormControl/FormControl';
import Button from '../components/Button/Button';
function Signup() {
  const containerRef = useRef();
  const history = useHistory();
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

  const [errorMsg, setErrorMsg] = useState(null);

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

    if (
      !formData.username ||
      !formData.name ||
      !formData.passwordOne ||
      !formData.passwordTwo ||
      !formData.gender
    ) {
      return setErrorMsg('Please fill out all fields!');
    }

    if (mode === 'signup') {
      fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.toLowerCase(),
          name: formData.name,
          gender: formData.gender,
          passwordOne: formData.passwordOne,
          passwordTwo: formData.passwordTwo,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (!data.succes) setErrorMsg(data.message);
          if (data.success) {
            containerRef.current.classList.add('turn');
            setMode('login');
            setNewUser(false);
            setTimeout(() => {
              containerRef.current.classList.remove('turn');
            }, 800);
          }
        })
        .catch((err) => console.log(err));
    } else if (mode === 'login') {
      fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.toLowerCase(),
          password: formData.passwordOne,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          if (data.message) setErrorMsg(data.message);
          else {
            localStorage.setItem('token', data.token);
            history.replace('/homepage');
          }
        });
    }
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
                <option value='' disabled>
                  ---
                </option>
                <option value='non binary'>Non-binary</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
            </div>
          )}
          {errorMsg && <p>{errorMsg}</p>}
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
