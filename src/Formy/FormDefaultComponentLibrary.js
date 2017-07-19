import React from 'react';

let FormFieldComponentLibrary = {};

const InputElement = props => (
   <input
      type={props.type}
      checked={props.checked}
      value={props.value}
      name={props.name}
      disabled={props.disabled}
      required={props.required}
      placeholder={props.placeholder}
      autoComplete={props.autocomplete}
      onChange={props.onChange}
   />
);

FormFieldComponentLibrary.Default = props => (
   <label>
      {props.label}
   </label>
);

FormFieldComponentLibrary.Text = props => (
   <label>
      {props.label}
      <InputElement {...props} type="text"/>
   </label>
);

FormFieldComponentLibrary.Email = props => (
   <label>
      {props.label}
      <InputElement {...props} type="email"/>
   </label>
);

FormFieldComponentLibrary.Password = props => (
   <label>
      {props.label}
      <InputElement {...props} type="password"/>
   </label>
);

FormFieldComponentLibrary.Number = props => (
   <label>
      {props.label}
      <InputElement {...props} type="number"/>
   </label>
);

FormFieldComponentLibrary.Checkbox = props => (
   <label>
      {props.label}
      <InputElement {...props} type="checkbox"/>
   </label>
);

FormFieldComponentLibrary.Radio = props => (
   <label>
      {props.label}
      <InputElement {...props} type="radio"/>
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
      {props.radios.map(radio => {
         const Component = props.componentLibrary[radio.type];
         return <Component {...radio}
            key={radio.value}
            name={props.name}
            onChange={props.onChange}
            checked={props.value === radio.value}
         />;
      })}
   </fieldSet>
);

export default FormFieldComponentLibrary;