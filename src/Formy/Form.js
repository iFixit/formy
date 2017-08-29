import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

let Form = {};

Form.Component = ({ name, onSubmit, children }) => (
   <form
      name={name}
      onSubmit={onSubmit}
   >
      {children}
   </form>
);

Form.Component.propTypes = {
   name: PropTypes.string,
   onSubmit: PropTypes.func,
};

Form.Field = FormField;

Form.fields = (globalProps = {}, fields) => Object.assign({},
   ...Object.keys(fields).map(fieldKey => ({
      [fieldKey]: {
         ...Form.Field.defaultProps,
         ...{ name: fieldKey },
         ...globalProps,
         ...fields[fieldKey],
      },
   }))
);

Form.getData = form => Object.assign({},
   ...Object.keys(form.fields)
   .filter(fieldKey => form.fields[fieldKey].disabled !== true)
   .filter(fieldKey =>
      !['checkbox', 'radio'].includes(form.fields[fieldKey].type) ||
      form.fields[fieldKey].checked === true
   )
   .map(fieldKey => ({
      [fieldKey]: form.fields[fieldKey].value
   }))
);

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

export default Form;
