import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Inputs = (inputs, defaults = {}) => {
   let computedInputs = {};

   Object.keys(inputs).forEach(inputKey => {
      computedInputs[inputKey] = {
         ...defaults,
         ...{name: inputKey},
         ...inputs[inputKey],
      };
   });

   return computedInputs;
}

Form.onChange = fn => (form, inputKey) => ev => {
   const updatedProps = {
      value: ev.target.value,
      checked: form.inputs[inputKey].checked === undefined ? undefined : ev.target.checked,
   };
   const updatedInputProps = { ...form.inputs[inputKey], ...updatedProps };
   const updatedInput = { ...form.inputs, ...{[inputKey]: updatedInputProps} };
   const updatedForm = { ...form, ...{inputs: updatedInput} };

   fn(updatedForm);
};

Form.getProps = form => {
   let computedForm = { inputs: {} };

   Object.keys(form.inputs).forEach(inputKey => {
      const input = { ...form.inputs[inputKey] };

      Object.keys(input)
       .filter(prop => input[prop] instanceof Function)
       .filter(prop => !Form.Input.NON_COMPUTED_PROPERTIES.includes(prop))
       .forEach(prop => { input[prop] = input[prop](form, inputKey) });

      computedForm.inputs[inputKey] = input;
   });

   return {...form, ...computedForm };
};

Form.Component = props => (
   <form
      name={props.name}
      onSubmit={props.onSubmit}
   >
      {props.children}
   </form>
);

export default Form;