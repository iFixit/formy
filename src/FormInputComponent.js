import React from 'react';

let FormInputComponent = {};

FormInputComponent.Default = props => (
   <label>
     {props.label}
   </label>
);

FormInputComponent.Text = props => (
  <label>
    {props.label}
    <input type="text" placeholder={props.placeholder}/>
  </label>
);

export default FormInputComponent;