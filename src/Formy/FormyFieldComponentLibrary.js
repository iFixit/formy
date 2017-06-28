import React from 'react';

let FormFieldComponentLibrary = {};

FormFieldComponentLibrary.Default = props => (
   <label>
      {props.label}
   </label>
);

FormFieldComponentLibrary.InputElement = props => (
   <input
      type={props.type}
      checked={props.checked}
      value={props.value}
      name={props.name}
      disabled={props.disabled}
      required={props.required}
      placeholder={props.placeHolder}
      onChange={props.onChange}
   />
);

FormFieldComponentLibrary.Text = props => (
   <label>
      {props.label}
      <FormFieldComponentLibrary.InputElement {...props} type="text"/>
   </label>
);

FormFieldComponentLibrary.Email = props => (
   <label>
      {props.label}
      <FormFieldComponentLibrary.InputElement {...props} type="email"/>
   </label>
);

FormFieldComponentLibrary.Password = props => (
   <label>
      {props.label}
      <FormFieldComponentLibrary.InputElement {...props} type="password"/>
   </label>
);

FormFieldComponentLibrary.Number = props => (
   <label>
      {props.label}
      <FormFieldComponentLibrary.InputElement {...props} type="number"/>
   </label>
);

FormFieldComponentLibrary.Checkbox = props => (
   <label>
      {props.label}
      <FormFieldComponentLibrary.InputElement {...props} type="checkbox"/>
   </label>
);

FormFieldComponentLibrary.Radio = props => (
   <label>
      {props.label}
      <FormFieldComponentLibrary.InputElement {...props} type="radio"/>
   </label>
);

FormFieldComponentLibrary.TextArea = props => (
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

FormFieldComponentLibrary.RadioGroup = props => (
   <fieldSet disabled={props.disabled}>
      {props.radios.map(radio => <radio.component {...radio}
         key={radio.value}
         name={props.name}
         onChange={props.onChange}
         checked={props.value === radio.value}
      />)}
   </fieldSet>
);

export default FormFieldComponentLibrary;