import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Instance = form => {
   let computedForm = {};
   computedForm.input = {};

   Object.keys(form.input).forEach(inputKey => {
      const addedProps = { name: inputKey, onChange: form.onChange };
      const props = { ...form.input[inputKey], ...addedProps };

      computedForm.input[inputKey] = props;
   });

   return {...form, ...computedForm };
}

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

   Object.keys(form).forEach(inputKey => {
      const props = { ...form[inputKey] };

      Object.keys(props)
       .filter(prop => props[prop] instanceof Function)
       .filter(prop => !Form.Input.NON_COMPUTED_PROPERTIES.includes(prop))
       .forEach(prop => { props[prop] = props[prop](form, inputKey) });

      computedForm[inputKey] = props;
   });

   return computedForm;
};

Form.Component = props => (
   <form>
      {props.children}
   </form>
);

export default Form;