import React from 'react';
import Toolbox from 'toolbox';

console.log(Toolbox);

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
      onChange={props.onChange}
      ref={props.fieldRef}
   />
);

FormFieldComponentLibrary.Default = props => (
   <label>
      {props.label}
   </label>
);

FormFieldComponentLibrary.Text = Toolbox.TextField;

FormFieldComponentLibrary.Email = Toolbox.TextField;

FormFieldComponentLibrary.Password = Toolbox.TextField;

FormFieldComponentLibrary.Number = Toolbox.TextField;

FormFieldComponentLibrary.Checkbox = Toolbox.Checkbox;

FormFieldComponentLibrary.Radio = Toolbox.Radio;

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