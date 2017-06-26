import React from 'react';

let FormInputComponentLibrary = {};

FormInputComponentLibrary.Default = props => (
   <label>
      {props.label}
   </label>
);

FormInputComponentLibrary.InputElement = props => (
   <input
      type={props.type}
      checked={props.checked}
      value={props.value}
      name={props.name}
      disabled={props.disabled}
      required={props.required}
      placeholder={props.placeholder}
      onChange={props.onChange}
   />
)

FormInputComponentLibrary.Text = props => (
   <label>
      {props.label}
      <FormInputComponentLibrary.InputElement {...props} type="text"/>
   </label>
);

FormInputComponentLibrary.Email = props => (
   <label>
      {props.label}
      <FormInputComponentLibrary.InputElement {...props} type="email"/>
   </label>
);

FormInputComponentLibrary.Password = props => (
   <label>
      {props.label}
      <FormInputComponentLibrary.InputElement {...props} type="password"/>
   </label>
);

FormInputComponentLibrary.Number = props => (
   <label>
      {props.label}
      <FormInputComponentLibrary.InputElement {...props} type="number"/>
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
      <FormInputComponentLibrary.InputElement {...props} type="checkbox"/>
   </label>
);

FormInputComponentLibrary.Radio = props => (
   <label>
      {props.label}
      <FormInputComponentLibrary.InputElement {...props} type="radio"/>
   </label>
);

FormInputComponentLibrary.RadioGroup = props => (
   <fieldSet disabled={props.disabled}>
      {props.radios.map(radio => <radio.component {... {...radio, ...{
         key: radio.value,
         name: props.name,
         onChange: props.onChange,
         checked: props.value === radio.value,
      }}}/>)}
   </fieldSet>
);

export default FormInputComponentLibrary;