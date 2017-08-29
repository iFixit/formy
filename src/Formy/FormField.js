import React from 'react';
import PropTypes from 'prop-types';
import FormDefaultComponentLibrary from './FormDefaultComponentLibrary';

const FormField = ({componentLibrary, ...props}) => {
   const Component = componentLibrary[props.type];
   return <Component {...props} />;
}

FormField.defaultProps = {
   checked: false,
   componentLibrary: FormDefaultComponentLibrary,
   name: '',
   type: 'text',
   value: '',
};

FormField.propTypes = {
   // Required
   checked: PropTypes.bool.isRequired,
   componentLibrary: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,

   // Not required
   autocomplete: PropTypes.string,
   disabled: PropTypes.bool,
   label: PropTypes.string,
   onChange: PropTypes.func,
   placeholder: PropTypes.string.isRequired,
   radios: PropTypes.array,

   // Constraint validation
   // https://www.w3.org/TR/html5/forms.html#attr-input-max
   max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
   ]),
   // https://www.w3.org/TR/html5/forms.html#attr-fe-maxlength
   maxLength: (props, propName, componentName) => (
      props[propName] === undefined ||
      (
         Number.isInteger(props[propName]) &&
         (props[propName] >= 0)
      ) ?
      null : new Error(
         'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      )
   ),
   // https://www.w3.org/TR/html5/forms.html#attr-input-min
   min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
   ]),
   // https://www.w3.org/TR/html5/forms.html#attr-fe-minlength
   minLength: (props, propName, componentName) => (
      props[propName] === undefined ||
      (
         Number.isInteger(props[propName]) &&
         (props[propName] >= 0)
      ) ?
      null : new Error(
         'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      )
   ),
   // https://www.w3.org/TR/html5/forms.html#attr-input-pattern
   pattern: PropTypes.string,
   // https://www.w3.org/TR/html5/forms.html#attr-input-required
   required: (props, propName, componentName) => (
      props[propName] === undefined ||
      (
         typeof props[propName] === 'boolean' &&
         props.type !== 'radiogroup'
      ) ?
      null : new Error(
         'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      )
   ),
   // https://www.w3.org/TR/html5/forms.html#attr-input-step
   step: (props, propName, componentName) => (
      props[propName] === undefined ||
      (
         !Number.isNaN(props[propName]) ||
         (props[propName] === 'any')
      ) ?
      null : new Error(
         'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      )
   ),
};

export default FormField;
