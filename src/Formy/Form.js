import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

const Form = {};

Form.Component = ({ id, name, onSubmit, children }) => (
   <form
      id={id}
      name={name}
      onSubmit={onSubmit}
   >
      {children}
   </form>
);

Form.Component.propTypes = {
   id: PropTypes.string,
   name: PropTypes.string,
   onSubmit: PropTypes.func,
};

Form.Field = FormField;

Form.customValidityFactory = (constraint, validationMessage = 'Invalid') => (...args) => (
   constraint(...args) ?  '' : validationMessage
);

Form.fields = (globalProps = {}, fields) => Object.assign({},
   ...Object.entries(fields).map(([fieldKey, field]) => ({
      [fieldKey]: {
         ...Form.Field.defaultProps,
         ...{ name: fieldKey },
         ...globalProps,
         ...field,
      },
   })),
);

Form.getData = form => Object.assign({},
   ...Object.entries(Form.getProps(form).fields)
   .filter(([fieldKey, field]) => !field.disabled)
   .filter(([fieldKey, field]) =>
      !['checkbox', 'radio'].includes(field.type) || field.checked
   )
   .map(([fieldKey, field]) => ({ [fieldKey]: field.value })),
);

Form.getProps = form => Object.assign({},
   ...Object.entries(form)
   .filter(([formPropKey, formProp]) => formPropKey !== 'fields')
   .map(([formPropKey, formProp]) => ({
      [formPropKey]: formProp instanceof Function ? formProp(form) : formProp,
   })),
   {
      fields: Object.assign({}, ...Object.entries(form.fields).map(([fieldKey, field]) => ({
         [fieldKey]: Object.assign({}, ...Object.entries(field).map(([fieldPropKey, fieldProp]) => ({
            [fieldPropKey]: fieldProp instanceof Function ? fieldProp(form, fieldKey) : fieldProp,
         }))),
      }))),
   },
);

Form.onChangeFactory = fn => (form, fieldKey) => updatedProps => fn({
   ...form,
   fields: {
      ...form.fields,
      [fieldKey]: {
         ...form.fields[fieldKey],
         ...updatedProps,
      },
   },
});

Form.onSubmitFactory = fn => form => ev => {
   ev.preventDefault();
   fn(Form.getData(form));
};

export default Form;
