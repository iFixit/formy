import React from 'react';
import FormField from './FormField';

let Form = {};

Form.Field = FormField;

Form.Fields = (defaults = {}, fields) => {
   let computedFields = {};

   Object.keys(fields).forEach(fieldKey => computedFields[fieldKey] = {
      ...defaults,
      ...{name: fieldKey},
      ...fields[fieldKey],
   });

   return computedFields;
};

Form.onChange = fn => (form, fieldKey) => ev => {
   const updatedProps = {
      value: ev.target.value,
      checked: form.fields[fieldKey].checked === undefined ? undefined : ev.target.checked,
   };
   const updatedFieldProps = { ...form.fields[fieldKey], ...updatedProps };
   const updatedField = { ...form.fields, ...{[fieldKey]: updatedFieldProps} };
   const updatedForm = { ...form, ...{fields: updatedField} };

   fn(updatedForm);
};

Form.onSubmit = fn => form => ev => {
   ev.preventDefault();
   let values = {};

   Object.keys(form.fields)
    .filter(fieldKey => form.fields[fieldKey].disabled !== true)
    .filter(fieldKey => form.fields[fieldKey].checked !== false)
    .forEach(fieldKey => values[fieldKey] = form.fields[fieldKey].value);

   fn(values)
};

Form.getProps = form => {
   let computedForm = { fields: {} };

   Object.keys(form)
    .filter(prop => form[prop] instanceof Function)
    .filter(prop => !Form.Field.NON_COMPUTED_PROPERTIES.includes(prop))
    .forEach(prop => computedForm[prop] = form[prop](form));

   Object.keys(form.fields).forEach(fieldKey => {
      let computedField = { ...form.fields[fieldKey] };

      Object.keys(computedField)
       .filter(prop => computedField[prop] instanceof Function)
       .filter(prop => !Form.Field.NON_COMPUTED_PROPERTIES.includes(prop))
       .forEach(prop => computedField[prop] = computedField[prop](form, fieldKey));

      computedForm.fields[fieldKey] = computedField;
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