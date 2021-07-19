import React from 'react';

function Modal(props) {
  return (
    <div className='modal'>
      <header className='modal__header'>{props.title}</header>
      <div className='modal__children'>
        <h3 className='modal__children--text'>{props.text}</h3>
        <div className='modal__children--buttons'>
          <button className='cancel' onClick={props.onCancel}>
            Cancel
          </button>
          <button className='delete' onClick={props.onConfirm}>
            {props.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
