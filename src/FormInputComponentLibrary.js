import React from 'react';

let FormInputComponentLibrary = {};

FormInputComponentLibrary.Default = props => (
   <label>
      {props.label}
   </label>
);

FormInputComponentLibrary.Text = props => (
   <label>
      {props.label}
      <input type="text" placeholder={props.placeholder}/>
   </label>
);

FormInputComponentLibrary.Email = props => (
   <label>
      {props.label}
      <input type="email" placeholder={props.placeholder}/>
   </label>
);

FormInputComponentLibrary.Password = props => (
   <label>
      {props.label}
      <input type="password" placeholder={props.placeholder}/>
   </label>
);

FormInputComponentLibrary.Number = props => (
   <label>
      {props.label}
      <input type="number" placeholder={props.placeholder}/>
   </label>
);

FormInputComponentLibrary.TextArea = props => (
   <label>
      {props.label}
      <textarea placeholder={props.placeholder}></textarea>
   </label>
);

FormInputComponentLibrary.Checkbox = props => (
   <label>
      {props.label}
      <input type="checkbox"/>
   </label>
);

FormInputComponentLibrary.Radio = props => (
   <label>
      {props.label}
      <input type="radio"/>
   </label>
);

FormInputComponentLibrary.RadioGroup = props => (
   <label> {props.label} </label>
);

FormInputComponentLibrary.Dropdown = props => (
   <label> {props.label} </label>
);

export default FormInputComponentLibrary;