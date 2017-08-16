import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import FormUtils from './FormUtils';

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

Form.fields = (globalProps = {}, fields) => {
   let computedFields = {};

   Object.keys(fields).forEach(fieldKey => computedFields[fieldKey] = {
      ...{ name: fieldKey },
      ...Form.Field.defaultProps,
      ...globalProps,
      ...fields[fieldKey],
   });

   return computedFields;
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

Form.onChangeFactory = fn => (form, fieldKey) => updatedProps => {
   const updatedField = { ...form.fields[fieldKey], ...updatedProps };
   const updatedFields = { ...form.fields, ...{ [fieldKey]: updatedField } };
   const updatedForm = { ...form, ...{ fields: updatedFields } };

   fn(updatedForm);
};

Form.onActiveFactory = fn => {
   return {
      onFocus: (form, fieldKey) => {
         return () => Form.onChangeFactory(fn)(form, fieldKey)({
            focus: true,
            focusTime: Date.now()
         });
      },
      onBlur: (form, fieldKey) => {
         return () => Form.onChangeFactory(fn)(form, fieldKey)({
            focus: false
         });
      },
      onMouseOver: (form, fieldKey) => {
         return () => Form.onChangeFactory(fn)(form, fieldKey)({
            hover: true,
            hoverTime: Date.now()
         });
      },
      onMouseOut: (form, fieldKey) => {
         return () => Form.onChangeFactory(fn)(form, fieldKey)({
            hover: false
         });
      },
   }
};

Form.onSubmitFactory = fn => form => ev => {
   ev.preventDefault();
   fn(Form.getData(form));
};

Form.Utils = FormUtils;

export default Form;
