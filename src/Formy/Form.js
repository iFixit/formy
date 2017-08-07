import React from 'react';
import FormField from './FormField';
import FormDefaultComponentLibrary from './FormDefaultComponentLibrary';

let Form = {};

Form.Field = FormField;

Form.defaultComponentLibrary = FormDefaultComponentLibrary;

Form.Component = ({ name, onSubmit, children }) => (
   <form
      name={name}
      onSubmit={onSubmit}
   >
      {children}
   </form>
);

Form.fields = (globalProps = {}, fields) => {
   let computedFields = {};

   Object.keys(fields).forEach(fieldKey => computedFields[fieldKey] = {
      ...{ name: fieldKey, componentLibrary: Form.defaultComponentLibrary },
      ...Form.Field.Component.defaultProps,
      ...globalProps,
      ...fields[fieldKey],
   });

   return computedFields;
};

Form.onChangeFactory = fn => (form, fieldKey) => updatedProps => {
   const updatedField = { ...form.fields[fieldKey], ...updatedProps };
   const updatedFields = { ...form.fields, ...{ [fieldKey]: updatedField } };
   const updatedForm = { ...form, ...{ fields: updatedFields } };

   fn(updatedForm);
};

Form.onSubmitFactory = fn => form => ev => {
   ev.preventDefault();
   fn(Form.getData(form));
};

Form.getData = form => {
   let data = {};

   Object.keys(form.fields)
    .filter(fieldKey => form.fields[fieldKey].disabled === false)
    .filter(fieldKey =>
      !['checkbox', 'radio'].includes(form.fields[fieldKey].type) ||
      form.fields[fieldKey].checked === true
    )
    .forEach(fieldKey => data[fieldKey] = form.fields[fieldKey].value);

   return data;
}

Form.getProps = form => {
   let computedForm = { fields: {} };

   Object.keys(form)
    .filter(prop => form[prop] instanceof Function)
    .forEach(prop => computedForm[prop] = form[prop](form));

   Object.keys(form.fields).forEach(fieldKey => {
      let computedField = { ...form.fields[fieldKey] };

      Object.keys(computedField)
       .filter(prop => computedField[prop] instanceof Function)
       .forEach(prop => computedField[prop] = computedField[prop](form, fieldKey));

      computedForm.fields[fieldKey] = computedField;
   });

   return { ...form, ...computedForm };
};

export default Form;