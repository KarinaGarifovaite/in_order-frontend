import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RiUserSettingsFill } from 'react-icons/ri';
import Modal from '../Modal/Modal';
import { UserContext } from '../../App';

function UserControl() {
  //user context
  const userContext = useContext(UserContext);

  //states
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  //useHistory
  const history = useHistory();

  //functions

  // for toggling ul with logout and delete
  const showControlsHandler = () => {
    setShow((prev) => !prev);
  };

  // for logging user out, removing token, redirecting
  const logoutHandler = () => {
    localStorage.removeItem('token');
    history.replace('/');
    userContext.setIsAuth(false);
  };

  // deleting users account from backend, removing token from local storage, redirecting user;
  const deleteAccountHandler = () => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:5000/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'in_order-token': token,
      },
    });
    localStorage.removeItem('token');
    useContext.isAuth(false);
    history.replace('/');
  };

  // showing and hiding confirmation modal
  const showModal = () => {
    setShow(false);
    setModal(true);
  };

  const onModalCancelHandler = () => {
    setModal(false);
  };

  return (
    <div className='user-cotrol'>
      {modal && (
        <Modal
          title='Delete Account'
          text='  Are you sure you want to delete your account?'
          confirmText='Delete'
          onCancel={onModalCancelHandler}
          onConfirm={deleteAccountHandler}
        />
      )}
      {show && (
        <ul className='user-control__controls'>
          <li
            className='user-control__controls--list bold'
            onClick={logoutHandler}
          >
            Logout
          </li>
          <li className='user-control__controls--list red' onClick={showModal}>
            Delete account
          </li>
        </ul>
      )}
      <RiUserSettingsFill
        className='user-control__icon'
        onClick={showControlsHandler}
      />
    </div>
  );
}

export default UserControl;
