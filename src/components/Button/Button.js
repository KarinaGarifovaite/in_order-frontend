import React from 'react';
import { Link } from 'react-router-dom';

function Button(props) {
  return props.path ? (
    <Link to={props.path} className='button'>
      {props.text}
    </Link>
  ) : (
    <button onClick={props.onClick} className='button'>
      {props.text}
    </button>
  );
}

export default Button;
