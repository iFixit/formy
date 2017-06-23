import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Inputs = (defaults = {}, inputs) => {
   let computedInputs = {};

   Object.keys(inputs).forEach(inputKey => computedInputs[inputKey] = {
      ...defaults,
      ...{name: inputKey},
      ...inputs[inputKey],
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

// https://www.w3.org/TR/html5/forms.html#constructing-form-data-set
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-form-data-set
Form.onSubmit = fn => form => ev => {
   ev.preventDefault();
   let values = {};

   Object.keys(form.inputs)
    .filter(inputKey => form.inputs[inputKey].disabled !== 'true')
    .filter(inputKey => form.inputs[inputKey].checked !== false)
    .forEach(inputKey => values[inputKey] = form.inputs[inputKey].value);

   fn(values)
};

Form.getProps = form => {
   let computedForm = { inputs: {} };

   Object.keys(form)
    .filter(prop => form[prop] instanceof Function)
    .filter(prop => !Form.Input.NON_COMPUTED_PROPERTIES.includes(prop))
    .forEach(prop => computedForm[prop] = form[prop](form));


   Object.keys(form.inputs).forEach(inputKey => {
      let input = { ...form.inputs[inputKey] };

      Object.keys(input)
       .filter(prop => input[prop] instanceof Function)
       .filter(prop => !Form.Input.NON_COMPUTED_PROPERTIES.includes(prop))
       .forEach(prop => input[prop] = input[prop](form, inputKey));

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