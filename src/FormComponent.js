import React from 'react';

let FormComponent = {};

FormComponent.Text = props => (
  <label>
    {props.label}
    <input type="text" placeholder={props.placeholder}/>
  </label>
);

export default FormComponent;