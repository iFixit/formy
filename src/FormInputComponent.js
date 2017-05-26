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

FormInputComponent.Email = props => (
   <label>
      {props.label}
      <input type="email" placeholder={props.placeholder}/>
   </label>
);

FormInputComponent.Password = props => (
   <label>
      {props.label}
      <input type="password" placeholder={props.placeholder}/>
   </label>
);

FormInputComponent.Number = props => (
   <label>
      {props.label}
      <input type="number" placeholder={props.placeholder}/>
   </label>
);

FormInputComponent.TextArea = props => (
   <label>
      {props.label}
      <textarea placeholder={props.placeholder}></textarea>
   </label>
);

FormInputComponent.Checkbox = props => (
   <label>
      {props.label}
      <input type="checkbox"/>
   </label>
);

export default FormInputComponent;