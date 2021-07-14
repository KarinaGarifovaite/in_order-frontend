import React from 'react';

function FormControl(props) {
  const { id, labelText, type, placeholder, value, onChange } = props;
  return (
    <div className='form-control'>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        name={id}
        onChange={onChange}
      />
    </div>
  );
}

export default FormControl;
