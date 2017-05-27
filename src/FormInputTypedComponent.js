import React from 'react';

let FormInputTypedComponent = {};

FormInputTypedComponent.Default = props => (
   <label>
      {props.label}
   </label>
);

FormInputTypedComponent.Text = props => (
   <label>
      {props.label}
      <input type="text" placeholder={props.placeholder}/>
   </label>
);

FormInputTypedComponent.Email = props => (
   <label>
      {props.label}
      <input type="email" placeholder={props.placeholder}/>
   </label>
);

FormInputTypedComponent.Password = props => (
   <label>
      {props.label}
      <input type="password" placeholder={props.placeholder}/>
   </label>
);

FormInputTypedComponent.Number = props => (
   <label>
      {props.label}
      <input type="number" placeholder={props.placeholder}/>
   </label>
);

FormInputTypedComponent.TextArea = props => (
   <label>
      {props.label}
      <textarea placeholder={props.placeholder}></textarea>
   </label>
);

FormInputTypedComponent.Checkbox = props => (
   <label>
      {props.label}
      <input type="checkbox"/>
   </label>
);

export default FormInputTypedComponent;