import React from 'react';
import Toolbox from 'toolbox';

console.log(Toolbox);

let FormFieldComponentLibrary = {};

FormFieldComponentLibrary.Default = props => (
   <label>
      {props.label}
   </label>
);

FormFieldComponentLibrary.text = Toolbox.TextField;

FormFieldComponentLibrary.email = Toolbox.TextField;

FormFieldComponentLibrary.password = Toolbox.TextField;

FormFieldComponentLibrary.number = Toolbox.TextField;

FormFieldComponentLibrary.checkbox = Toolbox.Checkbox;

FormFieldComponentLibrary.radio = Toolbox.Radio;

FormFieldComponentLibrary.textarea = Toolbox.Textarea;

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