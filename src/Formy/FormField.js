import React from 'react';
import PropTypes from 'prop-types';
import FormDefaultComponentLibrary from './FormDefaultComponentLibrary';

let FormField = {};

FormField.Component = props => {
   const Component = props.componentLibrary[props.type];
   return <Component {...props} />;
}

FormField.Component.defaultProps = {
   type: 'text',
   value: '',
   label: '',
   placeholder: '',
   disabled: false,
   required: false,
   checked: false,
   radios: [],
   componentLibrary: FormDefaultComponentLibrary,
};

FormField.Component.propTypes = {
   type: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   disabled: PropTypes.bool.isRequired,
   checked: PropTypes.bool.isRequired,
   radios: PropTypes.array.isRequired,
   componentLibrary: PropTypes.object.isRequired,
   required: (props, propName, componentName) => (
      typeof props[propName] === 'boolean' &&
      props[propName] &&
      props.type === 'radiogroup' ?
      new Error(
         'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      ) : null
   ),
};

export default FormField;
