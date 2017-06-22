import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Instance = (form, events) => {
   let computedForm = {};

   Object.keys(form).forEach(input => {
      const addedProps = { name: input };
      const props = { ...events, ...addedProps, ...form[input] };
      computedForm[input] = props;
   });

   return computedForm;
};

Form.onChange = fn => (form, inputKey) => ev => {
   const updatedProps = {
      value: ev.target.value,
      checked: form[inputKey].checked === undefined ? undefined : ev.target.checked,
   };
   const updatedInput = { ...form[inputKey], ...updatedProps };
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