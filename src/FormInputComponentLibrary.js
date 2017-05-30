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
         checked={props.value}
         onChange={props.onChange}
      />
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