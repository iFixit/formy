import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Instance = (form, defaults) => {
   let computedForm = {};

   Object.keys(form).forEach(input => {
      const addedProps = { name: input };
      const props = { ...form[input], ...defaults, ...addedProps };
      computedForm[input] = props;
   });

   return computedForm;
};

Form.onChange = (fn) => (form, inputKey) => (ev) => {
   const updatedInput = { ...form[inputKey], ...{value: ev.target.value} };
   const updatedForm = { ...form, ...{[inputKey]: updatedInput} };

   fn(updatedForm);
};

Form.getProps = form => {
   let computedForm = {};

   Object.keys(form).forEach(input => {
      const props = { ...form[input] };

      Object.keys(props)
       .filter(prop => props[prop] instanceof Function)
       .filter(prop => !Form.Input.NON_COMPUTED_PROPERTIES.includes(prop))
       .forEach(prop => { props[prop] = props[prop](form, input) });

      computedForm[input] = props;
   });

   return computedForm;
};

Form.Component = props => (
   <form {...props}>
      {props.children}
   </form>
);

export default Form;