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
      <input
         type="text"
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         placeholder={props.placeholder}
         onChange={props.onChange}
      />
   </label>
);

FormInputComponentLibrary.Email = props => (
   <label>
      {props.label}
      <input
         type="email"
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         placeholder={props.placeholder}
         onChange={props.onChange}
      />
   </label>
);

FormInputComponentLibrary.Password = props => (
   <label>
      {props.label}
      <input
         type="password"
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         placeholder={props.placeholder}
         onChange={props.onChange}
      />
   </label>
);

FormInputComponentLibrary.Number = props => (
   <label>
      {props.label}
      <input
         type="number"
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         placeholder={props.placeholder}
         onChange={props.onChange}
      />
   </label>
);

FormInputComponentLibrary.TextArea = props => (
   <label>
      {props.label}
      <textarea
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         placeholder={props.placeholder}
         onChange={props.onChange}
      ></textarea>
   </label>
);

FormInputComponentLibrary.Checkbox = props => (
   <label>
      {props.label}
      <input
         type="checkbox"
         checked={props.checked}
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         onChange={props.onChange}
      />
   </label>
);

FormInputComponentLibrary.Radio = props => (
   <label>
      {props.label}
      <input
         type="radio"
         checked={props.checked}
         value={props.value}
         name={props.name}
         disabled={props.disabled}
         required={props.required}
         onChange={props.onChange}
      />
   </label>
);

FormInputComponentLibrary.Dropdown = props => (
   <label> {props.label} </label>
);

export default FormInputComponentLibrary;